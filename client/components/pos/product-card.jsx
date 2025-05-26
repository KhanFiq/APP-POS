import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onAddToCart(product)}
    >
      <CardContent className="p-4 flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-200 rounded mb-3 overflow-hidden">
          <img 
            src={product.image || '/api/placeholder/80/80'} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/api/placeholder/80/80';
            }}
          />
        </div>
        <h3 className="font-medium text-center">{product.name}</h3>
        <p className="text-primary font-semibold">
          Rp {product.price.toLocaleString()}
        </p>
        <Badge variant="outline" className="mt-2">
          {product.category}
        </Badge>
      </CardContent>
    </Card>
  );
}