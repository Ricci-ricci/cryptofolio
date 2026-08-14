// Forme d'une réponse `alchemy_getAssetTransfers` (JSON-RPC brut renvoyé tel
// quel par /api/transactions/[walletAddress]).
export type Transfer = {
  blockNum: string
  uniqueId: string
  hash: string
  from: string
  to: string | null
  value: number | null
  erc721TokenId: string | null
  erc1155Metadata: unknown | null
  tokenId: string | null
  asset: string | null
  category: string
  rawContract: {
    value: string | null
    address: string | null
    decimal: string | null
  }
  // Présent seulement si la requête demande `withMetadata`.
  metadata?: {
    blockTimestamp: string | null
  }
}

export type TransactionData = {
  jsonrpc: string
  id: number
  result: {
    transfers: Transfer[]
    pageKey?: string
  }
}
