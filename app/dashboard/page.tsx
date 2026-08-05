import PageContainer from "@/components/containers/page-containers"
import PortfolioSection from "@/components/sections/portfolio-section"
import TokenSection from "@/components/sections/token-section"
import TransactionSection from "@/components/sections/transaction-section"
import WalletSection from "@/components/sections/wallet-section"
import { data } from "@/dumbdata/dumbdata"
const Dashboard = () => {
  return <PageContainer>
              <PortfolioSection />
              <TokenSection />
              <TransactionSection />
              <WalletSection />
        </PageContainer>
}
export default Dashboard
