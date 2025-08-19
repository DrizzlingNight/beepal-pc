// 這邊放的是共用性的 js 操作函式

// 陣列裡面透過kf的值查找kt的值
export const getKtFromListByKf = (list, kf, kt, val, _default = undefined) => {
  if (!list.length) {
    return
  }
  const obj = list.find(o => o[kf] === val)
  if (typeof obj === 'undefined') {
    console.error(
      `[list裡面透過kf查找kt失敗]：${JSON.stringify(
        list,
        null,
        2
      )} ${kf} ${kt} ${val}`
    )
    return _default
  } else {
    return obj[kt]
  }
}
