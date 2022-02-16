#!/usr/bin/env node

const program = require('commander');

// 独立执行文件不可再次设置 .command().alias()
program
  .option('-g, --global', 'global uninstallation')
  .option('-f, --force', 'force uninstallation');

program.parse(process.argv);

const args = program.args;
// console.log('== args ==', args);
if (!args.length) {
  console.error('packages required');
  process.exit(1);
}

const options = program.opts();
const { force, global } = options;
if (force) {
  console.log('force  uninstall');
}
if (global) {
  console.log('global  uninstall');
}

args.forEach(function (pkg) {
  console.log('  uninstall : %s', pkg);
});
