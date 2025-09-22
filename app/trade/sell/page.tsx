"use client"

import { useSearchParams } from "next/navigation"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TradeForm from "@/components/TradeForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function SellPage() {
  const searchParams = useSearchParams()
  const symbol = searchParams.get("symbol") || undefined

  return (
    <Layout>
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/trade">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Trading
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center space-x-2">
                <TrendingDown className="h-8 w-8 text-accent" />
                <span>Sell Stocks</span>
              </h1>
              <p className="text-muted-foreground">Sell stocks from your portfolio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sell Form */}
            <div className="lg:col-span-2">
              <TradeForm type="sell" initialSymbol={symbol} />
            </div>

            {/* Selling Guide */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>How to Sell Stocks</CardTitle>
                  <CardDescription>Step-by-step guide for selling</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Select Stock to Sell</h4>
                        <p className="text-muted-foreground">Choose from stocks you currently own in your portfolio.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Choose Order Type</h4>
                        <p className="text-muted-foreground">
                          Market order for immediate sale or limit order for specific price.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Enter Quantity</h4>
                        <p className="text-muted-foreground">
                          Specify how many shares to sell. Cannot exceed your holdings.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Execute Sale</h4>
                        <p className="text-muted-foreground">Review the sale details and submit your sell order.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Selling Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-1">Take Profits</h4>
                      <p className="text-muted-foreground">
                        Sell when you've reached your target profit to lock in gains.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Stop Loss</h4>
                      <p className="text-muted-foreground">Sell to limit losses when a stock moves against you.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Rebalancing</h4>
                      <p className="text-muted-foreground">Sell overweight positions to maintain portfolio balance.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  )
}
