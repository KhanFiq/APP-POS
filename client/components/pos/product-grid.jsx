'use client';

import { useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/pos/product-card';
import { products } from '@/data/products';

export default function ProductGrid({ 
  searchTerm, 
  setSearchTerm, 
  activeCategory, 
  setActiveCategory, 
  onAddToCart 
}) {
  // Filter produk berdasarkan pencarian dan kategori
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari produk..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Tabs Kategori */}
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
          <TabsTrigger 
            value="Snack" 
            onClick={() => setActiveCategory('Snack')}
          >
            Snack
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeCategory} className="flex-1 overflow-auto">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p>Tidak ada produk yang ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => onAddToCart(product)} 
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}