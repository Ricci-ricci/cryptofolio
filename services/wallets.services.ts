import publicClient from "@/lib/viem";
import { formatEther } from "viem";
const Ethereum_balance = async (address: `0x${string}`): Promise <Number> => {
  const rawEthBalance = await publicClient.getBalance({ address })
  const ethBalance = formatEther(rawEthBalance)
  return Number(ethBalance)
}
export default Ethereum_balance
