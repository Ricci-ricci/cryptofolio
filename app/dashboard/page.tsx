import PageContainer from "@/components/containers/page-containers"
import PortfolioSection from "@/components/sections/portfolio-section"
import TokenSection from "@/components/sections/token-section"
import TransactionSection from "@/components/sections/transaction-section"
import WalletSection from "@/components/sections/wallet-section"
const Dashboard = () => {
  return <PageContainer>
              <PortfolioSection />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <TokenSection />
                    <TransactionSection />
              </div>
        </PageContainer>
}
export default Dashboard
