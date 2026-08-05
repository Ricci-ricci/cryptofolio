import SectionContainer from "../containers/section-containers"
import ContentContainer from "../containers/content-containers"
const PortfolioSection = () => {
  return <SectionContainer title="portfolio"><ContentContainer><div className="w-72 rounded-2xl bg-white dark:bg-card p-6">
    {/* Title */}
    <p className="mb-3 text-sm text-gray-500 dark:text-muted-foreground">
      Total Portfolio Value
    </p>
    {/* Amount + percentage */}
    <div className="flex items-start gap-3">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground">
        $12,450.00
      </h2>

      <span className="mt-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600 dark:bg-green-500/15 dark:text-green-400">
        +12.5%
      </span>
    </div>
    {/* Expenses Left / Income Right */}
    <div className="mt-5 flex justify-between">
      {/* Expenses */}
      <div>
        <p className="text-sm text-gray-500 dark:text-muted-foreground">
          Expenses
        </p>
        <p className="text-lg font-semibold text-red-500 dark:text-red-400">
          -$2,750
        </p>
      </div>
      {/* Income */}
      <div className="text-right">
        <p className="text-sm text-gray-500 dark:text-muted-foreground">
          Income
        </p>
        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
          +$8,200
        </p>
      </div>
    </div>
  </div>
  </ContentContainer></SectionContainer>
  }
export default PortfolioSection
