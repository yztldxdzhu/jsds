export default interface IStack<E> {
  getSize(): number;
  isEmpty(): boolean;
  push(e: E): void; // 入栈
  pop(): E; // 出栈
  peek(): E; // 栈顶
}
