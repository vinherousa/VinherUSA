import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export interface ReportData {
  title: string
  dateRange: string
  generatedAt: string
  metrics: {
    totalRevenue: number
    totalSales: number
    avgInventory: number
    avgSalePrice: number
    revenueGrowth: number
  }
  salesData: Array<{
    month: string
    sales: number
    revenue: number
    inventory: number
  }>
  makeDistribution: Array<{
    make: string
    count: number
    value: number
    percentage: number
  }>
  statusDistribution: Array<{
    status: string
    count: number
    percentage: number
  }>
  topPerformers: Array<{
    model: string
    sold: number
    revenue: number
    avgDays: number
  }>
  locationAnalytics: Array<{
    location: string
    vehicles: number
    utilization: number
    revenue: number
  }>
}

export class PDFReportGenerator {
  private pdf: jsPDF
  private pageWidth: number
  private pageHeight: number
  private margin: number
  private currentY: number

  constructor() {
    this.pdf = new jsPDF("p", "mm", "a4")
    this.pageWidth = this.pdf.internal.pageSize.getWidth()
    this.pageHeight = this.pdf.internal.pageSize.getHeight()
    this.margin = 20
    this.currentY = this.margin
  }

  private addHeader(title: string, dateRange: string, generatedAt: string) {
    // Company logo/title
    this.pdf.setFontSize(24)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text("VINScan Pro", this.margin, this.currentY)

    this.pdf.setFontSize(18)
    this.pdf.setFont("helvetica", "normal")
    this.pdf.text(title, this.margin, this.currentY + 10)

    // Date information
    this.pdf.setFontSize(10)
    this.pdf.setFont("helvetica", "normal")
    this.pdf.text(`Period: ${dateRange}`, this.margin, this.currentY + 20)
    this.pdf.text(`Generated: ${generatedAt}`, this.margin, this.currentY + 25)

    // Add line separator
    this.pdf.setLineWidth(0.5)
    this.pdf.line(this.margin, this.currentY + 30, this.pageWidth - this.margin, this.currentY + 30)

    this.currentY += 40
  }

  private addMetricsSection(metrics: ReportData["metrics"]) {
    this.pdf.setFontSize(16)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text("Key Performance Metrics", this.margin, this.currentY)
    this.currentY += 10

    const metricsData = [
      ["Total Revenue", `$${(metrics.totalRevenue / 1000000).toFixed(1)}M`],
      ["Total Sales", `${metrics.totalSales} vehicles`],
      ["Average Inventory", `${metrics.avgInventory} vehicles`],
      ["Average Sale Price", `$${(metrics.avgSalePrice / 1000).toFixed(0)}k`],
      ["Revenue Growth", `${metrics.revenueGrowth > 0 ? "+" : ""}${metrics.revenueGrowth.toFixed(1)}%`],
    ]

    this.addTable(["Metric", "Value"], metricsData)
    this.currentY += 10
  }

  private addTable(headers: string[], data: string[][]) {
    const startY = this.currentY
    const rowHeight = 8
    const colWidth = (this.pageWidth - 2 * this.margin) / headers.length

    // Headers
    this.pdf.setFontSize(10)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.setFillColor(240, 240, 240)
    this.pdf.rect(this.margin, startY, this.pageWidth - 2 * this.margin, rowHeight, "F")

    headers.forEach((header, index) => {
      this.pdf.text(header, this.margin + index * colWidth + 2, startY + 5)
    })

    // Data rows
    this.pdf.setFont("helvetica", "normal")
    data.forEach((row, rowIndex) => {
      const y = startY + (rowIndex + 1) * rowHeight

      if (rowIndex % 2 === 1) {
        this.pdf.setFillColor(250, 250, 250)
        this.pdf.rect(this.margin, y, this.pageWidth - 2 * this.margin, rowHeight, "F")
      }

      row.forEach((cell, colIndex) => {
        this.pdf.text(cell, this.margin + colIndex * colWidth + 2, y + 5)
      })
    })

    // Border
    this.pdf.setDrawColor(200, 200, 200)
    this.pdf.rect(this.margin, startY, this.pageWidth - 2 * this.margin, (data.length + 1) * rowHeight)

    this.currentY = startY + (data.length + 1) * rowHeight + 5
  }

