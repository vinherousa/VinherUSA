"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Scan,
  Phone,
  Mail,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  Users,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Globe,
  Headphones,
} from "lucide-react"
import { track } from "@vercel/analytics"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    jobTitle: "",
    dealershipSize: "",
    currentSolution: "",
    urgency: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Track contact form submission
    track("contact_form_submitted", {
      dealershipSize: formData.dealershipSize,
      currentSolution: formData.currentSolution,
      urgency: formData.urgency,
      hasMessage: formData.message.length > 0,
    })

    // Log form data (in production, this would be sent to marinomarketing@mail.com)
    console.log("Contact form submitted:", {
      ...formData,
      destination: "marinomarketing@mail.com",
      timestamp: new Date().toISOString(),
    })

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        jobTitle: "",
        dealershipSize: "",
        currentSolution: "",
        urgency: "",
        message: "",
      })
    }, 5000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-blue-50">
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
            <Link href="/pricing" className="text-gray-600 hover:text-secondary-600 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/contact" className="text-primary-600 font-semibold border-b-2 border-primary-600">
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Transform Your
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent block">
                Inventory Management
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to revolutionize how you manage vehicle inventory? Our experts are here to show you exactly how
              VINScan Pro can transform your dealership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-lg px-8 py-4"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50 text-lg px-8 py-4"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8">
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="h-6 w-6 mr-3" />
                    Get Your Personalized Demo
                  </CardTitle>
                  <CardDescription className="text-primary-100 text-lg">
                    Tell us about your dealership and we'll show you exactly how VINScan Pro can help
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                      <p className="text-gray-600 text-lg mb-6">
                        Thank you for reaching out! Our sales team will contact you within 2 hours during business
                        hours.
                      </p>
                      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>What's next?</strong> We'll review your information and prepare a customized demo
                          tailored to your dealership's specific needs and current challenges.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-base font-medium">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="mt-2 h-12 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-base font-medium">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="mt-2 h-12 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-base font-medium">
                            Business Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="mt-2 h-12 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-base font-medium">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="mt-2 h-12 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        </div>
                      </div>

                      {/* Business Information */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="company" className="text-base font-medium">
                            Company/Dealership *
                          </Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            className="mt-2 h-12 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="jobTitle" className="text-base font-medium">
                            Job Title
                          </Label>
                          <Input
                            id="jobTitle"
                            value={formData.jobTitle}
                            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                            className="mt-2 h-12 text-base focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                            placeholder="e.g., General Manager, Owner"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="dealership-size" className="text-base font-medium">
                            Dealership Size *
                          </Label>
                          <Select
                            value={formData.dealershipSize}
                            onValueChange={(value) => handleInputChange("dealershipSize", value)}
                          >
                            <SelectTrigger className="mt-2 h-12 text-base focus:ring-2 focus:ring-primary-500">
                              <SelectValue placeholder="Select your inventory size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small (1-50 vehicles)</SelectItem>
                              <SelectItem value="medium">Medium (51-200 vehicles)</SelectItem>
                              <SelectItem value="large">Large (201-500 vehicles)</SelectItem>
                              <SelectItem value="enterprise">Enterprise (500+ vehicles)</SelectItem>
                              <SelectItem value="multi-location">Multi-location</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="current-solution" className="text-base font-medium">
                            Current Solution
                          </Label>
                          <Select
                            value={formData.currentSolution}
                            onValueChange={(value) => handleInputChange("currentSolution", value)}
                          >
                            <SelectTrigger className="mt-2 h-12 text-base focus:ring-2 focus:ring-secondary-500">
                              <SelectValue placeholder="What do you use now?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manual">Manual/Spreadsheets</SelectItem>
                              <SelectItem value="autotrader">AutoTrader Solutions</SelectItem>
                              <SelectItem value="dealersocket">DealerSocket</SelectItem>
                              <SelectItem value="vauto">vAuto</SelectItem>
                              <SelectItem value="cdk">CDK Global</SelectItem>
                              <SelectItem value="reynolds">Reynolds & Reynolds</SelectItem>
                              <SelectItem value="other">Other System</SelectItem>
                              <SelectItem value="none">No Current System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="urgency" className="text-base font-medium">
                          Timeline for Implementation
                        </Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                          <SelectTrigger className="mt-2 h-12 text-base focus:ring-2 focus:ring-primary-500">
                            <SelectValue placeholder="When are you looking to implement?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediately (within 1 month)</SelectItem>
                            <SelectItem value="soon">Soon (1-3 months)</SelectItem>
                            <SelectItem value="planning">Planning (3-6 months)</SelectItem>
                            <SelectItem value="researching">Just researching (6+ months)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-base font-medium">
                          Tell us about your challenges
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="What specific inventory management challenges are you facing? What features are most important to you?"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="mt-2 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-14 text-lg bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-3" />
                            Send Message & Schedule Demo
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-gray-500 text-center">
                        By submitting this form, you agree to be contacted by our sales team. We respect your privacy
                        and will never share your information.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Benefits - Takes 1 column */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-secondary-500 to-primary-500 text-white">
                  <CardTitle className="flex items-center">
                    <Headphones className="h-5 w-5 mr-2" />
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Call Sales</h3>
                      <p className="text-secondary-600 font-medium">1-800-VIN-SCAN</p>
                      <p className="text-sm text-gray-500">Mon-Fri, 8 AM - 8 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Us</h3>
                      <p className="text-primary-600 font-medium">marinomarketing@mail.com</p>
                      <p className="text-sm text-gray-500">Response within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Live Chat</h3>
                      <p className="text-green-600 font-medium">Available Now</p>
                      <p className="text-sm text-gray-500">Instant support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-primary-700">Why Dealerships Choose Us</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">4.9/5 Customer Rating</p>
                      <p className="text-sm text-gray-600">Highest rated in the industry</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-primary-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">20% Cost Savings</p>
                      <p className="text-sm text-gray-600">Less expensive than competitors</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-secondary-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Enterprise Security</p>
                      <p className="text-sm text-gray-600">Bank-level data protection</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">24/7 Support</p>
                      <p className="text-sm text-gray-600">Always here when you need us</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Free Migration</p>
                      <p className="text-sm text-gray-600">We handle the entire setup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-primary-50 to-secondary-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "VINScan Pro transformed our inventory management completely. We save 15 hours per week and our
                    accuracy improved by 95%."
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">MJ</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mike Johnson</p>
                      <p className="text-sm text-gray-600">GM, Premier Auto Group</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to See VINScan Pro in Action?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Join over 2,500+ dealerships already using VINScan Pro to streamline their inventory management.
          </p>
          <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
            <Calendar className="h-5 w-5 mr-2" />
            Book Your Demo Today
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                  <Scan className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">VINScan Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                The most trusted VIN scanning and inventory management platform for automotive professionals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-primary-400">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/scanner" className="hover:text-white transition-colors">
                    VIN Scanner
                  </Link>
                </li>
                <li>
                  <Link href="/inventory" className="hover:text-white transition-colors">
                    Inventory Management
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="hover:text-white transition-colors">
                    Analytics & Reports
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-secondary-400">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Sales
                  </Link>
                </li>
                <li>
                  <a href="mailto:marinomarketing@mail.com" className="hover:text-white transition-colors">
                    Email Support
                  </a>
                </li>
                <li>
                  <a href="tel:1-800-VIN-SCAN" className="hover:text-white transition-colors">
                    Phone Support
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Live Chat
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-secondary-400">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 VINScan Pro. All rights reserved. Built for automotive professionals.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
