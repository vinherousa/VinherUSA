"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Shield, Target, CheckCircle, Zap, ArrowRight, Camera, Search } from "lucide-react"

interface DemoStep {
  id: number
  title: string
  description: string
  duration: number
  component: React.ReactNode
}

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)

  const demoSteps: DemoStep[] = [
    {
      id: 1,
      title: "Welcome to VinHero",
      description: "Your VIN scanning superhero is ready for action",
      duration: 3000,
      component: (
        <div className="bg-gradient-to-br from-slate-800 to-blue-900 p-8 rounded-lg text-center border border-amber-500/30">
          <div className="relative mb-4">
            <Shield className="h-16 w-16 text-amber-400 mx-auto animate-pulse" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">VinHero</h2>
          <p className="text-amber-300">Your VIN Scanning Superhero</p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Lightning VIN Scan",
      description: "Unleash superhuman VIN scanning powers",
      duration: 4000,
      component: (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border-2 border-amber-400/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Hero VIN Scanner</h3>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">HERO MODE</Badge>
          </div>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1 border-blue-400 text-blue-400 hover:bg-blue-400/20">
                <Camera className="h-4 w-4 mr-2" />
                Hero Vision
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                <Search className="h-4 w-4 mr-2" />
                Power Scan
              </Button>
            </div>
            <div className="relative">
              <input
                className="w-full p-3 bg-slate-700 border border-amber-400/50 rounded-lg font-mono text-center text-lg text-white"
                value="1HGBH41JXMN109186"
                readOnly
              />
              <div className="absolute inset-0 bg-amber-400/20 rounded-lg animate-pulse"></div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              size="lg"
            >
              <Shield className="h-4 w-4 mr-2" />
              Activate Hero Powers
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Hero Intelligence Activated",
      description: "Instant vehicle intelligence at superhuman speed",
      duration: 5000,
      component: (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border-2 border-green-400/50">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
            <Badge className="bg-green-500/20 text-green-400 border border-green-400/50">HERO INTEL ACQUIRED</Badge>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white">2021 Honda Civic</h3>
              <p className="text-amber-300">EX Sedan - Hero Grade Vehicle</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Engine:</span>
                <span className="font-medium text-white">1.5L Turbo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transmission:</span>
                <span className="font-medium text-white">CVT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Drivetrain:</span>
                <span className="font-medium text-white">FWD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Hero Rating:</span>
                <span className="font-medium text-amber-400">★★★★★</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
              <Target className="h-4 w-4 mr-2" />
              Add to Hero Inventory
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Hero Command Center",
      description: "Monitor your entire fleet from mission control",
      duration: 4000,
      component: (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-blue-400/50">
          <h3 className="text-xl font-semibold mb-4 text-white">Hero Command Center</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <div className="text-2xl font-bold text-blue-400">127</div>
              <div className="text-sm text-gray-400">Heroes Deployed</div>
            </div>
            <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-400/30">
              <div className="text-2xl font-bold text-green-400">89</div>
              <div className="text-sm text-gray-400">Ready for Action</div>
            </div>
            <div className="text-center p-3 bg-amber-500/20 rounded-lg border border-amber-400/30">
              <div className="text-2xl font-bold text-amber-400">$2.1M</div>
              <div className="text-sm text-gray-400">Hero Value</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded border border-amber-400/30">
              <span className="font-mono text-sm text-white">1HGBH41JXMN109186</span>
              <Badge className="bg-green-500/20 text-green-400">Hero Added</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
              <span className="font-mono text-sm text-white">1FTFW1ET5DFC10312</span>
              <Badge className="bg-blue-500/20 text-blue-400">On Mission</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
              <span className="font-mono text-sm text-white">5NPE34AF4HH012345</span>
              <Badge className="bg-purple-500/20 text-purple-400">Reserved</Badge>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Power Analytics",
      description: "Legendary insights to dominate your market",
      duration: 4000,
      component: (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-purple-400/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Hero Analytics</h3>
            <Zap className="h-6 w-6 text-purple-400" />
          </div>
          <div className="space-y-4">
            <div className="h-32 bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-lg flex items-end justify-around p-4 border border-purple-400/30">
              <div className="bg-gradient-to-t from-amber-500 to-orange-500 w-8 h-16 rounded-t"></div>
              <div className="bg-gradient-to-t from-amber-500 to-orange-500 w-8 h-20 rounded-t"></div>
              <div className="bg-gradient-to-t from-amber-500 to-orange-500 w-8 h-12 rounded-t"></div>
              <div className="bg-gradient-to-t from-amber-500 to-orange-500 w-8 h-24 rounded-t"></div>
              <div className="bg-gradient-to-t from-amber-500 to-orange-500 w-8 h-28 rounded-t"></div>
              <div className="bg-gradient-to-t from-amber-500 to-orange-500 w-8 h-20 rounded-t"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">+23%</div>
                <div className="text-gray-400">Hero Performance</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">12.5</div>
                <div className="text-gray-400">Days to Victory</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Ready to Be a Hero?",
      description: "Join the league of automotive heroes",
      duration: 5000,
      component: (
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-8 rounded-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Become a VIN Hero Today</h3>
          <p className="text-orange-100 mb-6">
            Unleash your superpowers with a 14-day hero trial. No kryptonite required.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
            <div>
              <div className="text-xl font-bold">70%</div>
              <div className="text-orange-200">Faster Than Light</div>
            </div>
            <div>
              <div className="text-xl font-bold">$18k</div>
              <div className="text-orange-200">Hero Savings</div>
            </div>
            <div>
              <div className="text-xl font-bold">99.9%</div>
              <div className="text-orange-200">Hero Accuracy</div>
            </div>
          </div>
          <div className="space-y-3">
            <Button size="lg" variant="secondary" className="w-full bg-white text-orange-600 hover:bg-gray-100">
              Claim Hero Powers
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white text-white hover:bg-white hover:text-orange-600"
            >
              View Hero Pricing
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const totalDuration = demoSteps.reduce((sum, step) => sum + step.duration, 0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setStepProgress((prev) => {
          const newProgress = prev + 50
          const currentStepDuration = demoSteps[currentStep].duration

          if (newProgress >= currentStepDuration) {
            // Move to next step
            if (currentStep < demoSteps.length - 1) {
              setCurrentStep((prev) => prev + 1)
              return 0
            } else {
              // Demo finished
              setIsPlaying(false)
              return currentStepDuration
            }
          }
          return newProgress
        })

        setProgress((prev) => {
          const elapsed = demoSteps.slice(0, currentStep).reduce((sum, step) => sum + step.duration, 0) + stepProgress
          return (elapsed / totalDuration) * 100
        })
      }, 50)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentStep, stepProgress, demoSteps, totalDuration])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setProgress(0)
    setStepProgress(0)
    setIsPlaying(true)
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setStepProgress(0)
    setProgress((demoSteps.slice(0, stepIndex).reduce((sum, step) => sum + step.duration, 0) / totalDuration) * 100)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-slate-800 border-amber-500/30 shadow-2xl">
      <CardContent className="p-0">
        {/* Demo Screen */}
        <div className="aspect-video bg-gradient-to-br from-slate-900 to-blue-900 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">{demoSteps[currentStep].component}</div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-slate-800 border-t border-amber-500/30">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white">{demoSteps[currentStep].title}</h3>
              <span className="text-sm text-gray-400">
                {Math.round(progress)}% •{" "}
                {Math.ceil(
                  (totalDuration -
                    (demoSteps.slice(0, currentStep).reduce((sum, step) => sum + step.duration, 0) + stepProgress)) /
                    1000,
                )}
                s
              </span>
            </div>
            <Progress value={progress} className="mb-2 bg-slate-700" />
            <p className="text-sm text-gray-400">{demoSteps[currentStep].description}</p>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="border-amber-400 text-amber-400 hover:bg-amber-400/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestart}
                className="border-amber-400 text-amber-400 hover:bg-amber-400/20"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center space-x-1">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-amber-400" : index < currentStep ? "bg-amber-400/60" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/20">
                Hero Pricing
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                Become Hero
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
