import publicClient from "@/lib/viem";
import { formatEther } from "viem";
import { erc20Abi } from "viem";
import { formatUnits } from "viem";
import {Fetch_CoinGecko , fetch_price} from "./prices.service";
interface TokenBalance {
    contractAddress: `0x${string}`;
    tokenBalance: string;
}
const Ethereum_balance = async (address: `0x${string}`):Promise<Number> => {
  const rawEthBalance = await publicClient.getBalance({ address })
  const ethBalance = formatEther(rawEthBalance)
  return Number(ethBalance)
}
const Get_ERC20_token = async(address:`0x${string}`) =>
{
  const apikey = process.env.ALCHEMY_KEY || ""
  const URL = `https://eth-mainnet.g.alchemy.com/v2/${apikey}`
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'alchemy_getTokenBalances',
      params: [
        address,
        "erc20",
        {}
      ]
    })
  };
  const response = await fetch(URL, options)
  if (!response) {
    throw new Error("Failed to fetch ")
  };
  const data = await response.json();
  const tokens: TokenBalance[] = data.result.tokenBalances;
  const tokens_filtered = tokens.filter(
      token => token.tokenBalance !== "0x0"
  );
  const portfolio = await Promise.all(
    tokens_filtered.map(async (token) => {
      const meta = await get_metadata(token.contractAddress);
      const balance = formatUnits(
        BigInt(token.tokenBalance),
        meta.decimals
      );
      const price = await fetch_price(token.contractAddress.toLowerCase())
      if (price === 0) {
        return null;
      }
      const usdValue = Number(balance) * Number(price);
      if (Number.isNaN(usdValue)) {
        throw new Error("Unable to calculate usd value");
      }
      return {
        address: token.contractAddress,
        name: meta.name,
        symbol: meta.symbol,
        decimals: meta.decimals,
        balance,
        price,
        usdValue,
      };
    }).filter(Boolean)
  );

  return portfolio;
  }
export { Ethereum_balance , Get_ERC20_token}
const get_metadata = async (address: `0x${string}`) => {
  const [name, symbol, decimals] = await Promise.all([
    publicClient.readContract({
      address,
      abi: erc20Abi,
      functionName: "name",
    }),
    publicClient.readContract({
      address,
      abi: erc20Abi,
      functionName: "symbol",
    }),
    publicClient.readContract({
      address,
      abi: erc20Abi,
      functionName: "decimals",
    }),
  ]);

  return {
    address,
    name,
    symbol,
    decimals,
  };
};
