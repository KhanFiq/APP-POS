"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, Search, Plus, Minus, Trash2, CreditCard, 
  Wallet, Banknote, User, LogOut 
} from 'lucide-react';

export default function POSMain() {
  // contoh doang state produk
  const [products, setProducts] = useState([
    { id: 1, name: 'Nasi Goreng', price: 25000, category: 'Makanan', image: '/api/placeholder/80/80' },
    { id: 2, name: 'Mie Goreng', price: 22000, category: 'Makanan', image: '/api/placeholder/80/80' },
    { id: 3, name: 'Es Teh', price: 8000, category: 'Minuman', image: '/api/placeholder/80/80' },
    { id: 4, name: 'Es Jeruk', price: 10000, category: 'Minuman', image: '/api/placeholder/80/80' },
    { id: 5, name: 'Ayam Goreng', price: 30000, category: 'Makanan', image: '/api/placeholder/80/80' },
    { id: 6, name: 'Soto Ayam', price: 28000, category: 'Makanan', image: '/api/placeholder/80/80' },
    { id: 7, name: 'Kopi Hitam', price: 12000, category: 'Minuman', image: '/api/placeholder/80/80' },
    { id: 8, name: 'Jus Alpukat', price: 15000, category: 'Minuman', image: '/api/placeholder/80/80' },
  ]);
  
  // cart
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [paymentMethod, setPaymentMethod] = useState(null);
  
  // tambah produk
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // ubah kuantitas di cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };
  
  // hapus produk dari keranjang
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  // hitung total belanja
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // filter produk by kategori nya
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  // proses checkout
  const handleCheckout = () => {
    if (!paymentMethod) {
      alert('Silakan pilih metode pembayaran terlebih dahulu!');
      return;
    }
    
    const orderDetails = {
      items: cart,
      total: calculateTotal(),
      paymentMethod: paymentMethod
    };
    
    alert(`Pesanan berhasil! Total: Rp ${calculateTotal().toLocaleString()} dibayar dengan ${paymentMethod}`);
    console.log('Order details:', orderDetails);
    setCart([]);
    setPaymentMethod(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
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
      
      <div className="flex flex-1 overflow-hidden">
        {/* Daftar Produk (Sisi Kiri) */}
        <div className="w-2/3 flex flex-col bg-white p-4 overflow-hidden">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari produk..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="Semua" className="flex-1 overflow-hidden">
            <TabsList className="mb-4">
              <TabsTrigger 
                value="Semua" 
                onClick={() => setActiveCategory('Semua')}
              >
                Semua
              </TabsTrigger>
              <TabsTrigger 
                value="Makanan" 
                onClick={() => setActiveCategory('Makanan')}
              >
                Makanan
              </TabsTrigger>
              <TabsTrigger 
                value="Minuman" 
                onClick={() => setActiveCategory('Minuman')}
              >
                Minuman
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="Semua" className="flex-1 overflow-auto">
              <div className="grid grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4 flex flex-col items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="mb-3 rounded"
                      />
                      <h3 className="font-medium text-center">{product.name}</h3>
                      <p className="text-primary font-semibold">
                        Rp {product.price.toLocaleString()}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {product.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="Makanan" className="flex-1 overflow-auto">
              <div className="grid grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4 flex flex-col items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="mb-3 rounded"
                      />
                      <h3 className="font-medium text-center">{product.name}</h3>
                      <p className="text-primary font-semibold">
                        Rp {product.price.toLocaleString()}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {product.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="Minuman" className="flex-1 overflow-auto">
              <div className="grid grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4 flex flex-col items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="mb-3 rounded"
                      />
                      <h3 className="font-medium text-center">{product.name}</h3>
                      <p className="text-primary font-semibold">
                        Rp {product.price.toLocaleString()}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {product.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Keranjang Belanja (Sisi Kanan) */}
        <div className="w-1/3 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          <Card className="flex-1 border-none rounded-none flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Keranjang
              </CardTitle>
            </CardHeader>
            
            <div className="flex-1 overflow-auto px-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingCart className="h-12 w-12 mb-2" />
                  <p>Keranjang masih kosong</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center p-2 border rounded">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 rounded mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-primary">
                          Rp {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t p-4">
              {/* Metode Pembayaran */}
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
              
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>Rp {calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>PPN (10%)</span>
                <span>Rp {(calculateTotal() * 0.1).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>Rp {(calculateTotal() * 1.1).toLocaleString()}</span>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                disabled={cart.length === 0 || !paymentMethod}
                onClick={handleCheckout}
              >
                Bayar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}