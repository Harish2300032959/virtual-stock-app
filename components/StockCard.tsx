"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { StockQuote } from "@/types"

interface StockCardProps {
  stock: StockQuote
  onClick?: () => void
}

export default function StockCard({ stock, onClick }: StockCardProps) {
  const isPositive = stock.change >= 0
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-shadow ${onClick ? "hover:bg-muted/50" : ""}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{stock.symbol}</CardTitle>
          <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1">
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {formatPercent(stock.changePercent)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{formatCurrency(stock.price)}</div>
          <div className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "+" : ""}
            {formatCurrency(stock.change)}
          </div>
        </div>
        {stock.volume && (
          <div className="text-xs text-muted-foreground mt-2">Volume: {stock.volume.toLocaleString()}</div>
        )}
      </CardContent>
    </Card>
  )
}
