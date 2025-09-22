"use client"

import { useSearchParams } from "next/navigation"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TradeForm from "@/components/TradeForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function BuyPage() {
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
                <ShoppingCart className="h-8 w-8 text-accent" />
                <span>Buy Stocks</span>
              </h1>
              <p className="text-muted-foreground">Purchase stocks with your virtual balance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Buy Form */}
            <div className="lg:col-span-2">
              <TradeForm type="buy" initialSymbol={symbol} />
            </div>

            {/* Buying Guide */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>How to Buy Stocks</CardTitle>
                  <CardDescription>Step-by-step guide for beginners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Choose a Stock</h4>
                        <p className="text-muted-foreground">
                          Select the stock symbol you want to purchase from the dropdown menu.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Select Order Type</h4>
                        <p className="text-muted-foreground">
                          Choose between market order (immediate) or limit order (at specific price).
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
                          Specify how many shares you want to buy. Check your available balance.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Review & Submit</h4>
                        <p className="text-muted-foreground">
                          Review your order details and click buy to execute the trade.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Order Types Explained</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-1">Market Order</h4>
                      <p className="text-muted-foreground">
                        Executes immediately at the current market price. Best for liquid stocks when you want to buy
                        right away.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Limit Order</h4>
                      <p className="text-muted-foreground">
                        Executes only when the stock reaches your specified price. Gives you price control but may not
                        execute immediately.
                      </p>
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
