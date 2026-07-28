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
    throw new Error ("failed to fetch prices")
  }
  const data = await response.json();
  return data;
}
export default Fetch_CoinGecko
