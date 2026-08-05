import SectionContainer from "../containers/section-containers"
import ContentContainer from "../containers/content-containers"
const TransactionSection = () => {
  const transactions = [
    {
      id: "TX001",
      type: "Buy",
      asset: "ETH",
      amount: 1.5,
      price: 3620,
      value: 5430,
      date: "2026-07-28T14:35:00Z",
      status: "Completed"
    },
    {
      id: "TX002",
      type: "Sell",
      asset: "BTC",
      amount: 0.05,
      price: 118000,
      value: 5900,
      date: "2026-07-25T10:20:00Z",
      status: "Completed"
    },
    {
      id: "TX003",
      type: "Buy",
      asset: "SOL",
      amount: 20,
      price: 180,
      value: 3600,
      date: "2026-07-20T16:45:00Z",
      status: "Pending"
    }
  ];
  return <SectionContainer title="transaction"><ContentContainer><div className="w-full  border bg-white dark:bg-card p-5 shadow-sm">
    {/* Header */}
    <div className="mb-5 flex justify-between">
      <h2 className="text-xl font-bold">
        Recent Transactions
      </h2>
      <span className="text-sm text-gray-500 dark:text-muted-foreground">
        Last activity
      </span>
    </div>
    {/* Transactions */}
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-white/5"
        >
          {/* Asset */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">
                {tx.asset}
              </h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  tx.type === "Buy"
                    ? "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400"
                    : "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
                }`}
              >
                {tx.type}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              {tx.amount} {tx.asset}
            </p>
          </div>


          {/* Price */}
          <div>
            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              Price
            </p>
            <p className="font-medium">
              ${tx.price.toLocaleString()}
            </p>
          </div>


          {/* Value */}
          <div>
            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              Value
            </p>
            <p className="font-semibold">
              ${tx.value.toLocaleString()}
            </p>
          </div>


          {/* Status */}
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              Status
            </p>

            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {tx.status}
            </span>
          </div>

        </div>
      ))}

    </div>


    {/* Button */}
    <button className="mt-5 w-full rounded-xl border py-3 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5">
      See More
    </button>

  </div></ContentContainer></SectionContainer>
}
export default TransactionSection
