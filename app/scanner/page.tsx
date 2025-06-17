"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Scan, Camera, Type, CheckCircle, AlertCircle, Car, Calendar, Gauge, MapPin } from "lucide-react"

export default function ScannerPage() {
  const [scanMode, setScanMode] = useState<"camera" | "manual">("manual")
  const [vinInput, setVinInput] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scannedVehicle, setScannedVehicle] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock VIN decoding function
  const decodeVIN = async (vin: string) => {
    setIsScanning(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock decoded data
    const mockData = {
      vin: vin,
      make: "Honda",
      model: "Civic",
      year: 2021,
      trim: "EX",
      engine: "1.5L 4-Cylinder Turbo",
      transmission: "CVT",
      drivetrain: "FWD",
      bodyStyle: "Sedan",
      fuelType: "Gasoline",
      country: "United States",
      manufacturer: "Honda Motor Co.",
      plantCode: "Marysville, OH",
      isValid: vin.length === 17,
    }

    setScannedVehicle(mockData)
    setIsScanning(false)
  }

  const handleManualScan = () => {
    if (vinInput.length === 17) {
      decodeVIN(vinInput)
    }
  }

  const startCameraScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setScanMode("camera")
    } catch (error) {
      console.error("Camera access denied:", error)
      alert("Camera access is required for VIN scanning")
    }
  }

  const addToInventory = () => {
    // Mock function to add vehicle to inventory
    alert("Vehicle added to inventory successfully!")
    setScannedVehicle(null)
    setVinInput("")
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
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                <Link href="/scanner" className="text-blue-600 font-medium">
                  Scanner
                </Link>
                <Link href="/inventory" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Inventory
                </Link>
                <Link href="/reports" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Reports
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Pricing
                </Link>
              </nav>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VIN Scanner</h1>
          <p className="text-gray-600">Scan or enter a VIN to decode vehicle information and add to inventory</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scan className="h-5 w-5 mr-2" />
                VIN Input
              </CardTitle>
              <CardDescription>Choose your preferred method to input the VIN</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scan Mode Toggle */}
              <div className="flex space-x-2">
                <Button
                  variant={scanMode === "manual" ? "default" : "outline"}
                  onClick={() => setScanMode("manual")}
                  className="flex-1"
                >
                  <Type className="h-4 w-4 mr-2" />
                  Manual Entry
                </Button>
                <Button
                  variant={scanMode === "camera" ? "default" : "outline"}
                  onClick={startCameraScanning}
                  className="flex-1"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Camera Scan
                </Button>
              </div>

              {scanMode === "manual" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="vin">VIN Number</Label>
                    <Input
                      id="vin"
                      placeholder="Enter 17-character VIN"
                      value={vinInput}
                      onChange={(e) => setVinInput(e.target.value.toUpperCase())}
                      maxLength={17}
                      className="font-mono"
                    />
                    <p className="text-sm text-gray-500 mt-1">{vinInput.length}/17 characters</p>
                  </div>
                  <Button onClick={handleManualScan} disabled={vinInput.length !== 17 || isScanning} className="w-full">
                    {isScanning ? "Decoding..." : "Decode VIN"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Position the VIN within the camera frame</p>
                    <Button onClick={() => decodeVIN("1HGBH41JXMN109186")}>Simulate Scan</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Vehicle Information
              </CardTitle>
              <CardDescription>Decoded VIN information will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {isScanning ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Decoding VIN...</p>
                  </div>
                </div>
              ) : scannedVehicle ? (
                <div className="space-y-6">
                  {/* Validation Status */}
                  <div className="flex items-center space-x-2">
                    {scannedVehicle.isValid ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <Badge variant={scannedVehicle.isValid ? "default" : "destructive"}>
                      {scannedVehicle.isValid ? "Valid VIN" : "Invalid VIN"}
                    </Badge>
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {scannedVehicle.year} {scannedVehicle.make} {scannedVehicle.model}
                      </h3>
                      <p className="text-gray-600">{scannedVehicle.trim}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Year:</span>
                        <span className="font-medium">{scannedVehicle.year}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Body:</span>
                        <span className="font-medium">{scannedVehicle.bodyStyle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Engine:</span>
                        <span className="font-medium">{scannedVehicle.engine}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Plant:</span>
                        <span className="font-medium">{scannedVehicle.plantCode}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">VIN:</span>
                        <span className="font-mono">{scannedVehicle.vin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transmission:</span>
                        <span>{scannedVehicle.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Drivetrain:</span>
                        <span>{scannedVehicle.drivetrain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fuel Type:</span>
                        <span>{scannedVehicle.fuelType}</span>
                      </div>
                    </div>

                    <Button onClick={addToInventory} className="w-full">
                      Add to Inventory
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center text-gray-500">
                    <Scan className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter or scan a VIN to see vehicle information</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
