
const fetch_transaction = async (walletaddress: `0x${string}`) => {
  try {
    const apikey = process.env.ALCHEMY_KEY || ""
    const URL = `https://eth-mainnet.g.alchemy.com/v2/${apikey}`
    const options = {
      method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'alchemy_getAssetTransfers',
          params: [
            {
              fromBlock: '0x0',
              fromAddress: walletaddress,
              category: [ "external", "internal", 'erc721', 'erc1155']
            }
          ]
      })
    }
    const response = await fetch(URL, options)
    const data = await response.json()
    console.log("Alchemy status:", response.status)
    console.log("Alchemy response:", data.result)
    if (!response.ok) {
        throw new Error(`Alchemy error ${response.status}: ${data}`)
    }
    return data
  } catch (Error) {
    console.error(Error)
    throw Error
  }
}
export { fetch_transaction }
