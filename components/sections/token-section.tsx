import SectionContainer from "../containers/section-containers"
import ContentContainer from "../containers/content-containers"
const TokenSection = () => {
  return <SectionContainer title="token"><ContentContainer><div className="w-80 rounded-2xl border bg-white p-5 shadow-sm">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-900">
          BTC
        </h3>
        <p className="text-sm text-gray-500">
          Bitcoin
        </p>
      </div>
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
        +2.14%
      </span>
    </div>
    {/* Main value */}
    <div className="mt-5">
      <p className="text-sm text-gray-500">
        Total Value
      </p>

      <h2 className="text-3xl font-bold text-gray-900">
        $17,736.86
      </h2>
    </div>
    {/* Details */}
    <div className="mt-5 space-y-3">
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">
          Balance
        </span>
        <span className="font-medium">
          0.15 BTC
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">
          Price
        </span>
        <span className="font-medium">
          $118,245.75
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
          41%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-black"
          style={{ width: "41%" }}
        />
      </div>
    </div>
  </div></ContentContainer></SectionContainer>
}
export default TokenSection
