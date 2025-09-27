'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Loader2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import Image from 'next/image'
import { generateResponse } from '@/lib/chatbot';
import { TerminalSearchInput } from '@/components/ui/terminal-search-input'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
// import { useChat } from 'ai/react' // Disabled for static export

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

  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const handleInputChange = (e: any) => setInput(e.target.value)
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!input.trim()) return
    
    // Add user message
    const userMessage = { id: Date.now().toString(), role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    
    // Simulate AI response for GitHub Pages demo
    setIsLoading(true);
    setError(null);


    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      const jsonMatch = data.response.match(/```json\s*\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : data.response;
    
      const jsonResponse = JSON.parse(jsonString);
 

      const botResponse = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: jsonResponse.response,
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      console.error('Error:', err);
      setError(err);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  }

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
      <motion.div
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 ${
          isOpen ? 'scale-0' : 'scale-100'
        } transition-all duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <LiquidButton
          onClick={() => setIsOpen(true)}
          size="lg"
          className="p-5 rounded-full shadow-2xl hover:shadow-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-purple-600/10 backdrop-blur-md hover:border-cyan-300/60 transition-all duration-300 hover:scale-105 cursor-target"
          style={{
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.1)'
          }}
        >
          <Image 
            src="/cosmo.svg" 
            alt="Cosmo AI Assistant" 
            width={32} 
            height={32} 
            className="w-8 h-8 drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))'
            }}
          />
        </LiquidButton>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-4 right-4 left-4 md:bottom-6 md:right-6 md:left-auto z-50 w-auto md:w-[480px] h-[80vh] md:h-[500px] max-h-[600px] bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-3 md:p-4 border-b border-light-border dark:border-dark-border bg-gradient-to-r from-primary-dark-blue to-primary-light-blue text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/cosmo.svg" 
                    alt="Cosmo AI Assistant" 
                    width={24} 
                    height={24} 
                    className="w-6 h-6"
                  />
                  <div>
                    <h3 className="font-semibold">Cosmo</h3>
                    <p className="text-xs opacity-90">Your Exoplanet Assistant</p>
                  </div>
                </div>
                <LiquidButton
                  onClick={() => setIsOpen(false)}
                  size="icon"
                  className="p-1 hover:bg-white/20 rounded-md cursor-target"
                >
                  <X className="h-5 w-5" />
                </LiquidButton>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Image 
                    src="/cosmo.svg" 
                    alt="Cosmo AI Assistant" 
                    width={64} 
                    height={64} 
                    className="h-16 w-16 mx-auto mb-4"
                  />
                  <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Welcome to Cosmo!
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
                      <LiquidButton
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        size="sm"
                        className="block w-full text-left text-xs p-2 bg-light-surface dark:bg-dark-surface hover:bg-light-hover dark:hover:bg-dark-hover rounded-md cursor-target"
                      >
                        {question}
                      </LiquidButton>
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
                    className={`max-w-[85%] md:max-w-[80%] p-2 md:p-3 rounded-lg text-sm md:text-base ${
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
                          <LiquidButton
                            onClick={() => copyMessage(message.content)}
                            size="icon"
                            className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary cursor-target"
                            title="Copy message"
                          >
                            <Copy className="h-3 w-3" />
                          </LiquidButton>
                          <LiquidButton
                            size="icon"
                            className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-green-500 cursor-target"
                            title="Helpful"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </LiquidButton>
                          <LiquidButton
                            size="icon"
                            className="p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 cursor-target"
                            title="Not helpful"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </LiquidButton>
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
                        Cosmo is thinking...
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
            <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-light-border dark:border-dark-border">
              <div className="flex gap-2">
                <TerminalSearchInput
                  value={input}
                  onChange={setInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e as any)
                    }
                  }}
                  placeholder="query ai about exoplanets --help"
                  user="ai"
                  host="assistant"
                  dir="/chat"
                  className="flex-1 text-xs md:text-sm"
                  disabled={isLoading}
                />
                <LiquidButton
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="p-2 bg-primary-dark-blue text-white rounded-md hover:bg-primary-very-dark-blue disabled:opacity-50 disabled:cursor-not-allowed cursor-target"
                >
                  <Send className="h-4 w-4" />
                </LiquidButton>
              </div>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2 hidden md:block">
                Powered by AI • May occasionally provide incorrect information
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
