import IStack from "./interface/IStack";
import RestrictedArray from "./RestrictedArray";

export default class RestrictedArrayStack<E> implements IStack<E> {
  private restrictedArray: RestrictedArray<E>;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: any) {
    capacity = capacity === undefined ? undefined : capacity;
    this.restrictedArray = new RestrictedArray<E>(capacity);
  }
  getCapacity(): number {
    return this.restrictedArray.getCapacity();
  }
  getSize(): number {
    return this.restrictedArray.getSize();
  }
  isEmpty(): boolean {
    return this.restrictedArray.isEmpty();
  }
  push(e: E): void {
    this.restrictedArray.addLast(e);
  }
  pop(): E {
    return this.restrictedArray.removeLast();
  }
  peek(): E {
    return this.restrictedArray.getLast();
  }
  // 序列化
  toString(): string {
    let s = "RestrictedArrayStack => [";
    for (let i = 0; i < this.getSize(); i++) {
      s += this.restrictedArray[i];
      if (i !== this.getSize() - 1) {
        s += ", ";
      }
    }
    s += "]";
    return s;
  }
}
