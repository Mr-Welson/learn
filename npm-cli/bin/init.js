const fs = require('fs');
const path = require('path');
const { isFile } = require('../utils');

function copyFile(source, target) {
  fs.cp(
    source,
    target,
    {
      force: true, // 是否强制生成文件, 若文件已存在则覆盖
      // errorOnExist: true, // force 为 false 且文件已存在时，抛出错误
      // recursive: false, // 是否递归复制
    },
    function (error, result) {
      if (error) {
        console.log(`${source} 复制失败!`);
        return;
      }
      console.log(`${source} 复制成功!`);
    }
  );
}

function copyDir(sourceDir, destDir) {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.log('== err ==', err);
      return;
    }
    files.map((fileName) => {
      const filePath = path.join(sourceDir, fileName);
      if (isFile(filePath)) {
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

// 生成模板
function init(destDir = 'mock') {
  // 模板目录路径
  // const sourceDir = '/usr/local/lib/node_modules/@welson/mock/template';
  const sourceDir = './template';
  // 在当前项目根目录创建 mock 文件夹
  console.log('== 开始复制模板 ==');
  // 验证模板文件是否存在
  try {
    fs.accessSync(sourceDir, fs.constants.F_OK);
  } catch (err) {
    return console.error('source dir is not exist');
  }

  copyDir(sourceDir, destDir);
}
module.exports = init;
