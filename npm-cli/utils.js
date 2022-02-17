const fs = require('fs');

exports.isFile = function (filePath) {
  return fs.lstatSync(filePath).isFile();
};

exports.isDirectory = function (filePath) {
  return fs.lstatSync(filePath).isDirectory();
};
