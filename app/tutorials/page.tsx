"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Layout from "@/components/Layout"
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Users,
  Star,
  TrendingUp,
  BarChart3,
  DollarSign,
  Shield,
  Target,
  Lightbulb,
} from "lucide-react"

// Mock tutorial data
const tutorials = [
  {
    id: "1",
    title: "Stock Market Basics",
    description: "Learn the fundamentals of stock trading, market terminology, and how the stock market works.",
    level: "Beginner",
    duration: "30 min",
    lessons: 6,
    completed: 0,
    rating: 4.8,
    students: 1250,
    category: "basics",
    icon: BookOpen,
    topics: [
      "What are stocks?",
      "How markets work",
      "Types of orders",
      "Reading stock quotes",
      "Market hours",
      "Getting started",
    ],
  },
  {
    id: "2",
    title: "Technical Analysis Fundamentals",
    description: "Master chart reading, technical indicators, and pattern recognition for better trading decisions.",
    level: "Intermediate",
    duration: "45 min",
    lessons: 8,
    completed: 0,
    rating: 4.7,
    students: 890,
    category: "analysis",
    icon: BarChart3,
    topics: [
      "Chart types",
      "Support & resistance",
      "Moving averages",
      "RSI & MACD",
      "Candlestick patterns",
      "Volume analysis",
      "Trend lines",
      "Entry/exit signals",
    ],
  },
  {
    id: "3",
    title: "Risk Management Strategies",
    description: "Learn how to protect your capital and manage risk effectively in your trading portfolio.",
    level: "Intermediate",
    duration: "35 min",
    lessons: 7,
    completed: 0,
    rating: 4.9,
    students: 675,
    category: "risk",
    icon: Shield,
    topics: [
      "Position sizing",
      "Stop losses",
      "Risk-reward ratios",
      "Diversification",
      "Portfolio allocation",
      "Emotional control",
      "Common mistakes",
    ],
  },
  {
    id: "4",
    title: "Fundamental Analysis",
    description: "Understand how to evaluate companies using financial statements and economic indicators.",
    level: "Advanced",
    duration: "60 min",
    lessons: 10,
    completed: 0,
    rating: 4.6,
    students: 445,
    category: "analysis",
    icon: Target,
    topics: [
      "Financial statements",
      "P/E ratios",
      "Revenue analysis",
      "Debt ratios",
      "Industry comparison",
      "Economic indicators",
      "Valuation methods",
      "Earnings reports",
      "Cash flow",
      "Growth metrics",
    ],
  },
  {
    id: "5",
    title: "Options Trading Basics",
    description: "Introduction to options contracts, strategies, and how to use options in your trading.",
    level: "Advanced",
    duration: "50 min",
    lessons: 9,
    completed: 0,
    rating: 4.5,
    students: 320,
    category: "advanced",
    icon: TrendingUp,
    topics: [
      "Call & put options",
      "Strike prices",
      "Expiration dates",
      "Option pricing",
      "Basic strategies",
      "Greeks",
      "Covered calls",
      "Protective puts",
      "Risk considerations",
    ],
  },
  {
    id: "6",
    title: "Building Your First Portfolio",
    description: "Step-by-step guide to creating a diversified investment portfolio that matches your goals.",
    level: "Beginner",
    duration: "40 min",
    lessons: 8,
    completed: 0,
    rating: 4.8,
    students: 980,
    category: "portfolio",
    icon: DollarSign,
    topics: [
      "Setting goals",
      "Asset allocation",
      "Stock selection",
      "Sector diversification",
      "Rebalancing",
      "Monitoring performance",
      "Tax considerations",
      "Long-term strategy",
    ],
  },
]

const categories = [
  { name: "All Tutorials", value: "all", icon: BookOpen },
  { name: "Basics", value: "basics", icon: Lightbulb },
  { name: "Analysis", value: "analysis", icon: BarChart3 },
  { name: "Risk Management", value: "risk", icon: Shield },
  { name: "Portfolio", value: "portfolio", icon: DollarSign },
  { name: "Advanced", value: "advanced", icon: TrendingUp },
]

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesCategory = selectedCategory === "all" || tutorial.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || tutorial.level === selectedLevel
    return matchesCategory && matchesLevel
  })

  const totalLessons = tutorials.reduce((sum, tutorial) => sum + tutorial.lessons, 0)
  const completedLessons = tutorials.reduce((sum, tutorial) => sum + tutorial.completed, 0)
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-accent" />
            <span>Trading Tutorials</span>
          </h1>
          <p className="text-muted-foreground">
            Master stock trading with our comprehensive tutorials and educational resources
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tutorials</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tutorials.length}</div>
              <p className="text-xs text-muted-foreground">Available courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLessons}</div>
              <p className="text-xs text-muted-foreground">Learning modules</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedLessons}</div>
              <p className="text-xs text-muted-foreground">Lessons finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <TabsTrigger key={category.value} value={category.value} className="flex items-center space-x-1">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>

        {/* Level Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedLevel === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel("all")}
          >
            All Levels
          </Button>
          <Button
            variant={selectedLevel === "Beginner" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel("Beginner")}
          >
            Beginner
          </Button>
          <Button
            variant={selectedLevel === "Intermediate" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel("Intermediate")}
          >
            Intermediate
          </Button>
          <Button
            variant={selectedLevel === "Advanced" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel("Advanced")}
          >
            Advanced
          </Button>
        </div>

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => {
            const Icon = tutorial.icon
            const progress = tutorial.lessons > 0 ? (tutorial.completed / tutorial.lessons) * 100 : 0

            return (
              <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <Badge className={getLevelColor(tutorial.level)}>{tutorial.level}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{tutorial.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{tutorial.title}</CardTitle>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Tutorial Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Play className="h-4 w-4" />
                        <span>{tutorial.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{tutorial.students}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>

                    {/* Topics Preview */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">What you'll learn:</h4>
                      <div className="space-y-1">
                        {tutorial.topics.slice(0, 3).map((topic, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-accent" />
                            <span>{topic}</span>
                          </div>
                        ))}
                        {tutorial.topics.length > 3 && (
                          <div className="text-sm text-muted-foreground">+{tutorial.topics.length - 3} more topics</div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full" size="sm">
                      {tutorial.completed > 0 ? "Continue Learning" : "Start Tutorial"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Learning Path Recommendation */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-accent" />
              <span>Recommended Learning Path</span>
            </CardTitle>
            <CardDescription>Follow this structured path to master stock trading step by step</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Foundation</h3>
                <p className="text-sm text-muted-foreground">
                  Start with Stock Market Basics and Building Your First Portfolio
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Learn Technical Analysis and Fundamental Analysis techniques
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Advanced</h3>
                <p className="text-sm text-muted-foreground">Master Risk Management and explore Options Trading</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
