import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: 'T-Shirt', price: 20 },
  { id: 2, name: 'Jeans', price: 40 },
  { id: 3, name: 'Sneakers', price: 60 },
];

export default function ProductList({ onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <Card key={product.id}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <Button className="mt-2" onClick={() => onAddToCart(product)}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
