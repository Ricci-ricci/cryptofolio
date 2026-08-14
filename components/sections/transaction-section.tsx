"use client"
import { useState } from "react"
import SectionContainer from "../containers/section-containers"
import ContentContainer from "../containers/content-containers"
import { format_address, format_amount, format_date } from "@/lib/format"
import type { TransactionData } from "@/types/transaction"

const PAGE_SIZE = 6

const TransactionSection = ({
  data,
  walletAddress,
}: {
  data: TransactionData | null
  walletAddress: string
}) => {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const transfers = data?.result?.transfers ?? []

  if (!data) {
    return <SectionContainer title="transaction"><ContentContainer>
      <p className="p-5 text-sm text-gray-500 dark:text-muted-foreground">
        Charge une adresse wallet pour voir les transactions.
      </p>
    </ContentContainer></SectionContainer>
  }

  if (transfers.length === 0) {
    return <SectionContainer title="transaction"><ContentContainer>
      <p className="p-5 text-sm text-gray-500 dark:text-muted-foreground">
        Aucune transaction sur ce wallet.
      </p>
    </ContentContainer></SectionContainer>
  }

  // Alchemy renvoie les transferts du plus ancien au plus récent : on inverse
  // sur le numéro de bloc (hex) pour afficher l'activité récente en premier.
  const sorted = [...transfers].sort(
    (a, b) => Number(BigInt(b.blockNum) - BigInt(a.blockNum))
  )
  const wallet = walletAddress.toLowerCase()

  return <SectionContainer title="transaction"><ContentContainer><div className="w-full  border bg-white dark:bg-card p-5 shadow-sm">
    {/* Header */}
    <div className="mb-5 flex justify-between">
      <h2 className="text-xl font-bold">
        Recent Transactions
      </h2>
      <span className="text-sm text-gray-500 dark:text-muted-foreground">
        {sorted.length} transfers
      </span>
    </div>
    {/* Transactions */}
    <div className="space-y-4">
      {sorted.slice(0, visible).map((tx) => {
        const sent = tx.from?.toLowerCase() === wallet
        const counterparty = sent ? tx.to : tx.from
        const timestamp = tx.metadata?.blockTimestamp

        return (
        <div
          key={tx.uniqueId}
          className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-4 dark:bg-white/5"
        >
          {/* Asset */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold">
                {tx.asset ?? tx.category.toUpperCase()}
              </h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  sent
                    ? "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
                    : "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400"
                }`}
              >
                {sent ? "Out" : "In"}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              {/* Les NFT (erc721/erc1155) n'ont pas de `value`. */}
              {tx.value !== null
                ? `${format_amount(tx.value)} ${tx.asset ?? ""}`
                : tx.tokenId
                  ? `#${tx.tokenId}`
                  : "—"}
            </p>
          </div>


          {/* Counterparty */}
          <div className="min-w-0">
            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              {sent ? "To" : "From"}
            </p>
            <p className="truncate font-medium">
              {counterparty ? format_address(counterparty) : "—"}
            </p>
          </div>


          {/* Date */}
          <div>
            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              Date
            </p>
            <p className="font-medium">
              {timestamp ? format_date(timestamp) : `#${BigInt(tx.blockNum)}`}
            </p>
          </div>


          {/* Hash */}
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              Tx
            </p>

            <a
              href={`https://etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {format_address(tx.hash)}
            </a>
          </div>

        </div>
        )
      })}

    </div>


    {/* Button */}
    {visible < sorted.length && (
      <button
        onClick={() => setVisible((count) => count + PAGE_SIZE)}
        className="mt-5 w-full rounded-xl border py-3 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5"
      >
        See More
      </button>
    )}

  </div></ContentContainer></SectionContainer>
}
export default TransactionSection
