"use client"
import PageContainer from "@/components/containers/page-containers"
import PortfolioSection from "@/components/sections/portfolio-section"
import TokenSection from "@/components/sections/token-section"
import TransactionSection from "@/components/sections/transaction-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PortfolioData } from "@/types/portfolio"
import type { TransactionData } from "@/types/transaction"
import { useState, useEffect } from "react"

const fetch_data = async (walletaddress: string) => {
  const response = await fetch(`/api/portfolio/${walletaddress}`)
  if (!response.ok) {
    throw new Error("failed to fetch data from the walletaddress")
  }
  const data:PortfolioData = await response.json()
  return data
}
const fetch_transactions = async (walletaddress: string) => {
  const response = await fetch(`/api/transactions/${walletaddress}`)
  if (!response.ok) {
    throw new Error("failed to fetch transactions from the walletaddress")
  }
  const data:TransactionData = await response.json()
  return data
}
const Dashboard = () => {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [transactions, setTransactions] = useState<TransactionData | null>(null)
  const [walletaddress , setWalletaddress] = useState("")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reload, setReload] = useState(0)
  useEffect(() => {
    if (!walletaddress) return
    // Évite d'écrire le résultat d'une adresse qu'on a déjà remplacée.
    let cancelled = false
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Les deux endpoints sont indépendants : on les lance en parallèle.
        const [portfolio, transfers] = await Promise.all([
          fetch_data(walletaddress),
          fetch_transactions(walletaddress),
        ])
        if (!cancelled) {
          setData(portfolio)
          setTransactions(transfers)
        }
      } catch (error) {
        if (!cancelled) setError(error instanceof Error ? error.message : "unknown error")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadData()
    return () => { cancelled = true }
  }, [walletaddress, reload])
  return <PageContainer>
              <form
                className="flex w-full gap-2"
                onSubmit={(event) => {
                  event.preventDefault()
                  setWalletaddress(input.trim())
                  setReload((count) => count + 1)
                }}
              >
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="0x..."
                  aria-label="wallet address"
                />
                <Button type="submit" disabled={!input.trim() || loading}>
                  {loading ? "Chargement..." : "Charger"}
                </Button>
              </form>
              {error && (
                <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
              )}
              <PortfolioSection data={data} />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <TokenSection data={data} />
                    {/* `key` remet la pagination à zéro quand on change de wallet. */}
                    <TransactionSection
                      key={walletaddress}
                      data={transactions}
                      walletAddress={walletaddress}
                    />
              </div>
        </PageContainer>
}
export default Dashboard
