"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star } from "lucide-react"

const competitors = [
  {
    name: "AutoTrader Solutions",
    logo: "AT",
    pricing: { starter: 99, professional: 249, enterprise: 499 },
    features: {
      vinScanning: "Basic",
      analytics: "Limited",
      support: "Email only",
      api: "Paid add-on",
      mobile: "iOS only",
      integrations: "Limited",
    },
    pros: ["Established brand", "Large dealer network"],
    cons: ["Expensive", "Limited features", "Poor mobile support"],
  },
  {
    name: "DealerSocket",
    logo: "DS",
    pricing: { starter: 95, professional: 259, enterprise: 529 },
    features: {
      vinScanning: "Standard",
      analytics: "Basic",
      support: "Business hours",
      api: "Limited",
      mobile: "Basic app",
      integrations: "CRM focused",
    },
    pros: ["CRM integration", "Dealer focused"],
    cons: ["Most expensive", "Complex setup", "Limited analytics"],
  },
  {
    name: "vAuto (Cox)",
    logo: "vA",
    pricing: { starter: 89, professional: 239, enterprise: 479 },
    features: {
      vinScanning: "Good",
      analytics: "Market focused",
      support: "Phone & email",
      api: "Available",
      mobile: "Good",
      integrations: "Cox ecosystem",
    },
    pros: ["Market analytics", "Cox integration"],
    cons: ["Locked to Cox", "Complex pricing", "Limited customization"],
  },
  {
    name: "VINScan Pro",
    logo: "VP",
    pricing: { starter: 79, professional: 199, enterprise: 399 },
    features: {
      vinScanning: "AI-Powered",
      analytics: "Advanced",
      support: "24/7 all channels",
      api: "Full access",
      mobile: "Best-in-class",
      integrations: "Unlimited",
    },
    pros: ["20% cheaper", "AI technology", "24/7 support", "Best mobile app"],
    cons: ["Newer brand"],
    highlight: true,
  },
]

export function ComparisonChart() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Detailed Competitor Comparison</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See how VINScan Pro compares feature-by-feature with industry leaders
        </p>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {competitors.map((competitor) => (
          <Card
            key={competitor.name}
            className={`relative ${competitor.highlight ? "border-blue-500 shadow-xl" : "border-gray-200"}`}
          >
            {competitor.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Best Value
                </Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  competitor.highlight ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                <span className="font-bold text-sm">{competitor.logo}</span>
              </div>
              <CardTitle className="text-lg">{competitor.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Starting at</div>
                <div className={`text-2xl font-bold ${competitor.highlight ? "text-blue-600" : "text-gray-900"}`}>
                  ${competitor.pricing.starter}/mo
                </div>
                {competitor.highlight && (
                  <Badge variant="destructive" className="text-xs mt-1">
                    20% Less
                  </Badge>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Features</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>VIN Scanning:</span>
                    <span className="font-medium">{competitor.features.vinScanning}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Analytics:</span>
                    <span className="font-medium">{competitor.features.analytics}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support:</span>
                    <span className="font-medium">{competitor.features.support}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Access:</span>
                    <span className="font-medium">{competitor.features.api}</span>
                  </div>
                </div>
              </div>

              {/* Pros */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-green-700">Pros</h4>
                <div className="space-y-1">
                  {competitor.pros.map((pro) => (
                    <div key={pro} className="flex items-start text-xs">
                      <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cons */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-red-700">Cons</h4>
                <div className="space-y-1">
                  {competitor.cons.map((con) => (
                    <div key={con} className="flex items-start text-xs">
                      <X className="h-3 w-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                      <span className="text-red-700">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
