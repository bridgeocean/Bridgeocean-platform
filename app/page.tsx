"use client"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Car, Calendar, Users, Shield, Clock, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Premium Charter Services & Smart Driver Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience luxury transportation with our premium charter services, powered by intelligent driver
                    onboarding and management systems.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/charter/book">
                    <Button size="lg" className="gap-1.5">
                      Book Charter Service
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/driverprep">
                    <Button size="lg" variant="outline">
                      Driver Management
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full">
                  <Image
                    src="/images/luxury-car-hero.jpg"
                    alt="Premium Charter Vehicle"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive transportation solutions for individuals and businesses
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card className="relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Car className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl">Charter Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    Premium vehicle rentals for special occasions, business trips, and luxury transportation needs.
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Fully Insured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>24/7 Service</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Premium Fleet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>Professional Drivers</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Link href="/charter/book">
                      <Button>Book Now</Button>
                    </Link>
                    <Link href="/charter/fleet">
                      <Button variant="outline">View Fleet</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl">DriverPrep</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    AI-powered driver onboarding platform that streamlines recruitment, interviews, and management.
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>Smart Screening</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>Auto Scheduling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>AI Preparation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      <span>WhatsApp Integration</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Link href="/dashboard">
                      <Button>Get Started</Button>
                    </Link>
                    <Link href="/driverprep">
                      <Button variant="outline">Learn More</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Fleet Showcase Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Premium Fleet</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Experience luxury and comfort with our selection of premium vehicles
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-4">
                  <Button variant="outline" onClick={() => window.open("https://wa.me/c/2349135630154", "_blank")}>
                    View Complete Fleet on WhatsApp
                  </Button>
                  <Link href="/charter/fleet">
                    <Button>Explore Our Fleet</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="overflow-hidden">
                <div className="relative h-80 w-full">
                  <Image src="/images/camry-final.jpg" alt="Toyota Camry" fill className="object-contain bg-muted" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Toyota Camry (2006)</h3>
                      <p className="text-muted-foreground">Reliable sedan with excellent comfort and fuel efficiency</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Sedan</Badge>
                  </div>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Price:</span>
                      <span className="font-bold">₦100,000 per 10 hours</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      *Within Lagos. Additional charges apply for trips outside Lagos.
                    </p>
                    <Link href="/charter/book">
                      <Button className="w-full mt-2">Book Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-80 w-full">
                  <Image src="/images/gmc-final.jpg" alt="GMC Terrain" fill className="object-contain bg-muted" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">GMC Terrain (2011)</h3>
                      <p className="text-muted-foreground">
                        Spacious SUV with premium comfort features and excellent road presence
                      </p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">SUV</Badge>
                  </div>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Price:</span>
                      <span className="font-bold">₦200,000 per 10 hours</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      *Within Lagos. Additional charges apply for trips outside Lagos.
                    </p>
                    <Link href="/charter/book">
                      <Button className="w-full mt-2">Book Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Partner With Us</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our charter fleet and maximize your vehicle's earning potential
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/charter/partner">
                  <Button size="lg">Register Your Vehicle</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Bridgeocean Logo" width={24} height={24} className="h-6 w-auto" />
            <p className="text-sm text-muted-foreground">© 2025 Bridgeocean Limited. All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a
              href="https://www.facebook.com/profile.php?id=61557691785062"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/bridgeoceanlimited/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
