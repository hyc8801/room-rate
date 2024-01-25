/** 获取成套住宅总数 */
export const getTotal = (data: any[]) => {
  let _data: any[] = [];
  data.map((item) => {
    _data = _data.concat(item.rooms);
  });
  return _data.filter((item) => item.use === '成套住宅').length;
};

/** 获取最大的楼层数 */
export function findMaxFlr(arr: any[]) {
  let maxFlr = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Number(arr[i].flr) > maxFlr) {
      maxFlr = Number(arr[i].flr);
    }
  }
  return maxFlr;
}
