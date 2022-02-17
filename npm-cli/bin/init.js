const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const Utils = require('../utils');

const appPath = process.cwd();

// 获取 cat-cli 目录的绝对路径
function getRootPath() {
  return path.resolve(__dirname, '../');
}

// 复制文件
function copyFile(source, target) {
  fs.copyFile(source, target, function (error) {
    const fileName = target.split(`${appPath}\\`)[1];
    if (error) {
      console.log(`Error: ${fileName} 创建成功!`);
      console.log(error);
      console.log();
      return;
    }
    console.log(`${fileName} 创建成功!`);
  });
}

// 复制文件夹
function copyDir(sourceDir, destDir) {
  fs.readdir(sourceDir, (error, files) => {
    if (error) {
      console.log(`Error: ${destDir} 创建失败`);
      console.log(error);
      console.log();
      return;
    }
    files.map((file) => {
      const source = path.join(sourceDir, file);
      if (Utils.isFile(source)) {
        // 文件
        const target = path.join(destDir, file);
        copyFile(source, target);
      } else {
        // 文件夹
        const newDestDir = path.join(destDir, file);
        if (!fs.existsSync(newDestDir)) {
          fs.mkdirSync(newDestDir);
        }
        copyDir(source, newDestDir);
      }
    });
  });
}

function checkDestDirExist(files) {
  const questions = [
    {
      type: 'confirm',
      name: 'continue',
      message: '目标文件夹已存在且不为空, 是否要覆盖该文件夹 ?',
    },
  ];

  return inquirer.prompt(questions);
}

// 生成模板
function init(folderName = 'mock') {
  // 模板路径
  const sourceDir = path.join(getRootPath(), 'template');
  // 项目路径
  const destDir = path.join(appPath, folderName);

  // 验证模板文件是否存在
  if (!fs.existsSync(sourceDir)) {
    return console.error('模板不存在, 请重新安装');
  }

  // 验证目标文件夹是否存在
  if (fs.existsSync(destDir)) {
    const files = fs.readdirSync(destDir);
    files.length &&
      checkDestDirExist(files).then((answers) => {
        if (answers.continue) {
          copyDir(sourceDir, destDir);
        } else {
          console.log('已退出创建任务');
          process.exit();
        }
      });
  } else {
    // 创建文件夹
    fs.mkdirSync(destDir);
    copyDir(sourceDir, destDir);
  }
}

module.exports = init;
