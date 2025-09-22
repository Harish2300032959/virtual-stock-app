"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "@/components/Layout"
import { Search, TrendingUp, TrendingDown, Filter, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock market data
const mockStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45234567,
    marketCap: 2800000000000,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2847.32,
    change: -15.67,
    changePercent: -0.55,
    volume: 1234567,
    marketCap: 1800000000000,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 5.23,
    changePercent: 1.4,
    volume: 23456789,
    marketCap: 2900000000000,
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.42,
    change: -8.91,
    changePercent: -3.46,
    volume: 34567890,
    marketCap: 800000000000,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 3247.15,
    change: 12.45,
    changePercent: 0.38,
    volume: 12345678,
    marketCap: 1600000000000,
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 487.23,
    change: -7.89,
    changePercent: -1.59,
    volume: 18765432,
    marketCap: 1200000000000,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.64,
    change: 23.45,
    changePercent: 2.75,
    volume: 28901234,
    marketCap: 2200000000000,
  },
  {
    symbol: "NFLX",
    name: "Netflix, Inc.",
    price: 456.78,
    change: -3.21,
    changePercent: -0.7,
    volume: 8765432,
    marketCap: 200000000000,
  },
  {
    symbol: "CRM",
    name: "Salesforce, Inc.",
    price: 234.56,
    change: 4.32,
    changePercent: 1.88,
    volume: 5432109,
    marketCap: 230000000000,
  },
  {
    symbol: "UBER",
    name: "Uber Technologies, Inc.",
    price: 67.89,
    change: 1.23,
    changePercent: 1.85,
    volume: 15432109,
    marketCap: 140000000000,
  },
  {
    symbol: "SPOT",
    name: "Spotify Technology S.A.",
    price: 189.45,
    change: -2.34,
    changePercent: -1.22,
    volume: 3210987,
    marketCap: 36000000000,
  },
  {
    symbol: "ZOOM",
    name: "Zoom Video Communications, Inc.",
    price: 78.9,
    change: 0.56,
    changePercent: 0.71,
    volume: 4321098,
    marketCap: 23000000000,
  },
]

const marketCategories = [
  { name: "All Stocks", value: "all" },
  { name: "Technology", value: "tech" },
  { name: "Healthcare", value: "healthcare" },
  { name: "Finance", value: "finance" },
  { name: "Consumer", value: "consumer" },
  { name: "Energy", value: "energy" },
]

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("marketCap")
  const [filterBy, setFilterBy] = useState("all")
  const [category, setCategory] = useState("all")
  const router = useRouter()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(1)}T`
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(1)}B`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`
    }
    return formatCurrency(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  // Filter and sort stocks
  const filteredStocks = mockStocks
    .filter((stock) => {
      const matchesSearch =
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "gainers" && stock.change > 0) ||
        (filterBy === "losers" && stock.change < 0)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "marketCap":
          return (b.marketCap || 0) - (a.marketCap || 0)
        case "price":
          return b.price - a.price
        case "change":
          return b.change - a.change
        case "volume":
          return b.volume - a.volume
        case "symbol":
          return a.symbol.localeCompare(b.symbol)
        default:
          return 0
      }
    })

  const handleStockClick = (symbol: string) => {
    router.push(`/market/${symbol}`)
  }

  // Market statistics
  const gainers = mockStocks.filter((stock) => stock.change > 0).length
  const losers = mockStocks.filter((stock) => stock.change < 0).length
  const unchanged = mockStocks.length - gainers - losers

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Stock Market</h1>
          <p className="text-muted-foreground">Explore and analyze stocks with real-time data</p>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStocks.length}</div>
              <p className="text-xs text-muted-foreground">Available for trading</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gainers</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{gainers}</div>
              <p className="text-xs text-muted-foreground">Stocks up today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Losers</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{losers}</div>
              <p className="text-xs text-muted-foreground">Stocks down today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unchanged</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unchanged}</div>
              <p className="text-xs text-muted-foreground">No change today</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Market Explorer</CardTitle>
            <CardDescription>Search and filter stocks to find investment opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by symbol or company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {marketCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketCap">Market Cap</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change">Change</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="symbol">Symbol</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full lg:w-[140px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="gainers">Gainers</SelectItem>
                  <SelectItem value="losers">Losers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stock List */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Listings</CardTitle>
            <CardDescription>
              {filteredStocks.length} stocks found
              {searchTerm && ` for "${searchTerm}"`}
              {filterBy !== "all" && ` (${filterBy})`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredStocks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No stocks found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterBy("all")
                    setCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleStockClick(stock.symbol)}
                  >
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{stock.symbol}</h3>
                          <Badge
                            variant={stock.change >= 0 ? "default" : "destructive"}
                            className="flex items-center gap-1"
                          >
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {formatPercent(stock.changePercent)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Vol: {stock.volume.toLocaleString()}</span>
                          {stock.marketCap && <span>Cap: {formatMarketCap(stock.marketCap)}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">{formatCurrency(stock.price)}</p>
                        <p className={`text-sm font-medium ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {stock.change >= 0 ? "+" : ""}
                          {formatCurrency(stock.change)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStockClick(stock.symbol)
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/trade/buy?symbol=${stock.symbol}`)
                          }}
                        >
                          Buy
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
