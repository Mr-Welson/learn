// 队列 queue
// 特点: 先进先出
// 尾部添加, 顶部移除
// 它只允许在表的前端(队头/front)进行删除操作，而在表的后端(队尾/rear)进行插入操作
/** API
 * enqueue 队尾添加
 * dequeu 队头移除
 * front
 * isEmpty
 * clear
 * size
 */

function Queue() {
  this.items = [];
}
// 队尾添加
Queue.prototype.enqueue = function (node) {
  this.items.push(node);
};
// 队头移除
Queue.prototype.dequeue = function () {
  this.items.shift();
};
// 查看队列头
Queue.prototype.front = function () {
  return this.items[0];
};
// 检查是否为空
Queue.prototype.isEmpty = function () {
  return this.items.length === 0;
};
// 清空队列
Queue.prototype.clear = function () {
  return (this.items = []);
};
// 查看队列长度
Queue.prototype.size = function () {
  return this.items.length;
};
