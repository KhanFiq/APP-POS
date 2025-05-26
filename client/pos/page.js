'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/pos/header';
import ProductGrid from '@/components/pos/product-grid';
import Cart from '@/components/pos/cart';
import { useCart } from '@/hooks/use-cart';

export default function POSPage() {
  const router = useRouter();
  const { items, addItem, updateQuantity, removeItem, clearCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [paymentMethod, setPaymentMethod] = useState(null);
  
  // Cek autentikasi user
  useEffect(() => {
    const user = localStorage.getItem('posUser');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert('Silakan pilih metode pembayaran terlebih dahulu!');
      return;
    }
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    alert(`Pesanan berhasil! Total: Rp ${total.toLocaleString()} dibayar dengan ${paymentMethod}`);
    // Reset keranjang
    clearCart();
    setPaymentMethod(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sisi Kiri - Produk */}
        <div className="w-2/3 bg-white p-4 overflow-hidden">
          <ProductGrid 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onAddToCart={addItem}
          />
        </div>
        
        {/* Sisi Kanan - Keranjang */}
        <div className="w-1/3 bg-white border-l border-gray-200">
          <Cart 
            items={items}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}