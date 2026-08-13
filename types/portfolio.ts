export type Token = {
  address: string
  name: string
  symbol: string
  decimals: number
  balance: string
  price: number
  usdValue: number
}

export type Solde = {
  walletAddress: string
  totalValue: number
  ethereum: {
    balance: number
    price: number
    value: number
  }
  token: Token[]
}

export type PortfolioData = {
  solde: Solde
}
