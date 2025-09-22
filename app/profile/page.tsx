"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import { User, Settings, DollarSign, TrendingUp, Award, Calendar, CreditCard } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      // Mock API call - replace with real API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Profile updated successfully!")
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleTopUpBalance = async () => {
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      // Mock API call - replace with real API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Virtual balance topped up with $10,000!")
    } catch (err: any) {
      setError(err.message || "Failed to top up balance")
    } finally {
      setLoading(false)
    }
  }

  // Mock user stats
  const userStats = {
    totalTrades: 47,
    winRate: 68.5,
    totalReturn: 12.34,
    bestTrade: 245.67,
    worstTrade: -89.23,
    averageHoldTime: "5.2 days",
    favoriteStock: "AAPL",
    joinDate: user?.createdAt || "2024-01-01T00:00:00Z",
  }

  const achievements = [
    { name: "First Trade", description: "Completed your first trade", earned: true },
    { name: "Profitable Week", description: "Had a profitable trading week", earned: true },
    { name: "Diversified Portfolio", description: "Own stocks in 5+ different sectors", earned: true },
    { name: "Long-term Investor", description: "Hold a stock for 30+ days", earned: false },
    { name: "Risk Manager", description: "Use stop-loss orders consistently", earned: false },
    { name: "Market Analyst", description: "Complete all analysis tutorials", earned: false },
  ]

  return (
    <Layout>
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center space-x-2">
              <User className="h-8 w-8 text-accent" />
              <span>Profile</span>
            </h1>
            <p className="text-muted-foreground">Manage your account settings and view your trading statistics</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-accent" />
                  </div>
                  <CardTitle>{user?.name}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member since</span>
                      <span className="text-sm font-medium">{formatDate(userStats.joinDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Virtual Balance</span>
                      <span className="text-sm font-medium">{formatCurrency(user?.virtualBalance || 50000)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Trades</span>
                      <span className="text-sm font-medium">{userStats.totalTrades}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Win Rate</span>
                      <span className="text-sm font-medium">{userStats.winRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full" onClick={handleTopUpBalance} disabled={loading}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Top Up Virtual Balance
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" onClick={logout}>
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="settings" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Account Settings</span>
                      </CardTitle>
                      <CardDescription>Update your personal information and preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateProfile} className="space-y-6">
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

                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                          />
                        </div>

                        <Button type="submit" disabled={loading}>
                          {loading ? "Updating..." : "Update Profile"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="stats" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">+{userStats.totalReturn}%</div>
                        <p className="text-xs text-muted-foreground">All-time performance</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{userStats.winRate}%</div>
                        <p className="text-xs text-muted-foreground">Profitable trades</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Best Trade</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">+{formatCurrency(userStats.bestTrade)}</div>
                        <p className="text-xs text-muted-foreground">Highest profit</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Hold Time</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{userStats.averageHoldTime}</div>
                        <p className="text-xs text-muted-foreground">Per position</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Trading Summary</CardTitle>
                      <CardDescription>Detailed breakdown of your trading activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Total Trades</span>
                          <span className="font-medium">{userStats.totalTrades}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Winning Trades</span>
                          <span className="font-medium text-green-600">
                            {Math.round((userStats.totalTrades * userStats.winRate) / 100)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Losing Trades</span>
                          <span className="font-medium text-red-600">
                            {userStats.totalTrades - Math.round((userStats.totalTrades * userStats.winRate) / 100)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Favorite Stock</span>
                          <Badge variant="secondary">{userStats.favoriteStock}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Worst Trade</span>
                          <span className="font-medium text-red-600">{formatCurrency(userStats.worstTrade)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-5 w-5" />
                        <span>Trading Achievements</span>
                      </CardTitle>
                      <CardDescription>Track your progress and unlock new milestones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className={`flex items-center space-x-4 p-4 rounded-lg border ${
                              achievement.earned
                                ? "bg-accent/10 border-accent/20"
                                : "bg-muted/30 border-border opacity-60"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                achievement.earned
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <Award className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{achievement.name}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                            {achievement.earned && <Badge>Earned</Badge>}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  )
}
