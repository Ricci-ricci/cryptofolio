import { createPublicClient, http, formatEther, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'
const apikey = process.env.ALCHEMY_KEY || ""
const URL = `https://eth-mainnet.g.alchemy.com/v2/${apikey}`
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(URL) ,
  batch: {
      multicall: true, // Enables automatic batching for reads
  },
})
export default publicClient
