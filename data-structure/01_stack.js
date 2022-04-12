// 栈 stack
// 特点: 先入后出
// 先进入的数据被压入栈底，最后的数据在栈顶(栈的末尾), 只允许在栈顶添加或移出
/** API
 * push: 栈顶添加元素
 * pop: 栈顶移除元素
 * peek: 查看栈顶元素
 * isEmpty: 检查栈是否为空
 * clear: 清空栈所有元素
 * size: 获取栈长度
 */

function Stack() {
  this.items = [];
}
// 栈顶添加
Stack.prototype.push = function (node) {
  this.items.push(node);
};
// 栈顶弹出
Stack.prototype.pop = function () {
  this.items.pop();
};
// 查看栈顶
Stack.prototype.peek = function () {
  return this.items[this.items.length - 1];
};
// 检查是否为空
Stack.prototype.isEmpty = function () {
  return this.items.length === 0;
};
// 清空栈
Stack.prototype.clear = function () {
  return (this.items = []);
};
// 查看栈的长度
Stack.prototype.size = function () {
  return this.items.length;
};
