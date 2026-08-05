import SectionContainer from "../containers/section-containers"
import ContentContainer from "../containers/content-containers"
import { data } from "@/dumbdata/dumbdata"

const TokenSection = () => {
  const { assets } = data

  return <SectionContainer title="token"><ContentContainer><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {assets.map((asset) => (
      <div
        key={asset.symbol}
        className="w-full border bg-white p-5 "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {asset.symbol}
            </h3>
            <p className="text-sm text-gray-500">
              {asset.name}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              asset.change24h >= 0
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
          </span>
        </div>
        {/* Main value */}
        <div className="mt-5">
          <p className="text-sm text-gray-500">
            Total Value
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            ${asset.value.toLocaleString()}
          </h2>
        </div>
        {/* Details */}
        <div className="mt-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">
              Balance
            </span>
            <span className="font-medium">
              {asset.balance} {asset.symbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">
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
            <span className="text-sm text-gray-500">
              Portfolio Allocation
            </span>

            <span className="text-sm font-semibold">
              {asset.allocation}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-black"
              style={{ width: `${asset.allocation}%` }}
            />
          </div>
        </div>
      </div>
    ))}
  </div></ContentContainer></SectionContainer>
}
export default TokenSection
