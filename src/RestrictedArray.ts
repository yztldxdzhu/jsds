/**
 * 限制数组
 * js 数组本身是动态，可以自由扩容
 * 这个数组对 js 的数组多加了一些限制
 */
export default class RestrictedArray<E> {
  private data: Array<E>;
  private size: number;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: any) {
    // 如果用户传了容量就是用户给的，如果没传就是默认的 10
    capacity = capacity === undefined ? 10 : capacity;
    this.data = Array.from({ length: capacity });
    this.size = 0;
  }
  // 获取数组的容量
  getCapacity(): number {
    return this.data.length;
  }
  // 获取数组中的元素个数
  getSize(): number {
    return this.size;
  }
  // 返回数组是否为空
  isEmpty(): boolean {
    return this.size === 0;
  }
  // 在 index 索引的位置插入一个新元素
  add(index: number, e: E): void {
    if (this.size === this.getCapacity()) {
      throw new Error("add 失败，RestrictedArray 满了！");
    }
    // index <= size 为了保证不是稀疏数组
    if (index < 0 || index >= this.size) {
      throw new Error("add 失败，索引范围：0 <= index <= size");
    }
    // 满了，扩容 2 倍
    if (this.size === this.getCapacity()) {
      this._resize(2 * this.getCapacity());
    }
    for (let i = this.size - 1; i >= index; i--) {
      this.data[i + 1] = this.data[i];
    }
    this.data[index] = e;
    this.size++;
  }
  // 追加一个新元素
  addLast(e: E): void {
    this.add(this.size, e);
  }
  // 在最前面添加一个新元素
  addFirst(e: E): void {
    this.add(0, e);
  }
  // 获取 index 索引位置的元素
  get(index: number): E {
    // 不是稀疏数组
    if (index < 0 || index >= this.size) {
      throw new Error("get 失败，索引范围：0 <= index <= size");
    }
    return this.data[index];
  }
  getLast(): E {
    return this.get(this.size - 1);
  }
  getFirst(): E {
    return this.get(0);
  }
  set(index: number, e: E): void {
    // 不是稀疏数组
    if (index < 0 || index >= this.size) {
      throw new Error("set 失败，索引范围：0 <= index <= size");
    }
    this.data[index] = e;
  }
  setLast(e: E): void {
    this.set(this.size - 1, e);
  }
  setFirst(e: E): void {
    this.set(0, e);
  }
  remove(index: number): E {
    // 不是稀疏数组
    if (index < 0 || index >= this.size) {
      throw new Error("remove 失败，索引范围：0 <= index <= size");
    }
    let ret = this.data[index];
    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i];
    }
    this.size--;

    this.data[this.size] = null;

    // 元素很少时，缩容
    // if (this.size === this.getCapacity() / 2) {
    //   this._resize(this.getCapacity() / 2);
    // }
    // 更好的缩容方案，为了避免震荡时间复杂度
    if (this.size == this.getCapacity() / 4 && this.getCapacity() / 2 != 0) {
      this._resize(this.getCapacity() / 2);
    }

    return ret;
  }
  removeFirst(): E {
    return this.remove(0);
  }
  removeLast(): E {
    return this.remove(this.size - 1);
  }
  // 查找数组中是否有元素 e
  contains(e: E): boolean {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) return true;
    }
    return false;
  }
  // 查找数组中元素e所在的索引，如果不存在元素e，则返回-1
  indexOf(e: E): number {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) return i;
    }
    return -1;
  }
  // 从数组中删除元素 e，只删除 1 个
  removeElement(e: E): void {
    let index = this.indexOf(e);
    if (index !== -1) this.remove(index);
  }
  // 从数组中删除元素 e，删除全部
  removeElements(e: E): void {
    let index = this.indexOf(e);
    while (index !== -1) {
      this.remove(index);
      index = this.indexOf(e);
    }
  }
  // 序列化
  toString(): string {
    let s = "[";
    for (let i = 0; i < this.size; i++) {
      s += this.data[i];
      if (i !== this.size - 1) {
        s += ", ";
      }
    }
    s += "]";
    return s;
  }
  // 动态扩容和缩容
  private _resize(newCapacity: number) {
    let newData = Array.from({ length: newCapacity }) as E[];
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
}
