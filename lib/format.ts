// Les prix de tokens peuvent être minuscules (ex: 8.6e-10). Avec un arrondi à
// 2 décimales ils s'afficheraient tous "$0.00", d'où les chiffres
// significatifs en dessous d'un centime.
export const format_usd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value !== 0 && Math.abs(value) < 0.01 ? 10 : 2,
  })
