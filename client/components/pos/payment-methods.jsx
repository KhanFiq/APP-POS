"use client"
import { 
  ShoppingCart, Search, Plus, Minus, Trash2, CreditCard, 
  Wallet, Banknote, User, LogOut 
} from 'lucide-react'


import React from 'react'

function paymentMethod() {
  return (
    <div className="mb-4">
    <h3 className="text-sm font-semibold mb-2">Metode Pembayaran</h3>
    <div className="grid grid-cols-3 gap-2">
      <div 
        className={`border rounded p-2 flex flex-col items-center cursor-pointer transition-colors ${paymentMethod === 'Tunai' ? 'bg-primary/10 border-primary' : ''}`}
        onClick={() => setPaymentMethod('Tunai')}
      >
        <Banknote className={`h-5 w-5 mb-1 ${paymentMethod === 'Tunai' ? 'text-primary' : 'text-gray-500'}`} />
        <span className="text-xs">Tunai</span>
      </div>
      <div 
        className={`border rounded p-2 flex flex-col items-center cursor-pointer transition-colors ${paymentMethod === 'Kartu Kredit' ? 'bg-primary/10 border-primary' : ''}`}
        onClick={() => setPaymentMethod('Kartu Kredit')}
      >
        <CreditCard className={`h-5 w-5 mb-1 ${paymentMethod === 'Kartu Kredit' ? 'text-primary' : 'text-gray-500'}`} />
        <span className="text-xs">Kartu</span>
      </div>
      <div 
        className={`border rounded p-2 flex flex-col items-center cursor-pointer transition-colors ${paymentMethod === 'E-Wallet' ? 'bg-primary/10 border-primary' : ''}`}
        onClick={() => setPaymentMethod('E-Wallet')}
      >
        <Wallet className={`h-5 w-5 mb-1 ${paymentMethod === 'E-Wallet' ? 'text-primary' : 'text-gray-500'}`} />
        <span className="text-xs">E-Wallet</span>
      </div>
    </div>
  </div>
  )
}

export default paymentMethod