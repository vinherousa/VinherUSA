"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Send, CheckCircle } from "lucide-react"

interface DemoFormProps {
  onClose?: () => void
}

export function DemoForm({ onClose }: DemoFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    dealershipSize: "",
    currentSolution: "",
    preferredTime: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send this data to marinomarketing@mail.com
    console.log("Demo form submitted:", formData)
    console.log("Sending to: marinomarketing@mail.com")

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose?.()
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Demo Scheduled!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest. Our team will contact you within 24 hours to schedule your personalized demo.
          </p>
          <p className="text-sm text-gray-500">This window will close automatically...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Schedule Your Demo
        </CardTitle>
        <CardDescription>Get a personalized demo of VINScan Pro tailored to your dealership's needs</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dealership-size">Dealership Size</Label>
              <Select
                value={formData.dealershipSize}
                onValueChange={(value) => handleInputChange("dealershipSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-50 vehicles)</SelectItem>
                  <SelectItem value="medium">Medium (51-200 vehicles)</SelectItem>
                  <SelectItem value="large">Large (201-500 vehicles)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (500+ vehicles)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="current-solution">Current Solution</Label>
              <Select
                value={formData.currentSolution}
                onValueChange={(value) => handleInputChange("currentSolution", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select current" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Process</SelectItem>
                  <SelectItem value="autotrader">AutoTrader Solutions</SelectItem>
                  <SelectItem value="dealersocket">DealerSocket</SelectItem>
                  <SelectItem value="vauto">vAuto</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="preferred-time">Preferred Demo Time</Label>
            <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select time preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                <SelectItem value="evening">Evening (5 PM - 7 PM)</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your specific needs or questions..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Scheduling Demo..." : "Schedule Demo"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to be contacted by our sales team.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
