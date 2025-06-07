"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./mode-toggle"

export function MainNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Image src="/images/logo.png" alt="Bridgeocean Logo" width={40} height={40} className="h-8 w-auto" />
          <span className="font-bold text-xl">Bridgeocean</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/nexus" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Nexus Emergency Logistics
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Charter Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/charter"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Charter Services</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Premium car rental and charter services for all occasions
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/charter/book" title="Book a Ride">
                    Reserve your premium charter vehicle
                  </ListItem>
                  <ListItem href="/charter/fleet" title="Our Fleet">
                    Explore our premium vehicle collection
                  </ListItem>
                  <ListItem href="/charter/partner" title="Partner with Us">
                    Add your vehicles to our charter fleet
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>DriverPrep</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/driverprep"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">DriverPrep</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Internal driver management and onboarding system
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/dashboard" title="Dashboard">
                    Internal driver management system
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/admin/fleet"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Fleet Management</div>
                        <p className="text-sm leading-tight text-muted-foreground">Manage your charter vehicle fleet</p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/admin/fleet" title="Fleet Management">
                    Add and manage your charter vehicles
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
