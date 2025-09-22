"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TradeForm from "@/components/TradeForm"
import { useAuth } from "@/contexts/AuthContext"
import { ShoppingCart, TrendingDown, DollarSign, Activity, Clock } from "lucide-react"

// Mock recent orders data
const mockRecentOrders = [
  {
    id: "1",
    symbol: "AAPL",
    type: "buy" as const,
    quantity: 10,
    price: 173.28,
    status: "completed" as const,
    timestamp: "2024-01-07T10:30:00Z",
  },
  {
    id: "2",
    symbol: "GOOGL",
    type: "sell" as const,
    quantity: 2,
    price: 2863.0,
    status: "completed" as const,
    timestamp: "2024-01-07T09:15:00Z",
  },
  {
    id: "3",
    symbol: "MSFT",
    type: "buy" as const,
    quantity: 15,
    price: 373.62,
    status: "pending" as const,
    timestamp: "2024-01-06T14:45:00Z",
  },
]

export default function TradePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("buy")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "cancelled":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Layout>
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Trading Center</h1>
            <p className="text-muted-foreground">Buy and sell stocks with your virtual balance</p>
          </div>

          {/* Account Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(user?.virtualBalance || 50000)}</div>
                <p className="text-xs text-muted-foreground">Ready to invest</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockRecentOrders.filter((order) => order.status === "pending").length}
                </div>
                <p className="text-xs text-muted-foreground">Awaiting execution</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trading Forms */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Buy Stocks</span>
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4" />
                    <span>Sell Stocks</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="mt-6">
                  <TradeForm type="buy" />
                </TabsContent>

                <TabsContent value="sell" className="mt-6">
                  <TradeForm type="sell" />
                </TabsContent>
              </Tabs>
            </div>

            {/* Recent Orders */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest trading activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${order.type === "buy" ? "bg-green-500" : "bg-red-500"}`}
                          />
                          <div>
                            <p className="font-medium">{order.symbol}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.type.toUpperCase()} {order.quantity} @ {formatCurrency(order.price)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatDate(order.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trading Tips */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Trading Tips</CardTitle>
                  <CardDescription>Best practices for virtual trading</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p>Use limit orders to control your entry and exit prices</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p>Diversify your portfolio across different sectors</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p>Research companies before making investment decisions</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <p>Practice risk management with position sizing</p>
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
