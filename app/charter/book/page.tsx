"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, MapPin, Phone, Mail, User } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const vehicles = [
  {
    id: "1",
    name: "Toyota Camry (2006)",
    price: 100000,
    category: "Sedan",
    description: "Reliable sedan with excellent comfort and fuel efficiency",
    available: true,
  },
  {
    id: "2",
    name: "GMC Terrain (2011)",
    price: 200000,
    category: "SUV",
    description: "Spacious SUV with premium comfort features and excellent road presence",
    available: true,
  },
]

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
]

export default function BookCharterPage() {
  const [date, setDate] = useState<Date>()
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [duration, setDuration] = useState("")
  const [startTime, setStartTime] = useState("")

  const calculateTotal = () => {
    if (!selectedVehicle || !duration) return 0
    const vehicle = vehicles.find((v) => v.id === selectedVehicle)
    return vehicle ? (vehicle.price * Number.parseInt(duration)) / 10 : 0
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Book Charter Service</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Fill in your charter service requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="pickup" placeholder="Enter pickup address" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="destination" placeholder="Enter destination address" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (hours)</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Hours" />
                      </SelectTrigger>
                      <SelectContent>
                        {[10, 20, 30, 40, 50].map((hour) => (
                          <SelectItem key={hour} value={hour.toString()}>
                            {hour} hour{hour > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Vehicle</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id} disabled={!vehicle.available}>
                          <div className="flex items-center justify-between w-full">
                            <span>{vehicle.name}</span>
                            <span className="ml-4 text-sm text-muted-foreground">
                              ₦{vehicle.price.toLocaleString()}/10hrs
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Number of Passengers</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} passenger{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trip-type">Trip Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-way">One Way</SelectItem>
                        <SelectItem value="round-trip">Round Trip</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="occasion">Occasion/Purpose</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business Meeting</SelectItem>
                        <SelectItem value="airport">Airport Transfer</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="event">Special Event</SelectItem>
                        <SelectItem value="tourism">Tourism/Sightseeing</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="luggage">Luggage Requirements</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select luggage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Luggage</SelectItem>
                        <SelectItem value="light">Light Luggage (1-2 bags)</SelectItem>
                        <SelectItem value="medium">Medium Luggage (3-4 bags)</SelectItem>
                        <SelectItem value="heavy">Heavy Luggage (5+ bags)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="return-pickup">Return Pickup Location (if different)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="return-pickup" placeholder="Enter return pickup address (optional)" className="pl-10" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="preferred-driver">Driver Preference</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Available Driver</SelectItem>
                        <SelectItem value="male">Male Driver</SelectItem>
                        <SelectItem value="female">Female Driver</SelectItem>
                        <SelectItem value="experienced">Most Experienced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Preferred Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="transfer">Bank Transfer</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="mobile">Mobile Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="special-requests">Special Requests</Label>
                  <Textarea
                    id="special-requests"
                    placeholder="Any special requirements or requests..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Your details for the booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="full-name" placeholder="Enter your full name" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" placeholder="Enter your phone number" className="pl-10" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="Enter your email address" className="pl-10" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedVehicle && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Vehicle:</span>
                      <span className="text-sm font-medium">
                        {vehicles.find((v) => v.id === selectedVehicle)?.name}
                      </span>
                    </div>
                    {duration && (
                      <div className="flex justify-between">
                        <span className="text-sm">Duration:</span>
                        <span className="text-sm font-medium">
                          {duration} hour{Number.parseInt(duration) > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                    {date && (
                      <div className="flex justify-between">
                        <span className="text-sm">Date:</span>
                        <span className="text-sm font-medium">{format(date, "MMM dd, yyyy")}</span>
                      </div>
                    )}
                    {startTime && (
                      <div className="flex justify-between">
                        <span className="text-sm">Time:</span>
                        <span className="text-sm font-medium">{startTime}</span>
                      </div>
                    )}
                  </div>
                )}

                {calculateTotal() > 0 && (
                  <>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total:</span>
                        <span className="text-2xl font-bold text-primary">₦{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      Confirm Booking
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Contact our customer service team for assistance with your booking.
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium">WhatsApp: +234 913 563 0154</p>
                  <p className="text-sm font-medium">Mobile: +234 906 918 3165</p>
                  <p className="text-sm font-medium">Email: bridgeocean@cyberservices.com</p>
                  <Button
                    className="w-full mt-2"
                    onClick={() => window.open("https://wa.me/c/2349135630154", "_blank")}
                  >
                    View Our Fleet Catalog on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
