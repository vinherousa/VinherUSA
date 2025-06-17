import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveDemo } from "@/components/demo/interactive-demo"
import { Shield, Zap, Target, Award, Users, Rocket } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-blue-800/30 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-amber-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              VinHero
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Powers
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-gray-300 hover:text-amber-400">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
            >
              <Link href="/dashboard">Become a Hero</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm font-medium mb-8">
            <Zap className="h-4 w-4 mr-2" />
            The Ultimate VIN Scanning Superhero
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Unleash Your
            <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              VIN Superpowers
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your dealership into an unstoppable force with VinHero's lightning-fast VIN scanning, heroic
            inventory management, and legendary analytics that save the day, every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-2xl transform hover:scale-105 transition-all"
              asChild
            >
              <Link href="/pricing">
                <Rocket className="h-5 w-5 mr-2" />
                Start Your Hero Journey
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 transition-all"
            >
              <Target className="h-5 w-5 mr-2" />
              Watch Hero Demo ↓
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-800 to-blue-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              Hero Powers in Action
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">See VinHero in Action</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Watch our hero demonstrate lightning-fast VIN scanning, instant vehicle intelligence, and legendary
              inventory management powers.
            </p>
          </div>

          <InteractiveDemo />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-6">
              <Award className="h-4 w-4 mr-2" />
              Legendary Abilities
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Heroic Powers for Modern Dealerships</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Equip your dealership with superhuman abilities to dominate the automotive market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-amber-500/20 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Lightning VIN Scan</CardTitle>
                <CardDescription className="text-gray-400">
                  Instant VIN decoding with superhuman speed and accuracy that saves the day
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Hero Intelligence</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered vehicle insights and market intelligence that gives you the edge
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Power Analytics</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time dashboards and legendary reporting that reveal hidden opportunities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/20 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Fortress Security</CardTitle>
                <CardDescription className="text-gray-400">
                  Impenetrable data protection with enterprise-grade security shields
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-red-500/20 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Turbo Processing</CardTitle>
                <CardDescription className="text-gray-400">
                  Lightning-fast inventory updates and superhuman processing speeds
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Hero Support</CardTitle>
                <CardDescription className="text-gray-400">
                  24/7 legendary support team ready to save the day whenever you need help
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white/10 rotate-45"></div>
          <div className="absolute top-20 right-20 w-3 h-3 bg-white/10 rotate-45"></div>
          <div className="absolute bottom-20 left-20 w-5 h-5 bg-white/10 rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 bg-white/10 rotate-45"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Become a VIN Hero?</h2>
          <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">
            Join thousands of dealership heroes already using VinHero to save time, increase profits, and dominate their
            markets.
          </p>
          <Button
            size="lg"
            className="text-xl px-12 py-6 bg-white text-orange-600 hover:bg-gray-100 shadow-2xl transform hover:scale-105 transition-all"
            asChild
          >
            <Link href="/pricing">
              <Award className="h-6 w-6 mr-3" />
              Claim Your Hero Powers
            </Link>
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
                  <Link href="#" className="hover:text-white transition-colors">
                    VIN Scanning
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Inventory Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Hero HQ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Heroes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Hero Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Join the League
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-purple-400">Hero Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Hero Hotline
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Training Academy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
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
