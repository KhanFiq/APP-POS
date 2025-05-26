"use client"
import { Button } from '@/components/ui/button';
import { 
    ShoppingCart, Search, Plus, Minus, Trash2, CreditCard, 
    Wallet, Banknote, User, LogOut 
  } from 'lucide-react';

import React from 'react'

function header() {
  return (
    <header className="bg-white shadow-sm p-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <ShoppingCart className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-bold">POS</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <User className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium">Kasir</span>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </header>
  )
}

export default header