import {Ethereum_balance, Get_ERC20_token} from "./balances.services";
import {Fetch_CoinGecko} from "./prices.service";
const Solde = async (address: `0x${string}`) => {
  const erc20 = await Get_ERC20_token(address)
  return erc20
}
export default Solde
