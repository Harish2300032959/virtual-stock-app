"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import PortfolioChart from "@/components/PortfolioChart"
import StockCard from "@/components/StockCard"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Users, Activity } from "lucide-react"
import Link from "next/link"

// Mock data - replace with real API calls
const mockPortfolioData = [
  { date: "2024-01-01", value: 100000 },
  { date: "2024-01-02", value: 102000 },
  { date: "2024-01-03", value: 98000 },
  { date: "2024-01-04", value: 105000 },
  { date: "2024-01-05", value: 108000 },
  { date: "2024-01-06", value: 112000 },
  { date: "2024-01-07", value: 115000 },
]

const mockTopStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.15, changePercent: 1.24, volume: 45234567 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2847.32, change: -15.67, changePercent: -0.55, volume: 1234567 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 378.85, change: 5.23, changePercent: 1.4, volume: 23456789 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 248.42, change: -8.91, changePercent: -3.46, volume: 34567890 },
]

const mockRecentTrades = [
  { id: "1", symbol: "AAPL", type: "buy" as const, quantity: 10, price: 173.28, timestamp: "2024-01-07T10:30:00Z" },
  { id: "2", symbol: "GOOGL", type: "sell" as const, quantity: 2, price: 2863.0, timestamp: "2024-01-07T09:15:00Z" },
  { id: "3", symbol: "MSFT", type: "buy" as const, quantity: 15, price: 373.62, timestamp: "2024-01-06T14:45:00Z" },
]

const mockLeaderboard = [
  { rank: 1, name: "Sarah Johnson", returns: 23.45, portfolioValue: 123450 },
  { rank: 2, name: "Mike Chen", returns: 18.92, portfolioValue: 118920 },
  { rank: 3, name: "Emily Davis", returns: 15.67, portfolioValue: 115670 },
  { rank: 4, name: "You", returns: 12.34, portfolioValue: 112340 },
  { rank: 5, name: "Alex Wilson", returns: 9.87, portfolioValue: 109870 },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [portfolioValue] = useState(115000)
  const [dailyChange] = useState(2340)
  const [dailyChangePercent] = useState(2.08)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Layout>
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Here's your trading overview for today</p>
          </div>

          {/* Portfolio Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(portfolioValue)}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge variant={dailyChange >= 0 ? "default" : "destructive"} className="flex items-center gap-1">
                    {dailyChange >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {formatPercent(dailyChangePercent)}
                  </Badge>
                  <span>
                    {dailyChange >= 0 ? "+" : ""}
                    {formatCurrency(dailyChange)} today
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Virtual Balance</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(user?.virtualBalance || 50000)}</div>
                <p className="text-xs text-muted-foreground">Available for trading</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">+3 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#4</div>
                <p className="text-xs text-muted-foreground">Out of 1,247 traders</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Portfolio Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Your portfolio value over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <PortfolioChart data={mockPortfolioData} className="h-[300px]" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Trades */}
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Trades</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/portfolio">View All</Link>
                    </Button>
                  </div>
                  <CardDescription>Your latest trading activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant={trade.type === "buy" ? "default" : "secondary"}>
                            {trade.type.toUpperCase()}
                          </Badge>
                          <div>
                            <p className="font-medium">{trade.symbol}</p>
                            <p className="text-xs text-muted-foreground">
                              {trade.quantity} shares @ {formatCurrency(trade.price)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{formatCurrency(trade.quantity * trade.price)}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(trade.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Top Stocks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Market Movers</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/market">View Market</Link>
                  </Button>
                </div>
                <CardDescription>Top performing stocks today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockTopStocks.map((stock) => (
                    <StockCard
                      key={stock.symbol}
                      stock={stock}
                      onClick={() => window.open(`/market/${stock.symbol}`, "_self")}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Top traders this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((trader) => (
                    <div
                      key={trader.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        trader.name === "You" ? "bg-accent/10 border border-accent/20" : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {trader.rank}
                        </div>
                        <div>
                          <p className="font-medium">{trader.name}</p>
                          <p className="text-xs text-muted-foreground">{formatCurrency(trader.portfolioValue)}</p>
                        </div>
                      </div>
                      <Badge variant={trader.returns >= 0 ? "default" : "destructive"}>
                        {formatPercent(trader.returns)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with your next trade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/trade/buy">Buy Stocks</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/trade/sell">Sell Stocks</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/market">Browse Market</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/tutorials">Learn Trading</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  )
}
