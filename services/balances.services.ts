import publicClient from "@/lib/viem";
import { formatEther } from "viem";
import { erc20Abi } from "viem";
import { formatUnits } from "viem";
import { fetch_prices } from "./prices.service";
interface TokenAsset {
  address: `0x${string}`;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  price: number;
  usdValue: number;
}
interface TokenBalance {
    contractAddress: `0x${string}`;
    tokenBalance: string;
}
//limit for the call
const METADATA_CONCURRENCY = 5

// Runs `fn` over every item but keeps at most `limit` of them running at a time.
// Workers pull from a shared cursor, so a slow item doesn't stall the others.
const map_with_limit = async <T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> => {
  const results: R[] = new Array(items.length)
  let cursor = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await fn(items[index])
    }
  })
  await Promise.all(workers)
  return results
}

const Ethereum_balance = async (address: `0x${string}`):Promise<number> => {
  const rawEthBalance = await publicClient.getBalance({ address })
  const ethBalance = formatEther(rawEthBalance)
  return Number(ethBalance)
}
const Get_ERC20_token = async(address:`0x${string}`):Promise<TokenAsset[]> =>
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
  if (!response.ok) {
    throw new Error(`Failed to fetch token balances (${response.status} ${response.statusText})`)
  };
  const data = await response.json();
  const tokens: TokenBalance[] = data.result.tokenBalances;
  const tokens_filtered = tokens.filter(token => {
    try {
      return BigInt(token.tokenBalance) > BigInt(0)
    } catch {
      return false
    }
  });

  // Prices come first, in one batched call. to avoid anythings that cost call api
  const prices = await fetch_prices(tokens_filtered.map(token => token.contractAddress))
  const priced = tokens_filtered.filter(
    token => (prices[token.contractAddress.toLowerCase()] ?? 0) > 0
  );

  const portfolio =(await map_with_limit(priced, METADATA_CONCURRENCY, async (token) => {
    const meta = await get_metadata(token.contractAddress);
    const balance = formatUnits(
      BigInt(token.tokenBalance),
      meta.decimals
    );
    if (Number(balance) === 0) {
      return null
    }
    const price = prices[token.contractAddress.toLowerCase()];
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
  })).filter((token): token is TokenAsset => token !== null);
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
