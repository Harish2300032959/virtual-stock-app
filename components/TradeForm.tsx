"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import type { StockQuote } from "@/types"
import { Calculator, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

interface TradeFormProps {
  type: "buy" | "sell"
  initialSymbol?: string
  onTradeComplete?: () => void
}

// Mock stock data for demo
const mockStocks: Record<string, StockQuote> = {
  AAPL: { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.15, changePercent: 1.24, volume: 45234567 },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2847.32,
    change: -15.67,
    changePercent: -0.55,
    volume: 1234567,
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 5.23,
    changePercent: 1.4,
    volume: 23456789,
  },
  TSLA: { symbol: "TSLA", name: "Tesla, Inc.", price: 248.42, change: -8.91, changePercent: -3.46, volume: 34567890 },
}

export default function TradeForm({ type, initialSymbol, onTradeComplete }: TradeFormProps) {
  const { user } = useAuth()
  const [symbol, setSymbol] = useState(initialSymbol || "")
  const [quantity, setQuantity] = useState("")
  const [orderType, setOrderType] = useState("market")
  const [limitPrice, setLimitPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const selectedStock = symbol ? mockStocks[symbol] : null
  const currentPrice = selectedStock?.price || 0
  const totalValue = currentPrice * (Number.parseInt(quantity) || 0)
  const availableBalance = user?.virtualBalance || 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!symbol || !quantity) {
      setError("Please fill in all required fields")
      return
    }

    if (!selectedStock) {
      setError("Invalid stock symbol")
      return
    }

    const qty = Number.parseInt(quantity)
    if (qty <= 0) {
      setError("Quantity must be greater than 0")
      return
    }

    if (type === "buy" && totalValue > availableBalance) {
      setError("Insufficient funds for this purchase")
      return
    }

    if (orderType === "limit" && (!limitPrice || Number.parseFloat(limitPrice) <= 0)) {
      setError("Please enter a valid limit price")
      return
    }

    setLoading(true)

    try {
      // Mock API call - replace with real API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const tradeData = {
        symbol,
        type,
        quantity: qty,
        price: orderType === "market" ? currentPrice : Number.parseFloat(limitPrice),
        orderType,
        totalAmount: orderType === "market" ? totalValue : qty * Number.parseFloat(limitPrice),
      }

      console.log("Trade submitted:", tradeData)

      setSuccess(`${type === "buy" ? "Purchase" : "Sale"} order submitted successfully!`)
      setQuantity("")
      setLimitPrice("")

      if (onTradeComplete) {
        onTradeComplete()
      }
    } catch (err: any) {
      setError(err.message || "Trade failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isValidTrade =
    symbol &&
    quantity &&
    selectedStock &&
    Number.parseInt(quantity) > 0 &&
    (type === "sell" || totalValue <= availableBalance) &&
    (orderType === "market" || (limitPrice && Number.parseFloat(limitPrice) > 0))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>{type === "buy" ? "Buy" : "Sell"} Stocks</span>
        </CardTitle>
        <CardDescription>
          {type === "buy" ? "Purchase stocks with your virtual balance" : "Sell stocks from your portfolio"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Stock Selection */}
          <div className="space-y-2">
            <Label htmlFor="symbol">Stock Symbol</Label>
            <Select value={symbol} onValueChange={setSymbol}>
              <SelectTrigger>
                <SelectValue placeholder="Select a stock" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(mockStocks).map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol}>
                    <div className="flex items-center justify-between w-full">
                      <span>
                        {stock.symbol} - {stock.name}
                      </span>
                      <span className="ml-2">{formatCurrency(stock.price)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stock Info Display */}
          {selectedStock && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{selectedStock.name}</h3>
                <Badge
                  variant={selectedStock.change >= 0 ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {selectedStock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercent(selectedStock.changePercent)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{formatCurrency(selectedStock.price)}</span>
                <span
                  className={`text-sm font-medium ${selectedStock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {selectedStock.change >= 0 ? "+" : ""}
                  {formatCurrency(selectedStock.change)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Volume: {selectedStock.volume.toLocaleString()}</p>
            </div>
          )}

          {/* Order Type */}
          <div className="space-y-2">
            <Label htmlFor="orderType">Order Type</Label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market Order</SelectItem>
                <SelectItem value="limit">Limit Order</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {orderType === "market"
                ? "Execute immediately at current market price"
                : "Execute only when price reaches your specified limit"}
            </p>
          </div>

          {/* Limit Price (if limit order) */}
          {orderType === "limit" && (
            <div className="space-y-2">
              <Label htmlFor="limitPrice">Limit Price</Label>
              <Input
                id="limitPrice"
                type="number"
                step="0.01"
                min="0"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="Enter limit price"
              />
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Number of shares"
            />
          </div>

          {/* Order Summary */}
          {selectedStock && quantity && Number.parseInt(quantity) > 0 && (
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center space-x-2 mb-3">
                <Calculator className="h-4 w-4 text-accent" />
                <h4 className="font-semibold">Order Summary</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span className="font-medium">{selectedStock.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity} shares</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per share:</span>
                  <span className="font-medium">
                    {orderType === "market"
                      ? formatCurrency(currentPrice)
                      : limitPrice
                        ? formatCurrency(Number.parseFloat(limitPrice))
                        : "—"}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total {type === "buy" ? "Cost" : "Value"}:</span>
                  <span className="font-bold text-lg">
                    {orderType === "market"
                      ? formatCurrency(totalValue)
                      : limitPrice
                        ? formatCurrency(Number.parseInt(quantity) * Number.parseFloat(limitPrice))
                        : "—"}
                  </span>
                </div>
                {type === "buy" && (
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Available Balance:</span>
                    <span>{formatCurrency(availableBalance)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading || !isValidTrade} size="lg">
            {loading
              ? `Processing ${type}...`
              : `${type === "buy" ? "Buy" : "Sell"} ${quantity ? `${quantity} shares` : "Stock"}`}
          </Button>

          {/* Balance Warning */}
          {type === "buy" && totalValue > availableBalance && quantity && (
            <Alert variant="destructive">
              <AlertDescription>
                Insufficient funds. You need {formatCurrency(totalValue - availableBalance)} more to complete this
                purchase.
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
