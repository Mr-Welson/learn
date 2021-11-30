# Rollup



![rollup-logo](https://github.com/Mr-Welson/learn/blob/main/rollup/rollup.png?raw=true)

> Q：为什么要学 rollup.js ？
>
> A：因为大家都在卷(roll)

## 介绍

[**Rollup**](https://www.rollupjs.com/)  是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

Rollup 对代码模块使用新的标准化格式 (**ES6语法**)，而不是以前的特殊解决方案，如 CommonJS 和 AMD。加载 CommonJS 模块和使用 Node 模块位置解析逻辑都被实现为可选插件，需要安装对应插件然后在 `rollup.config.js` 中启用他们，后文中会具体示例。

ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

Rollup 已被许多主流的 JavaScript 库使用，也可用于构建绝大多数应用程序。但是 Rollup 还不支持一些特定的高级功能，尤其是用在构建一些应用程序的时候，特别是代码拆分和运行时态的动态导入 [dynamic imports at runtime](https://github.com/tc39/proposal-dynamic-import). 如果你的项目中更需要这些功能，那使用 [Webpack](https://webpack.js.org/)可能更符合你的需求。

## 教程

开始前，需要安装 [Node.js](https://nodejs.org/)， 这样才可以使用 [npm](https://npmjs.com/)

### 安装

```
// 全局安装
npm install rollup --global

// 查看版本号
rollup -v
```

### 命令行打包

文件目录  ` rollup/src/command ` 

- 打包

```
 rollup src/command/main.js -f cjs
```

`-f` 选项是 `--output.format` 的缩写，指定了所创建的 bundle 类型为 CommonJS（在 Node.js 中运行），由于没有指定输出文件，所以会直接打印在控制台

- 打包并保存为 ` bundle.js `

```
rollup src/command/main.js -o bundle.js -f cjs
```

`-o` 选项是 `--output.file` 的缩写，指定需要保存的文件名称

### 使用配置文件

源文件目录  ` rollup/src/command ` 

1. 在项目根目录创建 ` rollup.config.js`

```
export default {
  input: 'src/command/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
}
```

2. 打包

```
// 默认使用项目根目录下的配置文件(rollup.config.js) 
rollup -c

// 命令行参数会覆盖配置文件（打包文件命名为 bundle1.js）
rollup -c -o bundle1.js

// 指定配置文件路径(使用 rollup.config.dev.js)
rollup -c rollup.config.dev.js
```

### 使用插件

源文件目录  ` rollup/src/plugin` 

这里以读取 json 文件为例，需要使用 ` `rollup-plugin-json` `  插件，文件目录  ` rollup/src/plugin`

1.  初始化 npm 环境

```
npm init -y
```

2. 安装 rollup-plugin-json 插件

```
npm install --save-dev rollup-plugin-json
```

3. 修改  `rollup.config.js` , 使用 `rollup-plugin-json` 插件

```
import json from 'rollup-plugin-json'
export default {
  input: 'src/plugin/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [json()]
}
```

4. 添加 `src/plugin/main.js` ，读取 `package.json` 中的版本号

```
import { version } from '../../package.json';

export default function () {
  console.log('version ' + version);
}
```

5. 执行打包命令

```
rollup -c
```

6. 使用 npm 命令打包

修改 ` package.json `, 添加 `build` 命令

```
{
  "devDependencies": {
    "rollup-plugin-json": "^4.0.0"
  },
  "scripts": {
    "build": "rollup -c"
  }
}
```

7. 执行打包

```
npm run build
```

### 使用 npm packages

源文件目录  ` rollup/src/packages`

在项目中我们可能会使用到一些从 npm 安装到 `node_modules` 文件夹中的依赖包，但 Rollup 不知道如何去处理这些依赖，所以我们需要添加一些配置。

[rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve)  插件可以告诉 Rollup 如何查找外部模块。同时，由于不同的库导出方式不一样，有 `ES6` 导出，也有 `CommonJS` 导出的，而 `Rollup` 是不支持 `CommonJS` 语法的，所以需要使用另一个 插件  [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs)  进行编译。

#### ESModule

依赖导出方式为 ESModule，需要使用  `rollup-plugin-node-resolve`  插件来告诉 `Rollup` 查找外部依赖 。

以`the-answer ` 依赖为例：

1. 安装 `the-answer`

```
npm i the-answer
```

2. 添加 `src/plugin/esm.js` 文件

```
import answer from 'the-answer';

export function showAnswer() {
  console.log('答案: ' + answer);
}
```

3. 安装 `rollup-plugin-node-resolve` 插件

```
npm install --save-dev rollup-plugin-node-resolve
```

4. 修改  `rollup.config.js` , 使用 `rollup-plugin-node-resolve` 插件，修改打包入口文件

```
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/plugin/esm.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve()
  ]
}
```

5. 执行打包

```
npm run build
```

#### CommonJS Module

依赖导出方式为 ` CommonJS` ，需要添加 `rollup-plugin-commonjs` 插件将 CommonJS 转换成 ES2015 模块。

以  `dayjs ` 依赖为例：

1. 安装 `dayjs `

```
npm i dayjs
```

2. 添加 `src/plugin/commonjs.js` 文件

```
import dayjs from 'dayjs';

export default function () {
  console.log('当前时间: ' + dayjs().format('YYYY-MM-DD HH:mm:ss'));
}
```

3. 安装 `rollup-plugin-commonjs` 插件

```
npm install --save-dev rollup-plugin-commonjs
```

4. 修改  `rollup.config.js` , 使用 `rollup-plugin-node-resolve` 插件

```
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/packages/commonjs.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    resolve()
  ]
}
```

5. 执行打包

```
npm run build
```

#### 











