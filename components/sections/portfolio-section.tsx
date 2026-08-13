import Image from "next/image"
import SectionContainer from "../containers/section-containers"
import ContentContainer from "../containers/content-containers"
import type { PortfolioData } from "@/types/portfolio"

const format_usd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })

const PortfolioSection = ({ data }: { data: PortfolioData | null }) => {
  const solde = data?.solde
  // Tant que le fetch n'a pas répondu, on garde la mise en page et on affiche "—".
  const token_value = solde?.token.reduce((sum, token) => sum + token.usdValue, 0)

  return <SectionContainer title="portfolio"><ContentContainer><div className="relative w-full overflow-hidden p-6 isolate">
    <Image
      src="/cyrpto.jpg"
      alt=""
      fill
      sizes="288px"
      className="-z-10 object-cover"
    />
    <div className="absolute inset-0 -z-10 bg-white/75 backdrop-blur-[2px] dark:bg-black/65" />

    {/* Title */}
    <p className="mb-3 text-sm text-gray-500 dark:text-muted-foreground">
      Total Portfolio Value
    </p>
    {/* Amount */}
    <div className="flex items-start gap-3">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground">
        {solde ? format_usd(solde.totalValue) : "—"}
      </h2>
    </div>
    {/* Ethereum Left / Tokens Right */}
    <div className="mt-5 flex justify-between">
      {/* Ethereum */}
      <div>
        <p className="text-sm text-gray-500 dark:text-muted-foreground">
          Ethereum
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-foreground">
          {solde ? format_usd(solde.ethereum.value) : "—"}
        </p>
        <p className="text-xs text-gray-500 dark:text-muted-foreground">
          {solde ? `${solde.ethereum.balance.toFixed(4)} ETH` : "—"}
        </p>
      </div>
      {/* Tokens */}
      <div className="text-right">
        <p className="text-sm text-gray-500 dark:text-muted-foreground">
          Tokens
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-foreground">
          {token_value !== undefined ? format_usd(token_value) : "—"}
        </p>
        <p className="text-xs text-gray-500 dark:text-muted-foreground">
          {solde ? `${solde.token.length} tokens` : "—"}
        </p>
      </div>
    </div>
  </div>
  </ContentContainer></SectionContainer>
  }
export default PortfolioSection
