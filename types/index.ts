export interface User {
  id: string
  email: string
  name: string
  virtualBalance: number
  createdAt: string
}

export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  high52Week?: number
  low52Week?: number
}

export interface PortfolioItem {
  id: string
  symbol: string
  name: string
  quantity: number
  averagePrice: number
  currentPrice: number
  totalValue: number
  unrealizedPL: number
  unrealizedPLPercent: number
}

export interface Trade {
  id: string
  userId: string
  symbol: string
  type: "buy" | "sell"
  quantity: number
  price: number
  totalAmount: number
  timestamp: string
  status: "pending" | "completed" | "cancelled"
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  publishedAt: string
  source: string
  relatedSymbols?: string[]
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  loading: boolean
}
