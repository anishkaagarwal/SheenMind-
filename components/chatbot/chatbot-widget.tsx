"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Minimize2, Wifi, WifiOff, Phone, Maximize2 } from "lucide-react"
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

interface ChatbotWidgetProps {
  isOpenFromNav?: boolean
  onClose?: () => void
}

export function ChatbotWidget({ isOpenFromNav = false, onClose }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(isOpenFromNav)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Namaste! I'm SheenConnect, your 24/7 mental health companion for J&K students. I work even with low bandwidth and can help you access government crisis helplines, TeleManas services, and local support. How can I support you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  useEffect(() => {
    setIsOpen(isOpenFromNav)
  }, [isOpenFromNav])

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
      return `🚨 IMMEDIATE HELP AVAILABLE:

📞 TeleManas (Govt): 14416
📞 Suicide Prevention: 9152987821
📞 KIRAN Helpline: 1800-599-0019
📞 Emergency Services: 112
📞 J&K Police Helpline: 0194-2440040

You can also SMS "HELP" to 9419018073 for immediate callback. You matter and help is available 24/7.`
    }

    if (input.includes("telemanas") || input.includes("government") || input.includes("govt")) {
      return `TeleManas is the Government of India's mental health helpline:

📞 Call: 14416 (24/7 Free)
🌐 Available in Hindi, English & regional languages
📱 SMS support available
🏥 Can connect you to nearest govt mental health facility

Would you like me to help you prepare for the call or provide more government mental health schemes?`
    }

    if (input.includes("sms") || input.includes("reminder") || input.includes("notification")) {
      return `📱 SMS Services (No internet needed):

• Daily wellness check-ins
• Appointment reminders
• Medication alerts
• Crisis support numbers
• Breathing exercise prompts

SMS "START" to 9419018073 to activate. Works even when internet is down in remote J&K areas. Would you like to set up specific reminders?`
    }

    if (input.includes("offline") || input.includes("bandwidth") || input.includes("internet")) {
      return `📶 Low Bandwidth Features:

✅ Offline chatbot responses (cached)
✅ SMS-based support system
✅ Downloadable audio meditations
✅ Text-only resource guides
✅ Emergency contacts saved locally

Your wellness data syncs when connection returns. SheenConnect works for you even in remote J&K areas!`
    }

    if (input.includes("anxious") || input.includes("anxiety")) {
      return `I understand anxiety can be overwhelming. Here's immediate help:

🫁 Try 4-7-8 breathing (works offline)
📱 SMS "BREATHE" to 9419018073 for guided audio
👥 Connect with J&K peer mentors
📞 TeleManas: 14416 for professional support

Would you like me to guide you through a quick breathing exercise or connect you with local support?`
    }

    if (input.includes("mentor") || input.includes("peer") || input.includes("student")) {
      return `👥 J&K Student Peer Support:

• Connect with mentors from your region
• Language support (Hindi, Urdu, Kashmiri, Dogri)
• Cultural understanding of local challenges
• Available via chat, call, or SMS

Our peer mentors understand the unique challenges of studying in J&K. Would you like to browse mentors or get matched automatically?`
    }

    return `Thank you for reaching out to SheenConnect. Every feeling is valid, and seeking support shows courage.

🏥 Government Support: TeleManas 14416
👥 Peer Mentors: Available 24/7
📱 SMS Support: Works without internet
🧘 Wellness Tools: Downloadable for offline use

What type of support would help you most right now?`
  }

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply)
    handleSendMessage()
  }

  const handleClose = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full h-16 w-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 hover:scale-105"
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
          <Badge
            variant={isOnline ? "default" : "secondary"}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center animate-pulse"
          >
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          </Badge>
          <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>
        </div>
      </div>
    )
  }

  const chatWidth = isMaximized ? "w-[90vw] max-w-4xl" : "w-96"
  const chatHeight = isMinimized ? "h-16" : isMaximized ? "h-[80vh]" : "h-[500px]"

  return (
    <div
      className={`fixed ${isMaximized ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" : "bottom-6 right-6"} z-50`}
    >
      <Card className={`${chatWidth} ${chatHeight} shadow-2xl transition-all duration-300 border-2 border-blue-200`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarFallback className="bg-white text-blue-600 text-sm font-bold">SC</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base font-bold text-white">SheenConnect</CardTitle>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-blue-100">J&K Mental Health AI Assistant</p>
                  {isOnline ? (
                    <Wifi className="h-3 w-3 text-green-300" />
                  ) : (
                    <WifiOff className="h-3 w-3 text-orange-300" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => window.open("tel:14416")}
                className="text-white hover:bg-white/20"
              >
                <Phone className="h-4 w-4 text-red-300" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-white hover:bg-white/20"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleClose} className="text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col" style={{ height: isMaximized ? "calc(80vh - 80px)" : "420px" }}>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 border border-gray-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="space-y-3 mt-4">
                    <p className="text-sm font-medium text-gray-600">Quick support options:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickReplies.map((reply) => (
                        <Button
                          key={reply}
                          size="sm"
                          variant="outline"
                          className="text-sm h-auto py-3 px-4 justify-start bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800"
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
            <div className="p-4 border-t bg-gray-50">
              <div className="flex space-x-3">
                <Input
                  placeholder={isOnline ? "Type your message..." : "Offline mode - basic responses available"}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 text-base py-3 border-gray-300 focus:border-blue-500"
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-500">
                  {isOnline ? "🟢 Online | TeleManas: 14416" : "🟡 Offline | SMS: 9419018073"}
                </p>
                <p className="text-xs text-gray-400">Emergency: 112</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
