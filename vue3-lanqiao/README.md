

## 项目初始化

```
// 创建文件夹
mkdir vue3-lanqiao && cd vue3-lanqiao

// 初始化项目
npm init -y

// 安装 webpack 依赖
yarn add -D webpack@5.11.0 webpack-cli@3.3.12 webpack-chain@6.5.1 webpack-dev-server@3.11.0
```

**目录结构**

```
vue3-lanqiao
├── babel.config.js // babel 配置文件
├── .browserslistrc // 项目所支持的浏览器列表
├── .eslintignore // eslint 的忽略文件列表
├── .eslintrc.js // eslint 配置文件
├── package.json // 项目 npm 清单文件
├── postcss.config.js // postcss 配置文件
├── public // 静态公共资源目录
│   ├── favicon.png // 页面图标
│   └── index.html // 页面入口模版
├── src // 源码
│   ├── App.vue // app 根组件
│   └── main.js // 项目入口文件
└── webpack.config.js // webpack 配置文件
```

