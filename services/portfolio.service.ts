import Ethereum_balance from "./balances.services";
import Fetch_CoinGecko from "./prices.service";
const Solde = async (address: `0x${string}`): Promise <Number> => {
  const eth_balances = await Ethereum_balance(address)
  const coin_price = await Fetch_CoinGecko(["ethereum"])
  const eth = coin_price[0]
  const balance =  Number(eth.current_price) * Number(eth_balances)
  return balance
}
export default Solde
