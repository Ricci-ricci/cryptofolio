// Les prix de tokens peuvent être minuscules (ex: 8.6e-10). Avec un arrondi à
// 2 décimales ils s'afficheraient tous "$0.00", d'où les chiffres
// significatifs en dessous d'un centime.
export const format_usd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value !== 0 && Math.abs(value) < 0.01 ? 10 : 2,
  })

// 0x8d97…feb9
export const format_address = (address: string) =>
  address.length > 12 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address

// Les montants on-chain vont de 0 à des valeurs minuscules (gas, dust), donc
// même logique que pour l'USD : plus de décimales sous le centième.
export const format_amount = (value: number) =>
  value.toLocaleString("en-US", {
    maximumFractionDigits: value !== 0 && Math.abs(value) < 0.01 ? 8 : 4,
  })

export const format_date = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

