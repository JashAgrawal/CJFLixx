"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

const VersionBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 bg-black/80 backdrop-blur-md border-t border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-white text-sm md:text-base">
          Try our new latest version at{' '}
          <a 
            href="https://friends-tv.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline font-medium"
          >
            friends-tv.vercel.app
          </a>
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={() => setIsVisible(false)}
        >
          <X size={18} />
        </Button>
      </div>
    </div>
  )
}

export default VersionBanner
