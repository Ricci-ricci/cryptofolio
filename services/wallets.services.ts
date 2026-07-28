import publicClient from "@/lib/viem";
import { formatEther } from "viem";
const Fetch_Alchemy = async (address: `0x${string}`) => {
  const rawEthBalance = await publicClient.getBalance({ address })
  const ethBalance = formatEther(rawEthBalance)
  return ethBalance
}
export default Fetch_Alchemy
