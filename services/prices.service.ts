const Fetch_CoinGecko = async (ids: string[]) => {
  const id = ids.join(",")
  const api_key = process.env.COIN_GECKO_API_KEY || ""

  const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currencies=usd&ids=${id}`, {
    method: "GET",
    headers: {
      'x-cg-demo-api-key':api_key,
    }
      })
  if (!response.ok) {
    throw new Error ("failed to fetch prices")
  }
  const data = await response.json();
  return data;
}
export  {Fetch_CoinGecko , fetch_price}
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
  console.log(response.status)
  const data = await response.json();
  if (!data) {
    throw new Error ("Failed to fetch Prices")
  }
  console.log(data)
  const prices = data[contract_address]?.usd ?? 0
  console.log(prices)
  return data[contract_address]?.usd ?? 0
}
