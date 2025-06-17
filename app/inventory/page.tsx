"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scan, Search, Download, Plus, Edit, Trash2, Eye, SortAsc, SortDesc } from "lucide-react"

// Extended mock data
const mockInventory = [
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
    dateAdded: "2024-01-15",
    condition: "Excellent",
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
    dateAdded: "2024-01-10",
    condition: "Good",
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
    dateAdded: "2024-01-20",
    condition: "Excellent",
  },
  {
    id: 4,
    vin: "WBXHT910X0WW12345",
    make: "BMW",
    model: "X3",
    year: 2019,
    color: "Black",
    mileage: 35000,
    price: 42000,
    status: "Available",
    location: "Lot C-03",
    dateAdded: "2024-01-18",
    condition: "Very Good",
  },
  {
    id: 5,
    vin: "1G1ZD5ST8HF123456",
    make: "Chevrolet",
    model: "Malibu",
    year: 2023,
    color: "Red",
    mileage: 8000,
    price: 26500,
    status: "Available",
    location: "Lot A-15",
    dateAdded: "2024-01-22",
    condition: "Like New",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("dateAdded")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [vehicles] = useState(mockInventory)

  // Filter and sort vehicles
  const filteredAndSortedVehicles = vehicles
    .filter((vehicle) => {
      const matchesSearch =
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.color.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || vehicle.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "default"
      case "sold":
        return "secondary"
      case "reserved":
        return "outline"
      default:
        return "default"
    }
  }

  const exportInventory = () => {
    // Mock export function
    alert("Inventory exported successfully!")
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
                <Link href="/inventory" className="text-blue-600 font-medium">
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
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={exportInventory}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button asChild>
                <Link href="/scanner">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vehicle
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Inventory</h1>
          <p className="text-gray-600">Manage and track all vehicles in your inventory</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 bg-gradient-to-r from-secondary-50 to-white border-secondary-100">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
                  <Input
                    placeholder="Search by VIN, make, model, or color..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inventory ({filteredAndSortedVehicles.length} vehicles)</CardTitle>
                <CardDescription>Complete list of vehicles in your inventory</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("vin")}>
                      <div className="flex items-center">
                        VIN
                        {sortField === "vin" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="h-4 w-4 ml-1" />
                          ) : (
                            <SortDesc className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("make")}>
                      <div className="flex items-center">
                        Vehicle
                        {sortField === "make" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="h-4 w-4 ml-1" />
                          ) : (
                            <SortDesc className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("year")}>
                      <div className="flex items-center">
                        Year
                        {sortField === "year" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="h-4 w-4 ml-1" />
                          ) : (
                            <SortDesc className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("mileage")}>
                      <div className="flex items-center">
                        Mileage
                        {sortField === "mileage" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="h-4 w-4 ml-1" />
                          ) : (
                            <SortDesc className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("price")}>
                      <div className="flex items-center">
                        Price
                        {sortField === "price" &&
                          (sortDirection === "asc" ? (
                            <SortAsc className="h-4 w-4 ml-1" />
                          ) : (
                            <SortDesc className="h-4 w-4 ml-1" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedVehicles.map((vehicle) => (
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
                      <TableCell className="font-medium">${vehicle.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(vehicle.status) as any}>{vehicle.status}</Badge>
                      </TableCell>
                      <TableCell>{vehicle.location}</TableCell>
                      <TableCell>
                        <span className="text-sm">{vehicle.condition}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
