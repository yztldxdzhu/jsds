export default interface IQueue<E> {
    getSize(): number;
    isEmpty(): boolean;
    enQueue(e: E): void;
    deQueue(): E;
    queueHead(): E;
}
