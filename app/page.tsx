import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "@/components/Layout"
import { BarChart3, TrendingUp, Shield, BookOpen, Users, Star, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Market Data",
      description: "Access live stock prices and market data to make informed trading decisions.",
    },
    {
      icon: Shield,
      title: "Risk-Free Learning",
      description: "Practice trading with virtual money without any financial risk.",
    },
    {
      icon: BookOpen,
      title: "Educational Resources",
      description: "Learn trading strategies and market analysis through our comprehensive tutorials.",
    },
    {
      icon: Users,
      title: "Community Leaderboard",
      description: "Compete with other traders and track your performance on our leaderboard.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Beginner Trader",
      content:
        "VirtualTrade helped me learn the basics of stock trading without risking real money. The tutorials are excellent!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Student",
      content:
        "The real-time market data and portfolio tracking features make this app incredibly valuable for learning.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Finance Professional",
      content: "Great platform for testing new strategies before implementing them with real capital.",
      rating: 5,
    },
  ]

  const benefits = [
    "No financial risk - trade with virtual money",
    "Real-time market data and analysis",
    "Comprehensive educational resources",
    "Portfolio tracking and performance analytics",
    "Community features and leaderboards",
    "Mobile-responsive design",
  ]

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-accent text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Learn Stock Trading with Virtual Money</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto text-pretty">
              Master the art of stock trading in a risk-free environment. Practice with real market data, learn from
              experts, and build confidence before investing real money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/tutorials">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose VirtualTrade?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Our platform provides everything you need to learn and master stock trading
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-pretty">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Everything You Need to Succeed</h2>
                <p className="text-lg text-muted-foreground mb-8 text-pretty">
                  VirtualTrade provides a comprehensive platform for learning stock trading with all the tools and
                  resources you need to become a successful trader.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-8" asChild>
                  <Link href="/dashboard">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl p-8">
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Portfolio Value</h3>
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-3xl font-bold text-accent mb-2">$125,847.32</div>
                    <div className="text-sm text-muted-foreground">+$2,847.32 (+2.31%) today</div>
                    <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-accent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What Our Users Say</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Join thousands of successful traders who started their journey with VirtualTrade
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-pretty">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Start Your Trading Journey?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
              Join VirtualTrade today and start learning stock trading with virtual money. No risk, all reward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
