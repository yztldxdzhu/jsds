export default interface IQueue<E> {
  getSize(): number;
  isEmpty(): boolean;
  enQueue(e: E): void; // 入队
  deQueue(): E; // 出队
  queueHead(): E; // 队首
}
