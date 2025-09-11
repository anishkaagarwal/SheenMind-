"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, Users, Calendar, ClipboardList, BookOpen, MessageCircle, LayoutDashboard } from "lucide-react"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/peer-support", label: "Peer Support", icon: Users },
    { href: "/appointments", label: "Book Appointment", icon: Calendar },
    { href: "/assessment", label: "Take Assessment", icon: ClipboardList },
    { href: "/resources", label: "Resource Hub", icon: BookOpen },
    { href: "/about", label: "About", icon: Heart },
  ]

  const handleChatbotOpen = () => {
    setIsChatbotOpen(true)
    setIsOpen(false) // Close mobile menu if open
  }

  return (
    <>
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">SheenMind J&K</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <Button
                size="sm"
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                onClick={handleChatbotOpen}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                SheenConnect AI
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 border">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                <div className="px-3 py-2">
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleChatbotOpen}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    SheenConnect AI
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ChatbotWidget isOpenFromNav={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  )
}
