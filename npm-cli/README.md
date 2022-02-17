# Node-cli 

命令行工具（Cmmand Line Interface）简称 `cli`，顾名思义就是在命令行终端中使用的工具。本文记录从零发布一个简单命令行工具的全过程。

请确保电脑装有 `Node.js v12+`   环境

## 初始化

开始之前先看一下初始化之后的目录结构

[完整代码](https://github.com/Mr-Welson/learn/tree/main/npm-cli)

```
┌── bin							// 命令行文件夹
│   ├── cat-install.js			// 命令行主入口
│   ├── cat-uninstall.js		// 命令行主入口
│   └── cat.js					// 命令行主入口
│   └── update.js				// 命令行主入口
├── package.json
└── README.md
```

接下来开始正式进入项目初始化

```
// 创建一个  npm-cli 空文件夹并进入 
mkdir npm-cli && cd npm-cli

// 初始化一个项目, 会生成一个 package.json 文件
npm init -y

// 创建一个 bin 文件夹
mkdir bin && cd bin

// 创建一个 cat.js 文件
touch cat.js
```

```
// cat.js
console.log('this is cat')
```

在生成的 `package.json` 中添加 `bin` 属性来定义命令名称及执行文件

```
"bin": {
    "cat": "./bin/cat.js"
}
```

此时执行 `cat` 命令，会报错："***'dog' 不是内部或外部命令，也不是可运行的程序或批处理文件*** "，是因为这个命令还没有被链接到全局。需要执行 `npm link` 命令，如执行命令出现报错，则重新执行一次。

```
npm link
```

当依赖包没有安装到全局时，可以使用 `npm link` 进行手动链接，方便本地开发和调试。此时，再次输入 `cat` 命令，就可以看到 `cat.js` 内的代码被执行了。

当命令行工具包发布到 `npm` 上，然后通过全局安装，就可以直接执行命令，不需要 `link` 了

## 添加命令 

需要借助 `commander.js` 来实现我们的命令行工具， [Commander.js](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)  是一个完整的 `node.js` 命令行解决方案。

安装 `commander`  （以下版本为 V9.0.0）

```
npm i commander -S
```

声明 `program ` 变量

```
// 以下两种申明方式均可
// 直接引用
const { program } = require('commander');

// 创建实例
const { Command } = require('commander');
const program = new Command();
```

设置一些基本信息，第一行代码是必须添加的，指定这里使用 node 解析这个脚本

```
#!/usr/bin/env node

const program = require('commander');
const packageJson = require('../package');

program
  .name('cat')
  .version(packageJson.version, '-v, --version')
  .usage('<command> [options]')
  .description('Cat is a fake package manager');
 
program.parse(process.argv)
```

末尾的 `program.parse(process.argv)` 代码不能丢，否则无法解析输入的参数

### 选项-Options

- 使用 `.option()` 方法来定义选项，同时可以附加选项的简介
- 每个选项可以定义一个短选项名称（-后面接单个字符）和一个长选项名称（--后面接一个或多个单词），使用逗号、空格或`|`分隔

- 通过`Command`对象上的`.opts()`方法获取选项的值，同时会被传递给命令处理函数。可以使用`.getOptionValue()`和`.setOptionValue()`操作单个选项的值

- 对于多个单词的长选项，选项名会转为驼峰命名法（camel-case），例如`--template-engine`选项可通过`program.opts().templateEngine`获取

- 多个短选项可以合并简写，其中最后一个选项可以附加参数。 例如，`-a -b -p 80`也可以写为`-ab -p80`，甚至进一步简化为`-abp80`

- `--`可以标记选项的结束，后续的参数均不会被命令解释，可以正常使用

```
const { program } = require('commander');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-t, --type <type>', 'flavour of pizza');

const options = program.opts();
console.log(options)
```

### 命令-Command 

- 通过 `.command()` 或 `.addCommand()` 可以配置命令，有两种实现方式：**可执行文件**或**绑定处理函数**，下面有详细介绍。

- 通过 `.alias()` 可以给命令指定一个简写。

- `.command()`的第一个参数为命令名称。命令参数可以跟在名称后面，也可以用`.argument()`单独指定。

- 参数可为必选的（尖括号表示）、可选的（方括号表示）或变长参数（点号表示，如果使用，只能是最后一个参数）。

- 添加命令的基本语法  `.command('命令名称 <必要参数> [可选参数]', '命令描述', 命令配置项)`

#### **命令配置项**

- `hidden?:  boolean`   使用 `--help` 命令时是否显示该命令，默认 ` false `。
- `isDefault?: boolean`  是否默认执行该命令，指定多个 `default`时，只会执行最后一个定义的命令
- `executableFile?: string`  指定可执行文件的路径
- `noHelp?: boolean`  `v7`版本后废弃，被 `hidden` 代替

#### 添加命令的两种方式

##### 可执行文件

通过独立的的可执行文件来添加命令,  返回最顶层的命令(`program`) 以供继续添加子命令

- 当 `.command() `带有描述参数(第二个参数)时，就意味着使用独立的可执行文件作为子命令
- Commander 将会尝试在入口脚本 (` ./bin/cat.js` ) 所在的目录中搜索 programName-command 文件, 即为该命令的执行文件, 如: `cat-install.js`
- 通过配置选项 `executableFile` 可以指定执行文件的路径

```
program
  .command('install [name]', 'install one or more packages')
  .alias('i')
  .command('uninstall <name>', 'uninstall one packages')
  .command('update', 'update installed packages', {
    executableFile: './update'
  });
```

上述代码中添加了 `install`、`uninstall`、`update` 3 个命令，其中只有 `update` 命令指定了执行文件的路径，因此，我们在 `bin` 文件夹下分别创建 `cat-install.js`、`cat-uninstall.js`、`update.js` 3 个文件

`cat-install.js` 示例

```
#!/usr/bin/env node

const program = require('commander');

// 独立执行文件不可再次设置 .command().alias()
program
  .option('-g, --global', 'global installation')
  .option('-f, --force', 'force installation');

program.parse(process.argv);

const options = program.opts();
// console.log('== options ==', options);
const { force, global } = options;
if (force) {
  console.log('force: install');
}
if (global) {
  console.log('global: install');
}

const args = program.args;
// console.log('== args ==', args);

if (!args.length) {
  console.error('install all packages');
} else {
  args.forEach(function (pkg) {
    console.log('  install : %s', pkg);
  });
}
```

`update.js` 示例

```
#!/usr/bin/env node

console.log('== update ==');
```

##### 绑定处理函数

通过绑定处理函数来添加命令, (命令描述只能放在`.command`后),  返回新生成的命令(即该子命令)以供继续配置

- 用 `.action` 绑定函数实现命令

```
program
  .command('hello', {
    hidden: true, // hidden 为 true 则不会显示在帮助信息里
  })
  .action(() => {
    console.log('cat-cli');
  });
  
program
  .command('generate [type]')
  .alias('g')
  .description('generate file from a template  (short-cut alias: "g")')
  .action((type) => {
    console.log('== type ==', type);
  });
```

## 使用命令

到这里，一个简单的命令行工具就完成了，终端输入 `cat` 命令，就可以看到一些提示信息了。

```
// 测试 install 命令
cat install pkg1 pkg2 -g -f
```

