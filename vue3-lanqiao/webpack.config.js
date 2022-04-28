const webpackChain = require('webpack-chain');
const path = require('path');
// 创建 webpack 配置
const config = new webpackChain();
const isDev = !!process.env.WEBPACK_DEV_SERVER; // 判断是否是开发环境

const genUrlLoaderOptions = (dir) => {
  return {
    limit: 4 * 1024, // url-loader 对于文件大小限制 4kb
    fallback: {
      loader: require.resolve('file-loader'),
      options: {
        name: `${dir}/[name].[contenthash:8].[ext]`,
      },
    },
  };
};

config
  // 设置 target 为 web
  .target('web')
  .context(path.resolve(__dirname, '.')) // webpack 上下文目录为项目根目录
  .entry('app') // 入口文件名称为 app
  .add('./src/main.js') // 入口文件为 ./src/main.js
  .end()
  .output.path(path.join(__dirname, './dist')) // webpack 输出的目录为根目录的 dist 目录
  .filename('[name].[contenthash:8].js') // 打包出来的 bundle 名称为 "[name].[hash:8].js"
  .publicPath('/') // publicpath 配置为 "/"
  .end()
  .resolve.extensions.add('.js')
  .add('.jsx')
  .add('.vue') // 配置以 .js 等结尾的文件当模块使用的时候都可以省略后缀
  .end()
  .end()
  /********** 添加 Loader **********/
  // 图片解析
  .module.rule('images')
  .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
  .use('url-loader')
  .loader(require.resolve('url-loader'))
  .options(genUrlLoaderOptions('img'))
  .end()
  .end()
  // 配置 svg
  .rule('svg')
  .test(/\.(svg)(\?.*)?$/)
  .use('file-loader')
  .loader(require.resolve('file-loader'))
  .options({
    name: 'img/[name].[contenthash:8].[ext]',
  })
  .end()
  .end()
  // 配置 media
  .rule('media')
  .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
  .use('url-loader')
  .loader(require.resolve('url-loader'))
  .options(genUrlLoaderOptions('media'))
  .end()
  .end()
  // 配置字体文件
  .rule('fonts')
  .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
  .use('url-loader')
  .loader(require.resolve('url-loader'))
  .options(genUrlLoaderOptions('fonts'))
  .end()
  .end()
  // css 相关配置
  .rule('css')
  .test(/\.css$/)
  // 提取 CSS 样式到单独 css 文件
  .use('extract-loader')
  .loader(require('mini-css-extract-plugin').loader)
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .end()
  .end()
  // sass-loader 相关配置
  .rule('sass')
  .test(/\.(sass|scss)$/)
  // 提取 CSS 样式到单独 css 文件
  .use('extract-loader')
  .loader(require('mini-css-extract-plugin').loader)
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
  .use('postcss-loader')
  .loader('postcss-loader')
  .end()
  // Sass 语法转 css 语法
  .use('sass-loader')
  .loader('sass-loader')
  .end()
  .end()
  // 配置 babel 解析
  .rule('js')
  .test(/\.m?jsx?$/) // 对 mjs、mjsx、js、jsx文 件进行 babel 配置
  .exclude.add((filepath) => {
    // Don't transpile node_modules
    return /node_modules/.test(filepath);
  })
  .end()
  .use('babel-loader')
  .loader('babel-loader')
  .end()
  .end()
  // vue文件解析
  .rule('vue') // vue-loader 相关配置
  .test(/\.vue$/) // 匹配 .vue 文件
  .use('vue-loader')
  .loader('vue-loader')
  .end()
  .end()
  // 添加 eslint-loader
  .rule('eslint')
  .exclude.add(/node_modules/) // 校验的文件除 node_modules 以外
  .end()
  .test(/\.(vue|(j)sx?)$/) // 加载 .vue、.js、.jsx 文件
  .use('eslint-loader')
  .loader(require.resolve('eslint-loader'))
  .options({
    emitWarning: true, // 出现警告是否终止 webpack 编译
    emitError: !isDev, // 生成环境编译报错
  })
  .end()
  .end()
  .end()
  /********** 添加插件 **********/
  // vue-loader 必须要添加 vue-loader-plugin
  .plugin('vue-loader-plugin')
  .use(require('vue-loader').VueLoaderPlugin, [])
  .end()
  // 添加 html-webpack-plugin 插件
  .plugin('html')
  .use(require('html-webpack-plugin'), [
    // 会自动注入入口 js 文件
    {
      template: path.resolve(__dirname, './public/index.html'), // 指定模版文件
      chunks: ['app'], // 指定需要加载的 chunk
      inject: 'body', // 指定 script 脚本注入的位置为 body
    },
  ])
  .end()
  // 提取 CSS 样式到单独 css 文件
  .plugin('extract-css')
  .use(require('mini-css-extract-plugin'), [
    {
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[contenthash].css',
    },
  ])
  .end()
  /********** 配置Dev 环境 **********/
  .devServer.host('0.0.0.0') // 服务器外部可访问
  .disableHostCheck(true) // 关闭白名单校验
  .contentBase([path.resolve(__dirname, './public')]) // 设置一个 express 静态目录
  .historyApiFallback({
    disableDotRule: true, // 禁止在链接中使用 "." 符号
    rewrites: [
      { from: /^\/$/, to: '/index.html' }, // 将所有的 404 响应重定向到 index.html 页面
    ],
  })
  .port(8080) // 当前端口号
  .hot(true) // 打开页面热载功能
  .sockPort('location') // 设置成平台自己的端口
  // 配置代理
  .open(true)
  .before((app, devServer, compiler) => {
    // 添加自定义中间件
    app.use((req, res, next) => {
      // 遇到 /api 的接口的时候，把请求的 headers 值清空
      if (req.url.startsWith('/api')) {
        // 这一步很重要，不然代理会失败
        req.headers = {};
      }
      next();
    });
  })
  .proxy({
    // 将所有 /api 的接口都做一层代理，
    '/api': {
      target: 'https://www.lanqiao.cn',
    },
  });

//----- 配置优化 开始 -----
config.when(
  !isDev,
  () => {
    // 生成环境优化配置
    // 将生产环境的代码进行压缩，并且去掉代码中的注释：
    config.optimization
      .minimize(true) // 打开压缩代码开关
      .minimizer('terser')
      .use(require('terser-webpack-plugin'), [
        {
          extractComments: false, // 去除注释
          terserOptions: {
            output: {
              comments: false, // 去除注释
            },
          },
        },
      ]);
  },
  () => {
    // 开发环境的时候将 devtool 改成 cheap-module-eval-source-map 加快编译速度
    config.devtool('cheap-module-eval-source-map');
  }
);

// webpack 分包机制
// 1. 将 node_modules 目录下所有的依赖都打包到 chunk-vendor.js 文件，优先级最高。
// 2. 将重复次数 >=2 的依赖打包到 chunk-common.js 文件。
// 3. 把 webpack runtime 代码从每个 chunk 中抽离，单独打包到 runtime.js 文件。
config.optimization
  .splitChunks({
    cacheGroups: {
      vendors: {
        // 分离入口文件引用 node_modules 的 module（vue、@babel/xxx）
        name: `chunk-vendors`,
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial',
      },
      common: {
        // 分离入口文件引用次数 >=2 的 module
        name: `chunk-common`,
        minChunks: 2,
        priority: -20,
        chunks: 'initial',
        reuseExistingChunk: true,
      },
    },
  })
  .runtimeChunk('single'); // 分离 webpack 的一些帮助函数，比如 webpackJSONP 等等
//----- 配置优化 end-------

// 导出 webpack 配置
module.exports = config.toConfig();
