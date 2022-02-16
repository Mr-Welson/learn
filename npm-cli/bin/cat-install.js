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
