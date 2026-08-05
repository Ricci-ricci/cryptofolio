import SectionContainer from "../containers/section-containers"
import ContentContainer from "../containers/content-containers"
import { data } from "@/dumbdata/dumbdata"

const TokenSection = () => {
  const { assets } = data

  return <SectionContainer title="token"><ContentContainer><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2 max-h-150 overflow-y-auto pr-2">
    {assets.map((asset) => (
      <div
        key={asset.symbol}
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
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              asset.change24h >= 0
                ? "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
            }`}
          >
            {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
          </span>
        </div>
        {/* Main value */}
        <div className="mt-5">
          <p className="text-sm text-gray-500 dark:text-muted-foreground">
            Total Value
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground">
            ${asset.value.toLocaleString()}
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
              ${asset.price.toLocaleString()}
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
              {asset.allocation}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-white/10">
            <div
              className="h-2 rounded-full bg-black dark:bg-white"
              style={{ width: `${asset.allocation}%` }}
            />
          </div>
        </div>
      </div>
    ))}
  </div></ContentContainer></SectionContainer>
}
export default TokenSection
