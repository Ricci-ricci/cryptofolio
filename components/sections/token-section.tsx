import SectionContainer from "../containers/section-containers"
import ContentContainer from "../containers/content-containers"
import { format_usd } from "@/lib/format"
import type { PortfolioData } from "@/types/portfolio"

const TokenSection = ({ data }: { data: PortfolioData | null }) => {
  const solde = data?.solde
  const assets = solde?.token ?? []

  if (!solde) {
    return <SectionContainer title="token"><ContentContainer>
      <p className="p-5 text-sm text-gray-500 dark:text-muted-foreground">
        Charge une adresse wallet pour voir les tokens.
      </p>
    </ContentContainer></SectionContainer>
  }

  if (assets.length === 0) {
    return <SectionContainer title="token"><ContentContainer>
      <p className="p-5 text-sm text-gray-500 dark:text-muted-foreground">
        Aucun token valorisé sur ce wallet.
      </p>
    </ContentContainer></SectionContainer>
  }

  return <SectionContainer title="token"><ContentContainer><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2 max-h-150 overflow-y-auto pr-2">
    {assets.map((asset) => {
      // Part du token dans la valeur totale (ETH compris).
      const allocation = solde.totalValue > 0
        ? (asset.usdValue / solde.totalValue) * 100
        : 0

      return (
      <div
        key={asset.address}
        className="w-full border bg-white dark:bg-card p-5 "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-foreground">
              {asset.symbol}
            </h3>
            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              {asset.name}
            </p>
          </div>
        </div>
        {/* Main value */}
        <div className="mt-5">
          <p className="text-sm text-gray-500 dark:text-muted-foreground">
            Total Value
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground">
            {format_usd(asset.usdValue)}
          </h2>
        </div>
        {/* Details */}
        <div className="mt-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-muted-foreground">
              Balance
            </span>
            <span className="font-medium">
              {asset.balance} {asset.symbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-muted-foreground">
              Price
            </span>
            <span className="font-medium">
              {format_usd(asset.price)}
            </span>
          </div>
        </div>
        {/* Allocation */}
        <div className="mt-5">

          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500 dark:text-muted-foreground">
              Portfolio Allocation
            </span>

            <span className="text-sm font-semibold">
              {allocation.toFixed(2)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-white/10">
            <div
              className="h-2 rounded-full bg-black dark:bg-white"
              style={{ width: `${Math.min(allocation, 100)}%` }}
            />
          </div>
        </div>
      </div>
      )
    })}
  </div></ContentContainer></SectionContainer>
}
export default TokenSection
