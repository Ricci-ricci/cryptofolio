import {Ethereum_balance, Get_ERC20_token} from "./balances.services";
import {Fetch_CoinGecko} from "./prices.service";
const Solde = async (address: `0x${string}`) => {
  const coin_eth = await Fetch_CoinGecko(["ethereum"])
  const price = Number(coin_eth[0].current_price)
  const balance_eth =  await Ethereum_balance(address)
  const balances = price * Number(balance_eth)
  const erc20 = await Get_ERC20_token(address)

  const tokenTotal = erc20.reduce(
    (sum, token) => sum + token.usdValue,
    0
  );
  const totalValue = balance_eth + Number(tokenTotal);
  return {
    walletAddress: address,
    totalValue:totalValue,
    ethereum: {
      balance: balance_eth,
      price:price,
      value:balances
    },
    token:erc20
  }
}
export default Solde
