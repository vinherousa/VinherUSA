"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Scan, Car, Plus, Search, Filter, MoreHorizontal, TrendingUp, Package, DollarSign } from "lucide-react"

// Mock data for demonstration
const mockVehicles = [
  {
    id: 1,
    vin: "1HGBH41JXMN109186",
    make: "Honda",
    model: "Civic",
    year: 2021,
    color: "Silver",
    mileage: 25000,
    price: 22500,
    status: "Available",
    location: "Lot A-12",
  },
  {
    id: 2,
    vin: "1FTFW1ET5DFC10312",
    make: "Ford",
    model: "F-150",
    year: 2020,
    color: "Blue",
    mileage: 45000,
    price: 35000,
    status: "Sold",
    location: "Lot B-05",
  },
  {
    id: 3,
    vin: "5NPE34AF4HH012345",
    make: "Hyundai",
    model: "Sonata",
    year: 2022,
    color: "White",
    mileage: 15000,
    price: 28000,
    status: "Reserved",
    location: "Lot A-08",
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [vehicles] = useState(mockVehicles)

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter((v) => v.status === "Available").length,
    soldVehicles: vehicles.filter((v) => v.status === "Sold").length,
    totalValue: vehicles.reduce((sum, v) => sum + v.price, 0),
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
                <Link href="/dashboard" className="text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/scanner" className="text-gray-600 hover:text-secondary-500 transition-colors">
                  Scanner
                </Link>
                <Link href="/inventory" className="text-gray-600 hover:text-secondary-500 transition-colors">
                  Inventory
                </Link>
                <Link href="/reports" className="text-gray-600 hover:text-secondary-500 transition-colors">
                  Reports
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-secondary-500 transition-colors">
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/scanner">
                  <Scan className="h-4 w-4 mr-2" />
                  Scan VIN
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVehicles}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary-50 to-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Car className="h-4 w-4 text-secondary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableVehicles}</div>
              <p className="text-xs text-muted-foreground">Ready for sale</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sold This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.soldVehicles}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-secondary-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Inventory value</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Vehicles */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Vehicles</CardTitle>
                <CardDescription>Latest vehicles added to your inventory</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search vehicles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm" asChild>
                  <Link href="/scanner">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vehicle
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>VIN</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-mono text-sm">{vehicle.vin}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">{vehicle.color}</div>
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.mileage.toLocaleString()} mi</TableCell>
                    <TableCell>${vehicle.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          vehicle.status === "Available"
                            ? "default"
                            : vehicle.status === "Sold"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.location}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
