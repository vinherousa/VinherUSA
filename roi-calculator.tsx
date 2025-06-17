"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, TrendingUp, DollarSign, Clock, Target, ArrowRight } from "lucide-react"

interface ROIInputs {
  currentSolution: string
  monthlyVehicles: number
  avgVehiclePrice: number
  timePerVIN: number
  hourlyWage: number
  currentMonthlyFee: number
  inventoryTurnover: number
}

interface ROIResults {
  monthlySavings: number
  timeSavingsHours: number
  timeSavingsCost: number
  efficiencyGains: number
  totalMonthlySavings: number
  annualSavings: number
  roiPercentage: number
  paybackMonths: number
}

const competitorPricing: { [key: string]: { starter: number; professional: number; enterprise: number } } = {
  autotrader: { starter: 99, professional: 249, enterprise: 499 },
  dealersocket: { starter: 95, professional: 259, enterprise: 529 },
  vauto: { starter: 89, professional: 239, enterprise: 479 },
  manual: { starter: 0, professional: 0, enterprise: 0 },
}

const vinScanPricing = { starter: 79, professional: 199, enterprise: 399 }

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    currentSolution: "autotrader",
    monthlyVehicles: 50,
    avgVehiclePrice: 25000,
    timePerVIN: 5,
    hourlyWage: 25,
    currentMonthlyFee: 249,
    inventoryTurnover: 12,
  })

  const [results, setResults] = useState<ROIResults>({
    monthlySavings: 0,
    timeSavingsHours: 0,
    timeSavingsCost: 0,
    efficiencyGains: 0,
    totalMonthlySavings: 0,
    annualSavings: 0,
    roiPercentage: 0,
    paybackMonths: 0,
  })

  const [recommendedPlan, setRecommendedPlan] = useState<"starter" | "professional" | "enterprise">("professional")

  useEffect(() => {
    calculateROI()
  }, [inputs])

  const calculateROI = () => {
    // Determine recommended plan based on monthly vehicles
    let plan: "starter" | "professional" | "enterprise" = "starter"
    if (inputs.monthlyVehicles > 100) plan = "enterprise"
    else if (inputs.monthlyVehicles > 25) plan = "professional"

    setRecommendedPlan(plan)

    // Calculate cost savings
    const currentCost = inputs.currentSolution === "manual" ? 0 : inputs.currentMonthlyFee
    const newCost = vinScanPricing[plan]
    const monthlySavings = Math.max(0, currentCost - newCost)

    // Calculate time savings (VINScan Pro reduces time by 70%)
    const currentTimeHours = (inputs.monthlyVehicles * inputs.timePerVIN) / 60
    const newTimeHours = currentTimeHours * 0.3 // 70% reduction
    const timeSavingsHours = currentTimeHours - newTimeHours
    const timeSavingsCost = timeSavingsHours * inputs.hourlyWage

    // Calculate efficiency gains (faster inventory turnover = more sales)
    const efficiencyGainPercent = inputs.currentSolution === "manual" ? 0.15 : 0.08 // 15% for manual, 8% for competitors
    const monthlyRevenue = inputs.monthlyVehicles * inputs.avgVehiclePrice
    const efficiencyGains = monthlyRevenue * efficiencyGainPercent * 0.05 // 5% profit margin

    // Total calculations
    const totalMonthlySavings = monthlySavings + timeSavingsCost + efficiencyGains
    const annualSavings = totalMonthlySavings * 12
    const roiPercentage = newCost > 0 ? (totalMonthlySavings / newCost) * 100 : 0
    const paybackMonths = newCost > 0 ? newCost / totalMonthlySavings : 0

    setResults({
      monthlySavings,
      timeSavingsHours,
      timeSavingsCost,
      efficiencyGains,
      totalMonthlySavings,
      annualSavings,
      roiPercentage,
      paybackMonths,
    })
  }

  const updateInput = (field: keyof ROIInputs, value: string | number) => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        typeof value === "string" ? (field === "currentSolution" ? value : Number.parseFloat(value) || 0) : value,
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number, decimals = 1) => {
    return num.toFixed(decimals)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ROI Calculator</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See exactly how much you'll save by switching to VINScan Pro. Calculate your return on investment in
          real-time.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Your Current Situation
            </CardTitle>
            <CardDescription>Tell us about your current setup to calculate potential savings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="current-solution">Current Solution</Label>
              <Select value={inputs.currentSolution} onValueChange={(value) => updateInput("currentSolution", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="autotrader">AutoTrader Solutions</SelectItem>
                  <SelectItem value="dealersocket">DealerSocket</SelectItem>
                  <SelectItem value="vauto">vAuto (Cox Automotive)</SelectItem>
                  <SelectItem value="manual">Manual Process</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthly-vehicles">Vehicles/Month</Label>
                <Input
                  id="monthly-vehicles"
                  type="number"
                  value={inputs.monthlyVehicles}
                  onChange={(e) => updateInput("monthlyVehicles", e.target.value)}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="avg-price">Avg Vehicle Price</Label>
                <Input
                  id="avg-price"
                  type="number"
                  value={inputs.avgVehiclePrice}
                  onChange={(e) => updateInput("avgVehiclePrice", e.target.value)}
                  min="1000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time-per-vin">Minutes per VIN</Label>
                <Input
                  id="time-per-vin"
                  type="number"
                  value={inputs.timePerVIN}
                  onChange={(e) => updateInput("timePerVIN", e.target.value)}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="hourly-wage">Staff Hourly Rate</Label>
                <Input
                  id="hourly-wage"
                  type="number"
                  value={inputs.hourlyWage}
                  onChange={(e) => updateInput("hourlyWage", e.target.value)}
                  min="10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="current-fee">Current Monthly Software Fee</Label>
              <Input
                id="current-fee"
                type="number"
                value={inputs.currentMonthlyFee}
                onChange={(e) => updateInput("currentMonthlyFee", e.target.value)}
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="inventory-turnover">Inventory Turnover (times/year)</Label>
              <Input
                id="inventory-turnover"
                type="number"
                value={inputs.inventoryTurnover}
                onChange={(e) => updateInput("inventoryTurnover", e.target.value)}
                min="1"
                max="24"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Your ROI with VINScan Pro
            </CardTitle>
            <CardDescription>
              Recommended Plan:{" "}
              <Badge className="ml-1">{recommendedPlan.charAt(0).toUpperCase() + recommendedPlan.slice(1)}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(results.totalMonthlySavings)}</div>
                <div className="text-sm text-green-700">Monthly Savings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{formatNumber(results.roiPercentage)}%</div>
                <div className="text-sm text-blue-700">Monthly ROI</div>
              </div>
            </div>

            <Separator />

            {/* Detailed Breakdown */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Savings Breakdown
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Software Cost Savings:</span>
                  <span className="font-medium">{formatCurrency(results.monthlySavings)}/mo</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Savings ({formatNumber(results.timeSavingsHours)}h):</span>
                  <span className="font-medium">{formatCurrency(results.timeSavingsCost)}/mo</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Efficiency Gains:</span>
                  <span className="font-medium">{formatCurrency(results.efficiencyGains)}/mo</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center font-semibold">
                  <span>Total Monthly Savings:</span>
                  <span className="text-green-600">{formatCurrency(results.totalMonthlySavings)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Annual Impact */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Annual Impact
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Savings:</span>
                  <span className="font-bold text-lg text-green-600">{formatCurrency(results.annualSavings)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payback Period:</span>
                  <span className="font-medium">
                    {results.paybackMonths < 1 ? "Immediate" : `${formatNumber(results.paybackMonths)} months`}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Time Savings */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">Time Savings</span>
              </div>
              <p className="text-sm text-blue-700">
                Save <strong>{formatNumber(results.timeSavingsHours)} hours per month</strong> with our 70% faster VIN
                processing. That's equivalent to <strong>{formatCurrency(results.timeSavingsCost)}</strong> in labor
                costs!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Investment Summary</h3>

            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{formatCurrency(results.annualSavings)}</div>
                <div className="text-sm text-gray-600">Annual Savings</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{formatNumber(results.roiPercentage)}%</div>
                <div className="text-sm text-gray-600">Monthly ROI</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {formatNumber(results.timeSavingsHours * 12)}h
                </div>
                <div className="text-sm text-gray-600">Annual Time Saved</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {results.paybackMonths < 1 ? "0" : formatNumber(results.paybackMonths)}
                </div>
                <div className="text-sm text-gray-600">Months to Payback</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
              <h4 className="font-semibold mb-3">
                Recommended Plan: {recommendedPlan.charAt(0).toUpperCase() + recommendedPlan.slice(1)}
              </h4>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span>
                  Monthly Cost: <strong>{formatCurrency(vinScanPricing[recommendedPlan])}</strong>
                </span>
                <ArrowRight className="h-4 w-4" />
                <span>
                  Monthly Savings:{" "}
                  <strong className="text-green-600">{formatCurrency(results.totalMonthlySavings)}</strong>
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Based on your inputs, VINScan Pro will save you <strong>{formatCurrency(results.annualSavings)}</strong>{" "}
              annually while improving efficiency and reducing manual work by{" "}
              <strong>{formatNumber(results.timeSavingsHours * 12)} hours per year</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Free Trial
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
