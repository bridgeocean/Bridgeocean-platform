import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Calendar, Settings } from "lucide-react"

export default function WhatsAppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">WhatsApp Communications</h2>
        </div>

        {/* Add this section right after the page header and before the existing Tabs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                WhatsApp Business Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Business Phone Number</Label>
                <Input id="phone" placeholder="+1234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">WhatsApp Business API Key</Label>
                <Input id="api-key" type="password" placeholder="Enter your API key" />
              </div>
              <Button className="w-full">Connect WhatsApp Business</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendar Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Calendar Provider</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose calendar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Calendar</SelectItem>
                    <SelectItem value="outlook">Microsoft Outlook</SelectItem>
                    <SelectItem value="apple">Apple Calendar</SelectItem>
                    <SelectItem value="yahoo">Yahoo Calendar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Connect Calendar</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Test WhatsApp Connection
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Sync Calendar Events
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Import Contacts
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="messages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="messages" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Conversations</CardTitle>
                  <CardDescription>Recent WhatsApp conversations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-1 p-2">
                      {[
                        { name: "John Doe", avatar: "/placeholder.svg", initials: "JD", active: true, unread: 2 },
                        { name: "Sarah Davis", avatar: "/placeholder.svg", initials: "SD", active: false, unread: 0 },
                        {
                          name: "Robert Johnson",
                          avatar: "/placeholder.svg",
                          initials: "RJ",
                          active: false,
                          unread: 0,
                        },
                        { name: "Maria Lopez", avatar: "/placeholder.svg", initials: "ML", active: false, unread: 1 },
                        { name: "David Wilson", avatar: "/placeholder.svg", initials: "DW", active: false, unread: 0 },
                      ].map((contact) => (
                        <div
                          key={contact.name}
                          className={`flex items-center space-x-4 rounded-md p-2 ${
                            contact.active ? "bg-accent" : "hover:bg-accent"
                          } cursor-pointer`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                            <AvatarFallback>{contact.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{contact.name}</p>
                            <p className="text-xs text-muted-foreground">{contact.active ? "Typing..." : "Online"}</p>
                          </div>
                          {contact.unread > 0 && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                              <span className="text-xs text-primary-foreground">{contact.unread}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="col-span-2">
                <CardHeader className="border-b p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">John Doe</CardTitle>
                      <CardDescription>Online</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] p-4">
                    <div className="space-y-4 p-4">
                      <div className="flex items-end gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>BO</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg rounded-bl-none bg-muted p-3">
                          <p className="text-sm">
                            Hello John, this is regarding your upcoming interview on June 8th at 2:00 PM.
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">9:41 AM</span>
                      </div>
                      <div className="flex items-end justify-end gap-2">
                        <span className="text-xs text-muted-foreground">9:42 AM</span>
                        <div className="rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground">
                          <p className="text-sm">
                            Hi, yes I'm looking forward to it. Is there anything I should prepare?
                          </p>
                        </div>
                      </div>
                      <div className="flex items-end gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>BO</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg rounded-bl-none bg-muted p-3">
                          <p className="text-sm">
                            Yes, please bring your driver's license, proof of insurance, and vehicle registration.
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">9:45 AM</span>
                      </div>
                      <div className="flex items-end gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>BO</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg rounded-bl-none bg-muted p-3">
                          <p className="text-sm">
                            I've also sent you an email with the interview details and a map to our office.
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">9:46 AM</span>
                      </div>
                      <div className="flex items-end justify-end gap-2">
                        <span className="text-xs text-muted-foreground">9:48 AM</span>
                        <div className="rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground">
                          <p className="text-sm">
                            Perfect, I'll make sure to bring everything. I just checked my email and got the details.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-end justify-end gap-2">
                        <span className="text-xs text-muted-foreground">9:49 AM</span>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="templates">Templates content</TabsContent>
          <TabsContent value="settings">Settings content</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
