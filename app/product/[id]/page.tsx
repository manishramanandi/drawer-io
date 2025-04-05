// app/product/[id]/page.tsx
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Box, QrCode, ShoppingCart, CreditCard, Star } from 'lucide-react';
import ProductViewer from '@/components/productViewer';

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  image: string;
  description: string;
  color: string;
  modelPath?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  details: {
    dimensions: string;
    weight: string;
    warranty: string;
  };
}

// Mock products data - expanded from dashboard page
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Modern Desk Chair",
    price: 199.99,
    material: "Leather",
    image: "/api/placeholder/400/400",
    description: "Ergonomic office chair with adjustable height and lumbar support. Designed for comfort during long work sessions.",
    color: "Black",
    modelPath: "/models/chair.glb", // This would be your actual model path
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    details: {
      dimensions: "26\"W x 26\"D x 38-42\"H",
      weight: "35 lbs",
      warranty: "2 years"
    }
  },
  {
    id: 2,
    name: "Wooden Coffee Table",
    price: 249.99,
    material: "Wood",
    image: "/api/placeholder/400/400",
    description: "Rustic wooden coffee table with storage shelf underneath. Perfect centerpiece for any living room.",
    color: "Oak",
    modelPath: "/models/table.glb",
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    details: {
      dimensions: "48\"L x 24\"W x 18\"H",
      weight: "42 lbs",
      warranty: "1 year"
    }
  },
  {
    id: 3,
    name: "Scandinavian Sofa",
    price: 599.99,
    material: "Fabric",
    image: "/api/placeholder/400/400",
    description: "Minimalist three-seater sofa with oak legs and comfortable cushions. Scandinavian design that fits any modern home.",
    color: "Light Gray",
    modelPath: "/models/sofa.glb",
    rating: 4.8,
    reviewCount: 213,
    inStock: false,
    details: {
      dimensions: "78\"W x 33\"D x 32\"H",
      weight: "115 lbs",
      warranty: "3 years"
    }
  },
  {
    id: 4,
    name: "Metal Floor Lamp",
    price: 89.99,
    material: "Metal",
    image: "/api/placeholder/400/400",
    description: "Modern floor lamp with adjustable arm and dimmable LED light. Energy efficient with customizable brightness.",
    color: "Brushed Nickel",
    modelPath: "/models/lamp.glb",
    rating: 4.0,
    reviewCount: 67,
    inStock: true,
    details: {
      dimensions: "10\"D x 60\"H",
      weight: "12 lbs",
      warranty: "1 year"
    }
  }
];

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');

  useEffect(() => {
    // Fetch product by ID from mock data
    const foundProduct = mockProducts.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find similar products (same material or similar price range)
      const similar = mockProducts.filter(p => 
        p.id !== productId && 
        (p.material === foundProduct.material || 
         Math.abs(p.price - foundProduct.price) < 100)
      ).slice(0, 3);
      
      setSimilarProducts(similar);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with back button */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>Back to Products</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - 3D Model Viewer */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-square relative">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-slate-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>}>
                {/* <ProductViewer modelPath={product.modelPath || ''} /> */}
              </Suspense>
            </div>
            <div className="p-4 flex justify-between items-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Box size={16} />
                <span>Rotate Model</span>
              </Button>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
                <QrCode size={16} />
                <span>View in AR</span>
              </Button>
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className="flex flex-col">
            <div>
              {/* Basic Info */}
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-slate-800">{product.name}</h1>
                  <div className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</div>
                </div>
                
                <div className="flex items-center mt-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-slate-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                
                <p className="text-slate-600">{product.description}</p>
              </div>

              {/* Product Specifications */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-slate-500">Material</span>
                    <p className="font-medium">{product.material}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Color</span>
                    <p className="font-medium">{product.color}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Dimensions</span>
                    <p className="font-medium">{product.details.dimensions}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500">Weight</span>
                    <p className="font-medium">{product.details.weight}</p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <span className={`${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-3 py-1 rounded-full text-sm font-medium`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Payment Section */}
              <div className="mt-auto">
                <Separator className="my-6" />
                <h3 className="font-semibold text-lg mb-4">Payment Options</h3>
                
                <Tabs defaultValue="card" className="mb-6" onValueChange={setSelectedPaymentMethod}>
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="mt-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard size={20} />
                        <span>Pay with credit or debit card</span>
                      </div>
                      <p className="text-sm text-slate-500">
                        Secure payment processed by Stripe
                      </p>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="paypal" className="mt-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-blue-800">Pay</span>
                        <span className="font-bold text-blue-600">Pal</span>
                      </div>
                      <p className="text-sm text-slate-500">
                        Quick checkout with your PayPal account
                      </p>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="apple" className="mt-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold">Apple Pay</span>
                      </div>
                      <p className="text-sm text-slate-500">
                        Fast and secure checkout with Apple Pay
                      </p>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                {/* Total and Purchase Button */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-slate-500">Total:</p>
                      <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                    </div>
                    <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Purchase Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" 
                onClick={() => router.push(`/product/${product.id}`)}>
                <div className="aspect-square w-full bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <span className="font-bold text-blue-600">${product.price}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {product.material}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;