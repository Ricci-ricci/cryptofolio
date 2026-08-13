import {Ethereum_balance, Get_ERC20_token} from "./balances.services";
import {Fetch_CoinGecko} from "./prices.service";
const Solde = async (address: `0x${string}`) => {
  const coin_eth = await Fetch_CoinGecko(["ethereum"])
  console.log("Coin eth")
  console.log(coin_eth)
  const price = Number(coin_eth[0].current_price)
  console.log("Price of Coin eth[0]")
  console.log(price)
  const balance_eth = await Ethereum_balance(address)
  console.log("Ethereum balance")
  console.log(balance_eth)
  const balances = price * Number(balance_eth)
  const erc20 = await Get_ERC20_token(address)
  console.log("ERC 20 Token")
  console.log(erc20)
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
