const Fetch_CoinGecko = async (ids: string[]) => {
  const id = ids.join(",")
  const api_key = process.env.COIN_GECKO_API_KEY || ""

  const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`, {
    method: "GET",
    headers: {
      'x-cg-demo-api-key':api_key,
    }
      })
  if (!response.ok) {
    console.log("hello ricci")
  }
  const data = await response.json();
  return data;
}
export  {Fetch_CoinGecko , fetch_price , fetch_prices}

// CoinGecko accepts a comma-separated list, so one request covers many tokens.
// Chunked to keep the URL a sane length, and the chunks run one after another
// so we never burst the demo-tier rate limit.
const PRICE_CHUNK_SIZE = 50

const fetch_prices = async (contract_addresses: string[]): Promise<Record<string, number>> => {
  const api_key = process.env.COIN_GECKO_API_KEY || ""
  const unique = [...new Set(contract_addresses.map(address => address.toLowerCase()))]
  const prices: Record<string, number> = {}

  for (let i = 0; i < unique.length; i += PRICE_CHUNK_SIZE) {
    const chunk = unique.slice(i, i + PRICE_CHUNK_SIZE)
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${chunk.join(",")}&vs_currencies=usd`, {
      method: "GET",
      headers: {
        'x-cg-demo-api-key':api_key,
      }
        })
    if (!response.ok) {
      throw new Error(`failed to fetch prices (${response.status} ${response.statusText})`)
    }
    const data = await response.json();
    for (const [address, value] of Object.entries<{ usd?: number }>(data ?? {})) {
      prices[address.toLowerCase()] = value?.usd ?? 0
    }
  }
  return prices
}
const fetch_price = async ( contract_address:string): Promise<Number> => {
  const api_key = process.env.COIN_GECKO_API_KEY || ""
  //https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&symbols=btc
  //https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599&vs_currencies=usd
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contract_address}&vs_currencies=usd`, {
    method: "GET",
    headers: {
      'x-cg-demo-api-key':api_key,
    }
      })
  if (!response.ok) {
    throw new Error ("failed to fetch prices")
  }
  const data = await response.json();
  if (!data) {
    throw new Error ("Failed to fetch Prices")
  }
  return data[contract_address]?.usd ?? 0
}
