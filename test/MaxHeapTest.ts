import MaxHeap from "../src/MaxHeap";

function test() {
  let n = 1000000;
  let maxHeap = new MaxHeap();
  let res = [];
  for (let i = 0; i < n; i++) {
    maxHeap.add(Math.floor(Math.random() * 10));
  }
  for (let i = 0; i < n; i++) {
    res.push(maxHeap.deleteMax());
  }
  for (let i = 0; i < res.length; i++) {
    if (res[i] < res[i + 1]) {
      throw new Error("你代码写错了！");
    }
  }
}
test();
