"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { Scan, TrendingUp, DollarSign, Car, Download, BarChart3 } from "lucide-react"
import { PDFGenerator } from "@/components/reports/pdf-generator"
import { ReportPreview } from "@/components/reports/report-preview"
import type { ReportData } from "@/lib/pdf-generator"

// Mock analytics data
const salesData = [
  { month: "Jan", sales: 12, revenue: 450000, inventory: 85 },
  { month: "Feb", sales: 19, revenue: 680000, inventory: 92 },
  { month: "Mar", sales: 15, revenue: 520000, inventory: 78 },
  { month: "Apr", sales: 22, revenue: 780000, inventory: 95 },
  { month: "May", sales: 28, revenue: 920000, inventory: 88 },
  { month: "Jun", sales: 25, revenue: 850000, inventory: 102 },
]

const makeDistribution = [
  { make: "Honda", count: 25, value: 625000, color: "#0088FE" },
  { make: "Ford", count: 18, value: 720000, color: "#00C49F" },
  { make: "Toyota", count: 22, value: 660000, color: "#FFBB28" },
  { make: "BMW", count: 12, value: 840000, color: "#FF8042" },
  { make: "Chevrolet", count: 15, value: 450000, color: "#8884D8" },
  { make: "Hyundai", count: 20, value: 520000, color: "#82CA9D" },
]

const statusDistribution = [
  { status: "Available", count: 68, percentage: 61.8 },
  { status: "Sold", count: 32, percentage: 29.1 },
  { status: "Reserved", count: 10, percentage: 9.1 },
]

const priceRanges = [
  { range: "Under $20k", count: 15, avgPrice: 16500 },
  { range: "$20k-$30k", count: 35, avgPrice: 25200 },
  { range: "$30k-$40k", count: 28, avgPrice: 34800 },
  { range: "$40k-$50k", count: 18, avgPrice: 44500 },
  { range: "Over $50k", count: 14, avgPrice: 62300 },
]

const topPerformers = [
  { model: "Honda Civic", sold: 8, revenue: 180000, avgDays: 12 },
  { model: "Ford F-150", sold: 6, revenue: 210000, avgDays: 8 },
  { model: "Toyota Camry", sold: 7, revenue: 196000, avgDays: 15 },
  { model: "BMW X3", sold: 4, revenue: 168000, avgDays: 22 },
  { model: "Chevrolet Malibu", sold: 5, revenue: 132500, avgDays: 18 },
]

