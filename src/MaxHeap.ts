import { swap, replace } from "./utils.js";

export default class MaxHeap {
  private data: number[];
  constructor() {
    this.data = [];
  }
  /**
   * 获取最大堆的 size
   */
  getSize(): number {
    return this.data.length;
  }
  /**
   * 判断最大堆是否为空
   */
  isEmpty(): boolean {
    return this.data.length === 0;
  }
  // 获取当前索引节点的父节点的索引
  private _parent(index: number): number {
    if (index === 0) throw new Error("索引 0 没有父节点！");
    return Math.floor((index - 1) / 2);
  }
  // 获取当前索引节点的左子节点的索引
  private _left(index: number): number {
    return 2 * index + 1;
  }
  // 获取当前索引节点的右子节点的索引
  private _right(index: number): number {
    return 2 * index + 2;
  }
  /**
   * 向最大堆中添加一个元素
   * @param e 添加的元素
   */
  add(e: number): void {
    this.data.push(e);
    this._siftUp(this.data.length - 1);
  }
  // 上浮过程
  private _siftUp(index: number): void {
    while (index > 0 && this.data[index] > this.data[this._parent(index)]) {
      // index 不是父节点，并且当前节点 > 父节点
      swap(this.data, index, this._parent(index)); // 交换当前节点和父节点
      index = this._parent(index); // 循环条件
    }
  }
  /**
   * 获取最大堆最大的元素
   */
  getMax(): number {
    if (this.data.length === 0) throw new Error("最大堆空的！");
    return this.data[0];
  }
  /**
   * 删除最大堆最大的元素
   */
  deleteMax(): number {
    let ret = this.getMax();
    swap(this.data, 0, this.data.length - 1);
    this.data.pop();
    this._siftDown(0);
    return ret;
  }
  // 下沉过程
  private _siftDown(index: number): void {
    // 当前节点还有孩子
    while (this._left(index) < this.data.length) {
      // 比较左孩子和右孩子哪个大
      let max = this._left(index); // max 是左孩子索引， max+1 是右孩子索引
      if (max + 1 < this.data.length && this.data[max] < this.data[max + 1]) {
        max = this._right(index); // 右孩子大
      }
      // 右孩子和当前节点哪个大，来决定是否下沉
      if (this.data[index] < this.data[max]) {
        swap(this.data, index, max);
        index = max;
      } else {
        break;
      }
    }
  }
  /**
   * 取出最大元素后，放入一个新元素
   * @param e 用谁替换
   * 法1: 先 deleteMax() ，再 add(e) ，需要 2 次 O(log n) 操作。
   * 法2: 先替换堆顶元素，再 _siftDown() ，需要 1 次 O(log n) 操作。
   */
  public replace(e: number): number {
    let ret = this.getMax();
    replace(this.data, 0, e);
    this._siftDown(0);
    return ret;
  }
  /**
   *
   * @param arr 将任意数组整理成堆的形状
   * 法1: 向空数组中一个个添加。时间复杂度 O(nlogn)
   * 法2: 从最后一个非叶子节点开始，从后往前进行 _siftDown() 操作。时间复杂度 O(n)
   */
  public heapify(arr: Array<number>): void {
    for (let i = this._parent(arr.length - 1); i >= 0; i--) {
      this._siftDown(i);
    }
  }
}
