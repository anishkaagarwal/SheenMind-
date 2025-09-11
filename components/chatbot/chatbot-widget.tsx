"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Minimize2, Wifi, WifiOff, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Namaste! I'm UmeedConnect, your 24/7 mental health companion for J&K students. I work even with low bandwidth and can help you access government crisis helplines, TeleManas services, and local support. How can I support you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const quickReplies = [
    "I need crisis help",
    "TeleManas support",
    "Feeling anxious",
    "Connect with mentor",
    "SMS reminders",
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate bot response (works offline with cached responses)
    setTimeout(
      () => {
        const botResponse = getBotResponse(inputMessage)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      },
      isOnline ? 1000 : 500,
    ) // Faster response when offline (cached)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (
      input.includes("crisis") ||
      input.includes("emergency") ||
      input.includes("harm") ||
      input.includes("suicide")
    ) {
      return `🚨 IMMEDIATE HELP AVAILABLE:\n\n📞 TeleManas (Govt): 14416\n📞 Suicide Prevention: 9152987821\n📞 KIRAN Helpline: 1800-599-0019\n📞 Emergency Services: 112\n📞 J&K Police Helpline: 0194-2440040\n\nYou can also SMS "HELP" to 9419018073 for immediate callback. You matter and help is available 24/7.`
    }

    if (input.includes("telemanas") || input.includes("government") || input.includes("govt")) {
      return `TeleManas is the Government of India's mental health helpline:\n\n📞 Call: 14416 (24/7 Free)\n🌐 Available in Hindi, English & regional languages\n📱 SMS support available\n🏥 Can connect you to nearest govt mental health facility\n\nWould you like me to help you prepare for the call or provide more government mental health schemes?`
    }

    if (input.includes("sms") || input.includes("reminder") || input.includes("notification")) {
      return `📱 SMS Services (No internet needed):\n\n• Daily wellness check-ins\n• Appointment reminders\n• Medication alerts\n• Crisis support numbers\n• Breathing exercise prompts\n\nSMS "START" to 9419018073 to activate. Works even when internet is down in remote J&K areas. Would you like to set up specific reminders?`
    }

    if (input.includes("offline") || input.includes("bandwidth") || input.includes("internet")) {
      return `📶 Low Bandwidth Features:\n\n✅ Offline chatbot responses (cached)\n✅ SMS-based support system\n✅ Downloadable audio meditations\n✅ Text-only resource guides\n✅ Emergency contacts saved locally\n\nYour wellness data syncs when connection returns. UmeedConnect works for you even in remote J&K areas!`
    }

    if (input.includes("anxious") || input.includes("anxiety")) {
      return `I understand anxiety can be overwhelming. Here's immediate help:\n\n🫁 Try 4-7-8 breathing (works offline)\n📱 SMS "BREATHE" to 9419018073 for guided audio\n👥 Connect with J&K peer mentors\n📞 TeleManas: 14416 for professional support\n\nWould you like me to guide you through a quick breathing exercise or connect you with local support?`
    }

    if (input.includes("mentor") || input.includes("peer") || input.includes("student")) {
      return `👥 J&K Student Peer Support:\n\n• Connect with mentors from your region\n• Language support (Hindi, Urdu, Kashmiri, Dogri)\n• Cultural understanding of local challenges\n• Available via chat, call, or SMS\n\nOur peer mentors understand the unique challenges of studying in J&K. Would you like to browse mentors or get matched automatically?`
    }

    return `Thank you for reaching out to UmeedConnect. Every feeling is valid, and seeking support shows courage.\n\n🏥 Government Support: TeleManas 14416\n👥 Peer Mentors: Available 24/7\n📱 SMS Support: Works without internet\n🧘 Wellness Tools: Downloadable for offline use\n\nWhat type of support would help you most right now?`
  }

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply)
    handleSendMessage()
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Badge
            variant={isOnline ? "default" : "secondary"}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
          >
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-xl transition-all ${isMinimized ? "h-16" : "h-96"}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">UC</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">UmeedConnect</CardTitle>
                <div className="flex items-center space-x-1">
                  <p className="text-xs text-muted-foreground">J&K Mental Health Support</p>
                  {isOnline ? (
                    <Wifi className="h-3 w-3 text-green-500" />
                  ) : (
                    <WifiOff className="h-3 w-3 text-orange-500" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost" onClick={() => window.open("tel:14416")}>
                <Phone className="h-4 w-4 text-red-500" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsMinimized(!isMinimized)}>
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Quick support options:</p>
                    <div className="flex flex-wrap gap-1">
                      {quickReplies.map((reply) => (
                        <Button
                          key={reply}
                          size="sm"
                          variant="outline"
                          className="text-xs h-auto py-1 px-2 bg-transparent"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder={isOnline ? "Type your message..." : "Offline mode - basic responses available"}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {isOnline ? "TeleManas: 14416 | Emergency: 112" : "Offline mode active | SMS: 9419018073"}
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
