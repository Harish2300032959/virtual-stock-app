"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "@/components/Layout"
import { Search, ExternalLink, Clock, TrendingUp, Filter, Newspaper } from "lucide-react"
import type { NewsItem } from "@/types"

// Mock news data
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Apple Reports Record Q4 Earnings, Beats Wall Street Expectations",
    summary:
      "Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone sales and growing services revenue. The company's stock surged in after-hours trading.",
    url: "#",
    publishedAt: "2024-01-07T10:30:00Z",
    source: "Financial Times",
    relatedSymbols: ["AAPL"],
  },
  {
    id: "2",
    title: "Federal Reserve Signals Potential Interest Rate Changes",
    summary:
      "The Federal Reserve indicated possible adjustments to interest rates in the coming months, citing inflation concerns and economic growth patterns. Markets reacted with mixed sentiment.",
    url: "#",
    publishedAt: "2024-01-07T09:15:00Z",
    source: "Reuters",
    relatedSymbols: [],
  },
  {
    id: "3",
    title: "Tesla Announces New Gigafactory in Southeast Asia",
    summary:
      "Tesla revealed plans for a new manufacturing facility in Southeast Asia, marking the company's continued global expansion. The announcement comes amid growing demand for electric vehicles in the region.",
    url: "#",
    publishedAt: "2024-01-07T08:45:00Z",
    source: "TechCrunch",
    relatedSymbols: ["TSLA"],
  },
  {
    id: "4",
    title: "Microsoft Azure Cloud Revenue Grows 30% Year-over-Year",
    summary:
      "Microsoft's cloud computing division showed strong growth in the latest quarter, with Azure revenue increasing significantly. The company continues to compete aggressively with Amazon Web Services.",
    url: "#",
    publishedAt: "2024-01-06T16:20:00Z",
    source: "Bloomberg",
    relatedSymbols: ["MSFT"],
  },
  {
    id: "5",
    title: "Cryptocurrency Market Sees Major Volatility Amid Regulatory News",
    summary:
      "Digital currencies experienced significant price swings following announcements from regulatory bodies. Bitcoin and Ethereum led the market movements with substantial trading volumes.",
    url: "#",
    publishedAt: "2024-01-06T14:30:00Z",
    source: "CoinDesk",
    relatedSymbols: [],
  },
  {
    id: "6",
    title: "Google Unveils New AI-Powered Search Features",
    summary:
      "Alphabet's Google introduced advanced artificial intelligence capabilities to its search platform, promising more accurate and contextual results for users worldwide.",
    url: "#",
    publishedAt: "2024-01-06T12:15:00Z",
    source: "The Verge",
    relatedSymbols: ["GOOGL"],
  },
  {
    id: "7",
    title: "Oil Prices Rise on Supply Chain Concerns",
    summary:
      "Crude oil prices increased following reports of potential supply chain disruptions in key producing regions. Energy sector stocks responded positively to the news.",
    url: "#",
    publishedAt: "2024-01-06T11:00:00Z",
    source: "Wall Street Journal",
    relatedSymbols: [],
  },
  {
    id: "8",
    title: "Netflix Subscriber Growth Exceeds Forecasts",
    summary:
      "The streaming giant reported subscriber additions that surpassed analyst predictions, driven by popular original content and international expansion efforts.",
    url: "#",
    publishedAt: "2024-01-05T15:45:00Z",
    source: "Variety",
    relatedSymbols: ["NFLX"],
  },
]

const newsCategories = [
  { name: "All News", value: "all" },
  { name: "Earnings", value: "earnings" },
  { name: "Technology", value: "technology" },
  { name: "Markets", value: "markets" },
  { name: "Economy", value: "economy" },
  { name: "Crypto", value: "crypto" },
]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  // Filter and sort news
  const filteredNews = mockNews
    .filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.source.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        category === "all" ||
        (category === "earnings" && article.title.toLowerCase().includes("earnings")) ||
        (category === "technology" && (article.source === "TechCrunch" || article.source === "The Verge")) ||
        (category === "markets" && (article.source === "Bloomberg" || article.source === "Wall Street Journal")) ||
        (category === "economy" && article.source === "Reuters") ||
        (category === "crypto" && article.source === "CoinDesk")

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      } else {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      }
    })

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-accent" />
            <span>Market News</span>
          </h1>
          <p className="text-muted-foreground">Stay updated with the latest financial news and market insights</p>
        </div>

        {/* News Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockNews.length}</div>
              <p className="text-xs text-muted-foreground">Available to read</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's News</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  mockNews.filter((article) => {
                    const today = new Date().toDateString()
                    return new Date(article.publishedAt).toDateString() === today
                  }).length
                }
              </div>
              <p className="text-xs text-muted-foreground">Published today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Related</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockNews.filter((article) => article.relatedSymbols && article.relatedSymbols.length > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">Company specific</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sources</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(mockNews.map((article) => article.source)).size}</div>
              <p className="text-xs text-muted-foreground">News sources</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>News Filter</CardTitle>
            <CardDescription>Search and filter news articles by category and keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news articles..."
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
                  {newsCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* News Articles */}
        <div className="space-y-6">
          {filteredNews.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No news articles found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredNews.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl leading-tight mb-2">{article.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </span>
                        <span>{article.source}</span>
                        {article.relatedSymbols && article.relatedSymbols.length > 0 && (
                          <div className="flex items-center space-x-1">
                            {article.relatedSymbols.map((symbol) => (
                              <Badge key={symbol} variant="secondary" className="text-xs">
                                {symbol}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{article.summary}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More Button */}
        {filteredNews.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline">Load More Articles</Button>
          </div>
        )}
      </div>
    </Layout>
  )
}
