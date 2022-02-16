const fs = require('fs');

exports.isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};
