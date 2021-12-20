const outputOptions = {
  // 核心参数
  /**
   * 输出包或sourcemap的路径和文件名
   * -o, --output.file
   * String
   */
  file: "bundle.js",
  /**
   * 输出包的格式
   * -f, --output.format
   * String 必填, 枚举值：
   * amd – 异步模块定义，用于像RequireJS这样的模块加载器
   * cjs – CommonJS，适用于 Node 和 Browserify/Webpack
   * esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
   * iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小）
   * umd – 通用模块定义，以amd，cjs 和 iife 为一体
   * system - SystemJS 加载器格式
   */
  format: "umd",
  /**
   * 生成包的名称(变量名称)
   * -n, --name
   * String 代表你的 iife/umd 包，同一页上的其他脚本可以访问它
   */
  // name: "MyBundle",
  /**
   * 全局变量申明
   * -g, --globals
   * Object 用于 umd/iife 包
   */
  globals: {
    jquery: '$'
  },

  // 高级参数
  /**
   * 路径
   * Function | Object 可用于配置 externals 的 cdn 引用
   */
  paths: {
    jquery: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js'
  },
  /**
   * 文件前置信息
   * String 自动添加到bundle最前面，可以添加作者、插件地址、版本信息等
   */
  banner: '/* my-library version 1.0 */',
  /**
   * 文件后置信息
   * String 追加到bundle文件末尾的信息
   */
  footer: '/* follow me on Github! */',
  /**
   * 代码包装器
   * String 类似banner/footer
   * intro 会放到正式代码开头
   * outro 会放到正式代码末尾
   * 可在打包的 bundle 中观察具体添加位置
   */
  intro: '/* intro test */',
  outro: '/* outro test */',
  /**
   * -m, --sourcemap
   * Boolean | 'inline' | 'hidden'
   * 默认false: 不创建 sourcemap 
   * true：将创建一个单独的sourcemap文件
   * inline：sourcemap 将作为数据 URI附加到生成的output文件中
   * hidden： 跟 true 类似，但是会屏蔽相应文件的注释信息
   */
  sourcemap: false,
  /**
   * String 生成的包的位置
   */
  // sourcemapFile: '',
  /**
   * Boolean
   * 默认为 true
   */
  // interop,

  // 危险区域
  // exports,
  // amd,
  // indent,
  /**
   * Boolean 默认为true
   * 是否在生成的非ES6包的顶部添加 'use strict' 语法
   */
  strict: true
};

module.exports = outputOptions;