const locationAnalytics = [
  { location: "Lot A", vehicles: 45, utilization: 85, revenue: 1250000 },
  { location: "Lot B", vehicles: 38, utilization: 72, revenue: 980000 },
  { location: "Lot C", vehicles: 27, utilization: 68, revenue: 750000 },
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [reportType, setReportType] = useState("overview")

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0)
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0)
  const avgInventory = Math.round(salesData.reduce((sum, item) => sum + item.inventory, 0) / salesData.length)
  const revenueGrowth = ((salesData[salesData.length - 1].revenue - salesData[0].revenue) / salesData[0].revenue) * 100

  // Prepare PDF report data
  const reportData: ReportData = {
    title: "VINScan Pro Analytics Report",
    dateRange: timeRange === "6months" ? "Last 6 Months" : "Custom Period",
    generatedAt: new Date().toLocaleDateString(),
    metrics: {
      totalRevenue,
      totalSales,
      avgInventory,
      avgSalePrice: Math.round(totalRevenue / totalSales),
      revenueGrowth,
    },
    salesData,
    makeDistribution: makeDistribution.map((item) => ({
      ...item,
      percentage: (item.count / makeDistribution.reduce((sum, m) => sum + m.count, 0)) * 100,
    })),
    statusDistribution,
    topPerformers,
    locationAnalytics,
  }

  const exportReport = () => {
    alert("Report exported successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Scan className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">VINScan Pro</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                <Link href="/dashboard" className="text-gray-600 hover:text-secondary-500 transition-colors">
                  Dashboard
                </Link>
                <Link href="/scanner" className="text-gray-600 hover:text-secondary-500 transition-colors">
                  Scanner
                </Link>
                <Link href="/inventory" className="text-gray-600 hover:text-secondary-500 transition-colors">
                  Inventory
                </Link>
                <Link href="/reports" className="text-blue-600 font-medium">
                  Reports
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-secondary-500 transition-colors">
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportReport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive insights into your inventory performance and sales trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+{revenueGrowth.toFixed(1)}%</span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <Car className="h-4 w-4 text-secondary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground">vehicles sold</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Inventory</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgInventory}</div>
              <p className="text-xs text-muted-foreground">vehicles in stock</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Sale Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(totalRevenue / totalSales / 1000)}k</div>
              <p className="text-xs text-muted-foreground">per vehicle</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Sales & Revenue Trend</CardTitle>
              <CardDescription>Monthly sales performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: {
                    label: "Sales",
                    color: "hsl(var(--chart-1))",
                  },
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="sales" fill="var(--color-sales)" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Make Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Make</CardTitle>
              <CardDescription>Distribution of vehicles by manufacturer</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Vehicles",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={makeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ make, percentage }) => `${make} (${percentage}%)`}
                    >
                      {makeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Price Range Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Price Range Distribution</CardTitle>
              <CardDescription>Vehicle count by price ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Count",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceRanges}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Inventory Levels */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Levels</CardTitle>
              <CardDescription>Monthly inventory tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  inventory: {
                    label: "Inventory",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="inventory"
                      stroke="var(--color-inventory)"
                      fill="var(--color-inventory)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* PDF Generation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PDFGenerator
            reportData={reportData}
            onGenerateStart={() => console.log("PDF generation started")}
            onGenerateComplete={() => console.log("PDF generation completed")}
            onGenerateError={(error) => console.error("PDF generation error:", error)}
          />
          <ReportPreview data={reportData} />
        </div>

        {/* Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Status</CardTitle>
              <CardDescription>Current status distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusDistribution.map((item) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          item.status === "Available" ? "default" : item.status === "Sold" ? "secondary" : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                      <span className="text-sm text-gray-600">{item.count} vehicles</span>
                    </div>
                    <span className="font-medium">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Best selling models this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.slice(0, 5).map((item, index) => (
                  <div key={item.model} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{item.model}</div>
                      <div className="text-xs text-gray-500">
                        {item.sold} sold • {item.avgDays} avg days
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">${(item.revenue / 1000).toFixed(0)}k</div>
                      <div className="text-xs text-gray-500">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Performance</CardTitle>
              <CardDescription>Performance by lot location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationAnalytics.map((item) => (
                  <div key={item.location} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.location}</span>
                      <span className="text-sm text-gray-600">{item.vehicles} vehicles</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.utilization}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.utilization}% utilization</span>
                      <span>${(item.revenue / 1000).toFixed(0)}k revenue</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analytics</CardTitle>
            <CardDescription>Comprehensive breakdown by vehicle make</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Make</th>
                    <th className="text-right py-2">Count</th>
                    <th className="text-right py-2">Total Value</th>
                    <th className="text-right py-2">Avg Price</th>
                    <th className="text-right py-2">Market Share</th>
                  </tr>
                </thead>
                <tbody>
                  {makeDistribution.map((item) => (
                    <tr key={item.make} className="border-b">
                      <td className="py-2 font-medium">{item.make}</td>
                      <td className="text-right py-2">{item.count}</td>
                      <td className="text-right py-2">${(item.value / 1000).toFixed(0)}k</td>
                      <td className="text-right py-2">${Math.round(item.value / item.count / 1000)}k</td>
                      <td className="text-right py-2">
                        {((item.count / makeDistribution.reduce((sum, m) => sum + m.count, 0)) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
