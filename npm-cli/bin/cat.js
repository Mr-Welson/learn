#!/usr/bin/env node

const program = require('commander');
const packageJson = require('../package');

// 设置命令行的一些基本信息
program
  .name('cat')
  .version(packageJson.version, '-v, --version')
  .usage('<command> [options]')
  .description('Cat is a fake package manager');

// 可以通过以下两种方式来添加命令

// 1. 通过独立的的可执行[文件]实现命令, 返回最顶层的命令以供继续添加子命令
// 1.1. 当.command()带有描述参数(第二个参数)时，就意味着使用独立的可执行文件作为子命令
// 1.2. Commander 将会尝试在入口脚本(./bin/cat.js)所在的目录中搜索 programName-command 文件,  即为该命令的执行文件, 如: cat-install.js
// 1.3. 通过配置选项 executableFile 可以指定执行文件的路径
// 格式 .command('命令名称 <必要参数> [可选参数]', '命令描述', 命令配置)
program
  .command('install [name]', 'install one or more packages')
  .alias('i')
  .command('uninstall <name>', 'uninstall one packages')
  .command('update', 'update installed packages', {
    executableFile: './update',
  });

// 2. 通过绑定处理[函数]实现命令, (指令描述只能放在`.command`后), 返回新生成的命令(即该子命令)以供继续配置
// 格式 .command('命令名称 <必要参数> [可选参数]', 命令配置)
// 用 .action 绑定函数实现命令
program
  .command('hello', {
    // isDefault: true, // 当设置isDefault: true时，若没有指定其他子命令，则会默认执行这个命令
    hidden: true, // hidden 为 true 则不显示在帮助信息里
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

// 这一行不能丢, 否则无法解析输入的参数
program.parse(process.argv);
