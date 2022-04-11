// 栈 stack
// 特点: 先入后出, 只允许在栈顶操作
/** API
 * push: 栈顶添加元素
 * pop: 栈顶移除元素
 * peek: 查看栈顶元素
 * isEmpty: 检查栈是否为空
 * clear: 清空栈所有元素
 * size: 获取栈长度
 */

const Stack = function () {
  var items = []
  this.items = []
}

Stack.prototype.push = function (node) {
  this.items.push(node)
}

Stack.prototype.pop = function () {
  this.items.pop()
}

Stack.prototype.peek = function () {
  const node = this.items[this.items.length - 1]
  return node
}

Stack.prototype.isEmpty = function () {
  return this.items.length === 0
}

Stack.prototype.clear = function () {
  return this.items = []
}

Stack.prototype.size = function () {
  return this.items.length
}

var items = new Stack()
items.push(1)



