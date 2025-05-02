"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import friendsImage from '@/assets/friends.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const NewVersionModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedModalBefore')
    
    if (!hasVisitedBefore) {
      // If first visit, show the modal
      setIsOpen(true)
      // Set flag in localStorage to remember the user has seen the modal
      localStorage.setItem('hasVisitedModalBefore', 'true')
    }
  }, [])

  const handleVisitSite = () => {
    window.open('https://friends-tv.vercel.app/', '_blank')
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[70vw] p-0 overflow-hidden bg-black/90 border-gray-700">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-white">Check Out Our New Website!</DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            We've launched a new version with improved features and design.
          </DialogDescription>
          
        </DialogHeader>
        
        <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
          <Image
            src={friendsImage}
            alt="New Website Preview"
            className="object-cover object-top w-full h-full"
            priority
          />
        </div>
        
        <div className="p-6 pt-4 flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Maybe Later
          </Button>
          <Button 
            onClick={handleVisitSite}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Visit New Site
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewVersionModal
