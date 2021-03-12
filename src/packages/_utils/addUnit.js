// 添加单位
export function addUnit(value, unit = "rpx") {
  value = String(value);
  return /^(\d+|-\d+)$/.test(value) ? `${value}${unit}` : value;
}
