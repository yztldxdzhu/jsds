export function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}
export function replace(arr, index, e) {
  arr[index] = e;
}