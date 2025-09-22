"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import PortfolioChart from "@/components/PortfolioChart"
import { TrendingUp, TrendingDown, Search, DollarSign, Percent, BarChart3 } from "lucide-react"
import Link from "next/link"

// Mock portfolio data
const mockPortfolioItems = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 25,
    averagePrice: 165.5,
    currentPrice: 175.43,
    totalValue: 4385.75,
    unrealizedPL: 248.25,
    unrealizedPLPercent: 6.0,
  },
  {
    id: "2",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 5,
    averagePrice: 2900.0,
    currentPrice: 2847.32,
    totalValue: 14236.6,
    unrealizedPL: -263.4,
    unrealizedPLPercent: -1.82,
  },
  {
    id: "3",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quantity: 30,
    averagePrice: 370.25,
    currentPrice: 378.85,
    totalValue: 11365.5,
    unrealizedPL: 258.0,
    unrealizedPLPercent: 2.32,
  },
  {
    id: "4",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    quantity: 12,
    averagePrice: 275.8,
    currentPrice: 248.42,
    totalValue: 2981.04,
    unrealizedPL: -328.56,
    unrealizedPLPercent: -9.94,
  },
]

const mockPortfolioHistory = [
  { date: "2024-01-01", value: 100000 },
  { date: "2024-01-02", value: 102000 },
  { date: "2024-01-03", value: 98000 },
  { date: "2024-01-04", value: 105000 },
  { date: "2024-01-05", value: 108000 },
  { date: "2024-01-06", value: 112000 },
  { date: "2024-01-07", value: 115000 },
  { date: "2024-01-08", value: 118500 },
  { date: "2024-01-09", value: 116200 },
  { date: "2024-01-10", value: 119800 },
]

export default function PortfolioPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("value")
  const [filterBy, setFilterBy] = useState("all")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  // Calculate portfolio totals
  const totalValue = mockPortfolioItems.reduce((sum, item) => sum + item.totalValue, 0)
  const totalUnrealizedPL = mockPortfolioItems.reduce((sum, item) => sum + item.unrealizedPL, 0)
  const totalUnrealizedPLPercent = (totalUnrealizedPL / (totalValue - totalUnrealizedPL)) * 100

  // Filter and sort portfolio items
  const filteredItems = mockPortfolioItems
    .filter((item) => {
      const matchesSearch =
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "gains" && item.unrealizedPL > 0) ||
        (filterBy === "losses" && item.unrealizedPL < 0)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "value":
          return b.totalValue - a.totalValue
        case "pl":
          return b.unrealizedPL - a.unrealizedPL
        case "symbol":
          return a.symbol.localeCompare(b.symbol)
        default:
          return 0
      }
    })

  return (
    <Layout>
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio</h1>
            <p className="text-muted-foreground">Track your investments and performance</p>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge
                    variant={totalUnrealizedPL >= 0 ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {totalUnrealizedPL >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {formatPercent(totalUnrealizedPLPercent)}
                  </Badge>
                  <span>
                    {totalUnrealizedPL >= 0 ? "+" : ""}
                    {formatCurrency(totalUnrealizedPL)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(user?.virtualBalance || 50000)}</div>
                <p className="text-xs text-muted-foreground">Ready to invest</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Holdings</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockPortfolioItems.length}</div>
                <p className="text-xs text-muted-foreground">Different stocks</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Portfolio Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Your portfolio value over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <PortfolioChart data={mockPortfolioHistory} className="h-[400px]" />
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Allocation */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Top Holdings</CardTitle>
                  <CardDescription>Your largest positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPortfolioItems
                      .sort((a, b) => b.totalValue - a.totalValue)
                      .slice(0, 5)
                      .map((item) => {
                        const percentage = (item.totalValue / totalValue) * 100
                        return (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div>
                                <p className="font-medium">{item.symbol}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-[120px]">{item.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{percentage.toFixed(1)}%</p>
                              <p className="text-xs text-muted-foreground">{formatCurrency(item.totalValue)}</p>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Your Holdings</CardTitle>
                    <CardDescription>Detailed view of all your positions</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search stocks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-[200px]"
                      />
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="value">Total Value</SelectItem>
                        <SelectItem value="pl">P&L</SelectItem>
                        <SelectItem value="symbol">Symbol</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterBy} onValueChange={setFilterBy}>
                      <SelectTrigger className="w-full sm:w-[120px]">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="gains">Gains</SelectItem>
                        <SelectItem value="losses">Losses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <div>
                          <h3 className="font-semibold text-lg">{item.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{item.name}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>{item.quantity} shares</p>
                          <p>Avg: {formatCurrency(item.averagePrice)}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-semibold">{formatCurrency(item.currentPrice)}</p>
                          <p className="text-sm text-muted-foreground">Current Price</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">{formatCurrency(item.totalValue)}</p>
                          <p className="text-sm text-muted-foreground">Total Value</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={item.unrealizedPL >= 0 ? "default" : "destructive"}
                            className="flex items-center gap-1"
                          >
                            {item.unrealizedPL >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {formatPercent(item.unrealizedPLPercent)}
                          </Badge>
                          <p
                            className={`text-sm font-medium ${item.unrealizedPL >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {item.unrealizedPL >= 0 ? "+" : ""}
                            {formatCurrency(item.unrealizedPL)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/market/${item.symbol}`}>View</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/trade/sell?symbol=${item.symbol}`}>Sell</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  )
}
