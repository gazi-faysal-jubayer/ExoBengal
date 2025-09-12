'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Loader2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useChat } from 'ai/react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "What makes a planet potentially habitable?",
  "How does the transit method work?",
  "Show me Earth-like exoplanets",
  "Generate Python code to analyze hot Jupiters",
  "Compare Kepler-452b to Earth",
  "What are the different detection methods?",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({
    api: '/api/chat',
    onResponse: () => setIsTyping(false),
    onError: () => setIsTyping(false),
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
    // Auto-submit the suggested question
    setTimeout(() => {
      const form = new FormData()
      form.append('message', question)
      handleSubmit(new Event('submit') as any)
    }, 100)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    // Could add a toast notification here
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    const formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-light-surface dark:bg-dark-surface px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-light-surface dark:bg-dark-surface p-3 rounded-md mt-2 mb-2 overflow-x-auto"><code>$1</code></pre>')
    
    return { __html: formatted }
  }

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-primary-reddish-orange to-semantic-warning text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <Sparkles className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-light-border dark:border-dark-border bg-gradient-to-r from-primary-dark-blue to-primary-light-blue text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">ExoBot</h3>
                    <p className="text-xs opacity-90">Your Exoplanet Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary-light-blue" />
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Welcome to ExoBot!
                  </h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    I&apos;m here to help you explore exoplanets, understand detection methods, and analyze data.
                  </p>
                  
                  {/* Suggested Questions */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      Try asking:
                    </p>
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="block w-full text-left text-xs p-2 bg-light-surface dark:bg-dark-surface hover:bg-light-hover dark:hover:bg-dark-hover rounded-md transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary-dark-blue text-white'
                        : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div>
                        <div 
                          className="text-sm"
                          dangerouslySetInnerHTML={formatMessage(message.content)}
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
                            title="Copy message"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <button
                            className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-green-500 transition-colors"
                            title="Helpful"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </button>
                          <button
                            className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 transition-colors"
                            title="Not helpful"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-light-surface dark:bg-dark-surface p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        ExoBot is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-start">
                  <div className="bg-semantic-error/10 border border-semantic-error/20 p-3 rounded-lg">
                    <p className="text-sm text-semantic-error">
                      Sorry, I encountered an error. Please try again.
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-light-border dark:border-dark-border">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about exoplanets..."
                  className="flex-1 input-base text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-primary-dark-blue text-white rounded-md hover:bg-primary-very-dark-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
                Powered by AI • May occasionally provide incorrect information
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