  private async addChartImage(chartElement: HTMLElement, title: string) {
    if (this.currentY > this.pageHeight - 100) {
      this.pdf.addPage()
      this.currentY = this.margin
    }

    this.pdf.setFontSize(14)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text(title, this.margin, this.currentY)
    this.currentY += 10

    try {
      const canvas = await html2canvas(chartElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = this.pageWidth - 2 * this.margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      this.pdf.addImage(imgData, "PNG", this.margin, this.currentY, imgWidth, imgHeight)
      this.currentY += imgHeight + 10
    } catch (error) {
      console.error("Error capturing chart:", error)
      this.pdf.text("Chart could not be generated", this.margin, this.currentY)
      this.currentY += 10
    }
  }

  private addSalesDataTable(salesData: ReportData["salesData"]) {
    if (this.currentY > this.pageHeight - 60) {
      this.pdf.addPage()
      this.currentY = this.margin
    }

    this.pdf.setFontSize(14)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text("Monthly Sales Data", this.margin, this.currentY)
    this.currentY += 10

    const tableData = salesData.map((item) => [
      item.month,
      item.sales.toString(),
      `$${(item.revenue / 1000).toFixed(0)}k`,
      item.inventory.toString(),
    ])

    this.addTable(["Month", "Sales", "Revenue", "Inventory"], tableData)
  }

  private addMakeDistributionTable(makeDistribution: ReportData["makeDistribution"]) {
    if (this.currentY > this.pageHeight - 60) {
      this.pdf.addPage()
      this.currentY = this.margin
    }

    this.pdf.setFontSize(14)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text("Inventory Distribution by Make", this.margin, this.currentY)
    this.currentY += 10

    const tableData = makeDistribution.map((item) => [
      item.make,
      item.count.toString(),
      `$${(item.value / 1000).toFixed(0)}k`,
      `${item.percentage.toFixed(1)}%`,
    ])

    this.addTable(["Make", "Count", "Total Value", "Market Share"], tableData)
  }

  private addTopPerformersTable(topPerformers: ReportData["topPerformers"]) {
    if (this.currentY > this.pageHeight - 60) {
      this.pdf.addPage()
      this.currentY = this.margin
    }

    this.pdf.setFontSize(14)
    this.pdf.setFont("helvetica", "bold")
    this.pdf.text("Top Performing Models", this.margin, this.currentY)
    this.currentY += 10

    const tableData = topPerformers.map((item) => [
      item.model,
      item.sold.toString(),
      `$${(item.revenue / 1000).toFixed(0)}k`,
      `${item.avgDays} days`,
    ])

    this.addTable(["Model", "Units Sold", "Revenue", "Avg Days to Sell"], tableData)
  }

  async generateReport(data: ReportData, chartElements: { [key: string]: HTMLElement }): Promise<Blob> {
    // Header
    this.addHeader(data.title, data.dateRange, data.generatedAt)

    // Key Metrics
    this.addMetricsSection(data.metrics)

    // Charts
    if (chartElements.salesChart) {
      await this.addChartImage(chartElements.salesChart, "Sales & Revenue Trend")
    }

    if (chartElements.makeChart) {
      await this.addChartImage(chartElements.makeChart, "Inventory Distribution by Make")
    }

    if (chartElements.priceChart) {
      await this.addChartImage(chartElements.priceChart, "Price Range Distribution")
    }

    if (chartElements.inventoryChart) {
      await this.addChartImage(chartElements.inventoryChart, "Inventory Levels Over Time")
    }

    // Data Tables
    this.addSalesDataTable(data.salesData)
    this.addMakeDistributionTable(data.makeDistribution)
    this.addTopPerformersTable(data.topPerformers)

    // Footer
    const pageCount = this.pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      this.pdf.setPage(i)
      this.pdf.setFontSize(8)
      this.pdf.setFont("helvetica", "normal")
      this.pdf.text(`Page ${i} of ${pageCount}`, this.pageWidth - this.margin - 20, this.pageHeight - 10)
      this.pdf.text("Generated by VINScan Pro Analytics", this.margin, this.pageHeight - 10)
    }

    return this.pdf.output("blob")
  }
}
