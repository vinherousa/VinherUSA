"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ComparisonChart } from "@/components/pricing/comparison-chart"
import {
  Shield,
  Zap,
  Check,
  Star,
  Users,
  Mail,
  MessageSquare,
  ArrowRight,
  Rocket,
  Crown,
  Sparkles,
  Scan,
} from "lucide-react"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Hero Starter",
      description: "Perfect for small dealerships ready to begin their hero journey",
      monthlyPrice: 79,
      annualPrice: 790,
      savings: "2 months free",
      badge: null,
      features: [
        "Up to 25 vehicles/month",
        "Basic VIN scanning",
        "Standard inventory management",
        "Email support",
        "Mobile app access",
        "Basic reporting",
        "1 user account",
      ],
      limitations: ["Limited API calls", "Basic analytics only", "No custom integrations"],
      cta: "Start Hero Trial",
      popular: false,
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Hero Professional",
      description: "The ultimate choice for growing dealerships with superpowers",
      monthlyPrice: 199,
      annualPrice: 1990,
      savings: "2 months free",
      badge: "Most Popular",
      features: [
        "Up to 100 vehicles/month",
        "AI-powered VIN scanning",
        "Advanced inventory management",
        "Priority support (24/7)",
        "Mobile + web access",
        "Advanced analytics & reports",
        "Up to 5 user accounts",
        "API access included",
        "Custom integrations",
        "Automated workflows",
        "Real-time notifications",
        "Export capabilities",
      ],
      limitations: [],
      cta: "Become a Hero",
      popular: true,
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Hero Enterprise",
      description: "Legendary powers for large dealerships and multi-location heroes",
      monthlyPrice: 399,
      annualPrice: 3990,
      savings: "2 months free",
      badge: "Best Value",
      features: [
        "Unlimited vehicles",
        "Lightning-fast AI scanning",
        "Enterprise inventory suite",
        "Dedicated hero support",
        "All platform access",
        "Custom analytics & BI",
        "Unlimited user accounts",
        "Full API access",
        "Custom integrations",
        "Advanced automation",
        "White-label options",
        "Multi-location support",
        "Custom training",
        "SLA guarantee",
      ],
      limitations: [],
      cta: "Contact Hero Team",
      popular: false,
      color: "from-purple-500 to-pink-600",
    },
  ]

  const getPrice = (plan: (typeof plans)[0]) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice
  }

  const getDisplayPrice = (plan: (typeof plans)[0]) => {
    if (isAnnual) {
      return `$${Math.round(plan.annualPrice / 12)}`
    }
    return `$${plan.monthlyPrice}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
              <Scan className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              VinHero
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/pricing" className="text-primary-600 font-semibold border-b-2 border-primary-600">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-secondary-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>
          <Button
            asChild
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg"
          >
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm font-medium mb-8">
            <Crown className="h-4 w-4 mr-2" />
            Choose Your Hero Powers
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Pricing Fit for
            <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Automotive Heroes
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your dealership with superhuman VIN scanning powers. Start your hero journey with a 14-day free
            trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg font-medium ${!isAnnual ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-amber-500" />
            <span className={`text-lg font-medium ${isAnnual ? "text-white" : "text-gray-400"}`}>Annual</span>
            {isAnnual && (
              <Badge className="bg-green-500/20 text-green-400 border border-green-400/50">
                <Sparkles className="h-3 w-3 mr-1" />
                Save 17%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 ${
                  plan.popular
                    ? "border-amber-500/50 shadow-2xl shadow-amber-500/20 scale-105"
                    : "border-slate-700/50 hover:border-slate-600/50"
                } transition-all duration-300 hover:shadow-xl`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className={`bg-gradient-to-r ${plan.color} text-white px-4 py-1 text-sm font-semibold`}>
                      <Star className="h-3 w-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    {index === 0 && <Shield className="h-8 w-8 text-white" />}
                    {index === 1 && <Zap className="h-8 w-8 text-white" />}
                    {index === 2 && <Crown className="h-8 w-8 text-white" />}
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400 text-base">{plan.description}</CardDescription>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-white">{getDisplayPrice(plan)}</span>
                      <span className="text-gray-400 ml-2">/{isAnnual ? "month" : "month"}</span>
                    </div>
                    {isAnnual && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-500 line-through">${plan.monthlyPrice}/month</span>
                        <Badge variant="outline" className="ml-2 text-green-400 border-green-400/50">
                          {plan.savings}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-6 text-lg font-semibold ${
                      plan.popular
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                    } transition-all`}
                    asChild
                  >
                    <Link href={plan.name === "Hero Enterprise" ? "/contact" : "/dashboard"}>
                      {plan.name === "Hero Enterprise" ? (
                        <>
                          <MessageSquare className="h-5 w-5 mr-2" />
                          {plan.cta}
                        </>
                      ) : (
                        <>
                          <Rocket className="h-5 w-5 mr-2" />
                          {plan.cta}
                        </>
                      )}
                    </Link>
                  </Button>

                  <p className="text-xs text-gray-500 text-center">14-day free trial • No credit card required</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="container mx-auto">
          <ComparisonChart />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Hero Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know about becoming a VIN hero</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">What's included in the free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Full access to all Hero Professional features for 14 days. No credit card required, no hidden fees.
                  Experience the full power of VinHero risk-free.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Upgrade or downgrade your hero powers anytime. Changes take effect immediately, and we'll prorate any
                  billing differences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Your data is protected by enterprise-grade security with 256-bit encryption, SOC 2 compliance, and
                  regular security audits. We're your data fortress.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Do you offer training?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes! All plans include onboarding training. Professional and Enterprise plans get dedicated training
                  sessions to maximize your hero potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Need Help Choosing Your Hero Path?</h2>
          <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">
            Our hero support team is standing by to help you find the perfect plan for your dealership's needs.
          </p>

          <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto mb-12">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
                <p className="text-orange-100 text-sm mb-3">Get detailed answers</p>
                <p className="text-white font-medium">marinomarketing@mail.com</p>
              </CardContent>
            </Card>
          </div>

          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-4" asChild>
            <a href="mailto:marinomarketing@mail.com">
              <Users className="h-5 w-5 mr-2" />
              Talk to Our Hero Team
              <ArrowRight className="h-5 w-5 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-amber-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  VinHero
                </span>
              </div>
              <p className="text-gray-400">
                The ultimate VIN scanning superhero for automotive dealerships. Unleash your inventory superpowers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-amber-400">Hero Powers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/scanner" className="hover:text-white transition-colors">
                    VIN Scanning
                  </Link>
                </li>
                <li>
                  <Link href="/inventory" className="hover:text-white transition-colors">
                    Inventory Management
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Hero HQ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    About Heroes
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Hero Stories
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Join the League
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-purple-400">Hero Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Hero Hotline
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Training Academy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Mission Control
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VinHero. All rights reserved. Be the hero your dealership needs.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
