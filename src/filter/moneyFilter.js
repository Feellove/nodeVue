export function toMoney(money = 0){
  return money.toFixed(2)
}

export function totalMoney(money, num){
  return money * num.toFixed(2)
}
