export function currency(num) {
  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

}
