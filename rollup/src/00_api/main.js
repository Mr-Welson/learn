import $ from 'jquery'
// 已在 outputOptions 中配置了 jquery 的 cnd 引用及全局变量 $ 申明，故不用在本地下载 jquery 依赖包

function test() {
  console.log('jquery', $);
}

function hello() {
  console.log('hello rollup');
}

module.exports = {
  test, hello
}

