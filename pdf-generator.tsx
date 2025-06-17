"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PDFReportGenerator, type ReportData } from "@/lib/pdf-generator"
import { Download, FileText, Loader2, CheckCircle } from "lucide-react"

interface PDFGeneratorProps {
  reportData: ReportData
  onGenerateStart?: () => void
  onGenerateComplete?: () => void
  onGenerateError?: (error: string) => void
}

export function PDFGenerator({ reportData, onGenerateStart, onGenerateComplete, onGenerateError }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [reportType, setReportType] = useState("comprehensive")
  const [generationStatus, setGenerationStatus] = useState<"idle" | "generating" | "complete" | "error">("idle")

  const chartRefs = {
    salesChart: useRef<HTMLDivElement>(null),
    makeChart: useRef<HTMLDivElement>(null),
    priceChart: useRef<HTMLDivElement>(null),
    inventoryChart: useRef<HTMLDivElement>(null),
  }

  const generatePDF = async () => {
    if (isGenerating) return

    setIsGenerating(true)
    setGenerationStatus("generating")
    setProgress(0)
    onGenerateStart?.()

    try {
      const generator = new PDFReportGenerator()

      // Simulate progress updates
      const progressSteps = [
        { step: "Preparing data...", progress: 10 },
        { step: "Capturing charts...", progress: 30 },
        { step: "Generating tables...", progress: 60 },
        { step: "Formatting PDF...", progress: 80 },
        { step: "Finalizing report...", progress: 95 },
      ]

      for (const { step, progress: stepProgress } of progressSteps) {
        setProgress(stepProgress)
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      // Get chart elements
      const chartElements: { [key: string]: HTMLElement } = {}
      Object.entries(chartRefs).forEach(([key, ref]) => {
        if (ref.current) {
          chartElements[key] = ref.current
        }
      })

      // Generate PDF
      const pdfBlob = await generator.generateReport(reportData, chartElements)

      // Download PDF
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `VINScan-Report-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setProgress(100)
      setGenerationStatus("complete")
      onGenerateComplete?.()

      // Reset status after 3 seconds
      setTimeout(() => {
        setGenerationStatus("idle")
        setProgress(0)
      }, 3000)
    } catch (error) {
      console.error("PDF generation failed:", error)
      setGenerationStatus("error")
      onGenerateError?.("Failed to generate PDF report. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const getStatusIcon = () => {
    switch (generationStatus) {
      case "generating":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <FileText className="h-4 w-4 text-red-600" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  const getStatusText = () => {
    switch (generationStatus) {
      case "generating":
        return "Generating PDF..."
      case "complete":
        return "PDF Generated Successfully!"
      case "error":
        return "Generation Failed"
      default:
        return "Generate PDF Report"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          PDF Report Generator
        </CardTitle>
        <CardDescription>Generate comprehensive PDF reports with charts and detailed analytics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Report Type</label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">Executive Summary</SelectItem>
              <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
              <SelectItem value="charts-only">Charts Only</SelectItem>
              <SelectItem value="data-only">Data Tables Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Report Preview */}
        <div className="space-y-4">
          <h4 className="font-medium">Report Contents:</h4>
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline">Key Metrics</Badge>
            <Badge variant="outline">Sales Trends</Badge>
            <Badge variant="outline">Inventory Analysis</Badge>
            <Badge variant="outline">Performance Data</Badge>
            <Badge variant="outline">Charts & Graphs</Badge>
            <Badge variant="outline">Detailed Tables</Badge>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Generating report...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={generatePDF}
          disabled={isGenerating}
          className="w-full"
          variant={generationStatus === "complete" ? "default" : "default"}
        >
          {getStatusIcon()}
          <span className="ml-2">{getStatusText()}</span>
        </Button>

        {/* Report Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Report includes all visible charts and data tables</p>
          <p>• PDF will be automatically downloaded when ready</p>
          <p>• File size: ~2-5MB depending on content</p>
        </div>

        {/* Hidden chart containers for PDF generation */}
        <div className="hidden">
          <div ref={chartRefs.salesChart} id="sales-chart-pdf" />
          <div ref={chartRefs.makeChart} id="make-chart-pdf" />
          <div ref={chartRefs.priceChart} id="price-chart-pdf" />
          <div ref={chartRefs.inventoryChart} id="inventory-chart-pdf" />
        </div>
      </CardContent>
    </Card>
  )
}
