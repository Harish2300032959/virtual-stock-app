"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Layout from "@/components/Layout"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, ArrowLeft, BarChart3, DollarSign, Activity, Calendar } from "lucide-react"
import Link from "next/link"

// Mock stock data
const mockStockData = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45234567,
    marketCap: 2800000000000,
    high52Week: 198.23,
    low52Week: 124.17,
    peRatio: 28.5,
    dividend: 0.96,
    beta: 1.2,
    description:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    sector: "Technology",
    employees: 164000,
    founded: "1976",
    headquarters: "Cupertino, CA",
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2847.32,
    change: -15.67,
    changePercent: -0.55,
    volume: 1234567,
    marketCap: 1800000000000,
    high52Week: 3030.93,
    low52Week: 2193.62,
    peRatio: 25.8,
    dividend: 0,
    beta: 1.1,
    description:
      "Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.",
    sector: "Technology",
    employees: 190234,
    founded: "1998",
    headquarters: "Mountain View, CA",
  },
  // Add more mock data as needed
}

// Mock price history data
const mockPriceHistory = [
  { date: "2024-01-01", price: 170.25, volume: 42000000 },
  { date: "2024-01-02", price: 172.15, volume: 38000000 },
  { date: "2024-01-03", price: 168.9, volume: 45000000 },
  { date: "2024-01-04", price: 174.3, volume: 41000000 },
  { date: "2024-01-05", price: 176.8, volume: 39000000 },
  { date: "2024-01-06", price: 173.2, volume: 43000000 },
  { date: "2024-01-07", price: 175.43, volume: 45234567 },
]

// Mock news data
const mockNews = [
  {
    id: "1",
    title: "Apple Reports Strong Q4 Earnings",
    summary:
      "Apple Inc. reported better-than-expected quarterly earnings with strong iPhone sales driving revenue growth.",
    publishedAt: "2024-01-07T10:30:00Z",
    source: "Financial Times",
    url: "#",
  },
  {
    id: "2",
    title: "New iPhone Features Drive Consumer Interest",
    summary:
      "The latest iPhone features are generating significant consumer interest and pre-order numbers are exceeding expectations.",
    publishedAt: "2024-01-06T14:15:00Z",
    source: "TechCrunch",
    url: "#",
  },
  {
    id: "3",
    title: "Apple Expands Services Revenue",
    summary:
      "Apple's services division continues to show strong growth, contributing significantly to overall revenue.",
    publishedAt: "2024-01-05T09:45:00Z",
    source: "Bloomberg",
    url: "#",
  },
]

export default function StockDetailPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = params.symbol as string
  const [timeframe, setTimeframe] = useState("1D")

  const stock = mockStockData[symbol as keyof typeof mockStockData] || {
    symbol: symbol,
    name: `${symbol} Corporation`,
    price: 100.0,
    change: 0,
    changePercent: 0,
    volume: 1000000,
    marketCap: 10000000000,
    high52Week: 120.0,
    low52Week: 80.0,
    peRatio: 20.0,
    dividend: 0,
    beta: 1.0,
    description: `${symbol} is a publicly traded company.`,
    sector: "Technology",
    employees: 10000,
    founded: "2000",
    headquarters: "San Francisco, CA",
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`
    }
    return formatCurrency(value)
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

  const isPositive = stock.change >= 0

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-foreground">{stock.symbol}</h1>
              <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1">
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {formatPercent(stock.changePercent)}
              </Badge>
            </div>
            <p className="text-muted-foreground">{stock.name}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href={`/trade/buy?symbol=${stock.symbol}`}>Buy Stock</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/trade/sell?symbol=${stock.symbol}`}>Sell Stock</Link>
            </Button>
          </div>
        </div>

        {/* Price Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stock.price)}</div>
              <div className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}
                {formatCurrency(stock.change)} ({formatPercent(stock.changePercent)})
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatMarketCap(stock.marketCap)}</div>
              <p className="text-xs text-muted-foreground">Total market value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stock.volume.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Shares traded today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">52W Range</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {formatCurrency(stock.low52Week)} - {formatCurrency(stock.high52Week)}
              </div>
              <p className="text-xs text-muted-foreground">52-week high/low</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Price Chart</CardTitle>
                  <div className="flex space-x-2">
                    {["1D", "1W", "1M", "3M", "1Y"].map((period) => (
                      <Button
                        key={period}
                        variant={timeframe === period ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
                <CardDescription>Stock price movement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPriceHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        }
                        className="text-xs fill-muted-foreground"
                      />
                      <YAxis tickFormatter={formatCurrency} className="text-xs fill-muted-foreground" />
                      <Tooltip
                        formatter={(value: number) => [formatCurrency(value), "Price"]}
                        labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: "hsl(var(--accent))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stock Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Stock Information</CardTitle>
                <CardDescription>Key metrics and company details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">P/E Ratio</span>
                    <span className="font-medium">{stock.peRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Dividend</span>
                    <span className="font-medium">{stock.dividend > 0 ? formatCurrency(stock.dividend) : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Beta</span>
                    <span className="font-medium">{stock.beta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sector</span>
                    <span className="font-medium">{stock.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Employees</span>
                    <span className="font-medium">{stock.employees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Founded</span>
                    <span className="font-medium">{stock.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Headquarters</span>
                    <span className="font-medium">{stock.headquarters}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs for additional information */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Overview</CardTitle>
                  <CardDescription>About {stock.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{stock.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Latest News</CardTitle>
                  <CardDescription>Recent news and updates about {stock.symbol}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockNews.map((article) => (
                      <div key={article.id} className="border-b border-border pb-4 last:border-b-0">
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-2">{article.summary}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{article.source}</span>
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Analysis</CardTitle>
                  <CardDescription>Key technical indicators and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Support & Resistance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Resistance</span>
                          <span className="font-medium">{formatCurrency(stock.price * 1.05)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Support</span>
                          <span className="font-medium">{formatCurrency(stock.price * 0.95)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Moving Averages</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">50-day MA</span>
                          <span className="font-medium">{formatCurrency(stock.price * 0.98)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">200-day MA</span>
                          <span className="font-medium">{formatCurrency(stock.price * 0.92)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
