"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Users, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { io, type Socket } from "socket.io-client"

interface Message {
  id: string
  text: string
  timestamp: Date
  user: string
}

export default function CommunityChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [onlineUsers, setOnlineUsers] = useState(0)
  const socketRef = useRef<Socket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    const CHAT_WS_URL = process.env.NEXT_PUBLIC_CHAT_WS_URL || "ws://localhost:5000"
    const socket = io(CHAT_WS_URL, {
      transports: ['websocket'],
      withCredentials: false,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socket.on("connect", () => {
      setIsConnected(true)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socket.on("message", (msg: { text: string; user?: string; timestamp?: string } | string) => {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: typeof msg === "string" ? msg : msg.text,
        timestamp: typeof msg === "string" ? new Date() : (msg.timestamp ? new Date(msg.timestamp) : new Date()),
        user: typeof msg === "string" ? "Anonymous" : (msg.user || "Anonymous"),
      }
      setMessages((prev) => [...prev, newMsg])
    })

    socket.on("user_count", (count: number) => {
      setOnlineUsers(count)
    })

    socketRef.current = socket

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim() && socketRef.current && isConnected) {
      socketRef.current.emit("message", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          {onlineUsers > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {onlineUsers}
            </Badge>
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96"
          >
            <Card className="h-full bg-gray-900/95 border-gray-700 backdrop-blur-md shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-purple-400" />
                    Community Chat
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6 text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-gray-400">{isConnected ? "Connected" : "Disconnected"}</span>
                  {onlineUsers > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      <Users className="h-3 w-3 mr-1" />
                      {onlineUsers}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-full pb-4">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
                  {!isConnected && (
                    <div className="text-center text-gray-400 text-sm py-4">
                      <p>Chat server is offline</p>
                      <p className="text-xs mt-1">Start the Flask server to enable chat</p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800/50 rounded-lg p-2"
                    >
                      <div className="text-sm text-gray-300">{message.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={isConnected ? "Type a message..." : "Chat offline"}
                    disabled={!isConnected}
                    className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!isConnected || !newMessage.trim()}
                    size="icon"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
