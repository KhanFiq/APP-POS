'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Wallet, Banknote } from 'lucide-react';
import CartItem from '@/components/pos/cart-item';
import PaymentMethods from '@/components/pos/payment-methods';

export default function Cart({ 
  items, 
  updateQuantity, 
  removeItem, 
  paymentMethod, 
  setPaymentMethod, 
  onCheckout 
}) {

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  

  const tax = subtotal * 0.1;
  

  const total = subtotal + tax;

  
  return (
    <Card className="h-full border-none rounded-none flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Keranjang
        </CardTitle>
      </CardHeader>
      
      <div className="flex-1 overflow-auto px-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <ShoppingCart className="h-12 w-12 mb-2" />
            <p>Keranjang masih kosong</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
    
        <PaymentMethods 
          selectedMethod={paymentMethod}
          onSelectMethod={setPaymentMethod}
        />
        

        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>PPN (10%)</span>
            <span>Rp {tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
        </div>
        
   
        <Button 
          className="w-full" 
          size="lg"
          disabled={items.length === 0 || !paymentMethod}
          onClick={onCheckout}
        >
          Bayar
        </Button>
      </div>
    </Card>
  );
}