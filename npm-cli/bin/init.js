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
  fs.cp(
    source,
    target,
    {
      force: true, // 是否强制生成文件, 若文件已存在则覆盖
      // errorOnExist: true, // force 为 false 且文件已存在时，抛出错误
      // recursive: false, // 是否递归复制
    },
    function (error) {
      const fileName = target.split(appPath)[1];
      if (error) {
        console.log(`${fileName} 复制失败!`, error);
        console.log(error);
        console.log();
        return;
      }
      console.log(`${fileName} 复制成功!`);
    }
  );
}

// 复制文件夹
function copyDir(sourceDir, destDir) {
  fs.readdir(sourceDir, (error, files) => {
    if (error) {
      console.log(`${destDir} 复制失败`);
      console.log(error);
      console.log();
      return;
    }
    files.map((fileName) => {
      const filePath = path.join(sourceDir, fileName);
      if (Utils.isFile(filePath)) {
        // 文件
        const target = path.join(destDir, fileName);
        copyFile(filePath, target);
      } else {
        // 文件夹
        destDir = path.join(destDir, fileName);
        copyDir(filePath, destDir);
      }
    });
    //
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
  try {
    fs.accessSync(sourceDir, fs.constants.F_OK);
  } catch (err) {
    return console.error('模板不存在, 请重新安装');
  }

  // 验证目标文件夹是否存在
  try {
    fs.accessSync(destDir, fs.constants.F_OK);
    const files = fs.readdirSync(destDir);
    files.length &&
      checkDestDirExist(files).then((answers) => {
        if (answers.continue) {
          copyDir(sourceDir, destDir);
        } else {
          process.exit();
        }
      });
  } catch (err) {
    // 目标文件夹不存在, 可以复制
    console.log('== 开始复制模板 ==');
    copyDir(sourceDir, destDir);
  }
}

module.exports = init;
