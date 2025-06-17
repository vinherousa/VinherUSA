"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, BarChart3, Table, TrendingUp } from "lucide-react"
import type { ReportData } from "@/lib/pdf-generator"

interface ReportPreviewProps {
  data: ReportData
}

export function ReportPreview({ data }: ReportPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Report Preview
        </CardTitle>
        <CardDescription>Preview of the PDF report content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Header Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{data.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Period: {data.dateRange}</span>
            <span>Generated: {data.generatedAt}</span>
          </div>
        </div>

        <Separator />

        {/* Key Metrics Preview */}
        <div className="space-y-3">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            <h4 className="font-medium">Key Performance Metrics</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Revenue:</span>
              <span className="font-medium">${(data.metrics.totalRevenue / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Sales:</span>
              <span className="font-medium">{data.metrics.totalSales} vehicles</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Inventory:</span>
              <span className="font-medium">{data.metrics.avgInventory} vehicles</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue Growth:</span>
              <span className={`font-medium ${data.metrics.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                {data.metrics.revenueGrowth >= 0 ? "+" : ""}
                {data.metrics.revenueGrowth.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Charts Section */}
        <div className="space-y-3">
          <div className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            <h4 className="font-medium">Charts & Visualizations</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline">Sales & Revenue Trend</Badge>
            <Badge variant="outline">Inventory by Make</Badge>
            <Badge variant="outline">Price Range Distribution</Badge>
            <Badge variant="outline">Inventory Levels</Badge>
          </div>
        </div>

        <Separator />

        {/* Data Tables Section */}
        <div className="space-y-3">
          <div className="flex items-center">
            <Table className="h-4 w-4 mr-2" />
            <h4 className="font-medium">Data Tables</h4>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Monthly Sales Data:</span>
              <span className="text-gray-600 ml-2">{data.salesData.length} months</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Make Distribution:</span>
              <span className="text-gray-600 ml-2">{data.makeDistribution.length} manufacturers</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Top Performers:</span>
              <span className="text-gray-600 ml-2">{data.topPerformers.length} models</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Location Analytics:</span>
              <span className="text-gray-600 ml-2">{data.locationAnalytics.length} locations</span>
            </div>
          </div>
        </div>

        {/* Estimated File Size */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-xs text-gray-600">
            <p>
              <strong>Estimated PDF Size:</strong> 2.5 - 4.2 MB
            </p>
            <p>
              <strong>Pages:</strong> 8-12 pages
            </p>
            <p>
              <strong>Format:</strong> A4, Professional Layout
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
