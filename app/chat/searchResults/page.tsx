// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { SearchIcon, FilterIcon } from 'lucide-react';


// Sample product type
interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  image: string;
  description: string;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Modern Desk Chair",
    price: 199.99,
    material: "Leather",
    image: "/api/placeholder/300/200",
    description: "Ergonomic office chair with adjustable height and lumbar support."
  },
  {
    id: 2,
    name: "Wooden Coffee Table",
    price: 249.99,
    material: "Wood",
    image: "/api/placeholder/300/200",
    description: "Rustic wooden coffee table with storage shelf underneath."
  },
  {
    id: 3,
    name: "Scandinavian Sofa",
    price: 599.99,
    material: "Fabric",
    image: "/api/placeholder/300/200",
    description: "Minimalist three-seater sofa with oak legs and comfortable cushions."
  },
  {
    id: 4,
    name: "Metal Floor Lamp",
    price: 89.99,
    material: "Metal",
    image: "/api/placeholder/300/200",
    description: "Modern floor lamp with adjustable arm and dimmable LED light."
  },
  {
    id: 5,
    name: "Glass Dining Table",
    price: 399.99,
    material: "Glass",
    image: "/api/placeholder/300/200",
    description: "Elegant dining table with tempered glass top and stainless steel legs."
  },
  {
    id: 6,
    name: "Fabric Armchair",
    price: 299.99,
    material: "Fabric",
    image: "/api/placeholder/300/200",
    description: "Comfortable armchair with soft fabric upholstery and wooden legs."
  }
];

const Dashboard = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const router = useRouter();
  
  const materials = ["Wood", "Metal", "Glass", "Fabric", "Leather", "Plastic"];
  
  useEffect(() => {
    // Filter products based on search query and filters
    let results = [...mockProducts];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    results = results.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by materials
    if (selectedMaterials.length > 0) {
      results = results.filter(product => 
        selectedMaterials.includes(product.material)
      );
    }
    
    setFilteredProducts(results);
  }, [searchQuery, priceRange, selectedMaterials]);
  
  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };
  
  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedMaterials([]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <h1 className="text-2xl font-bold">Product Search</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative flex-1 hidden md:block max-w-md">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            </div>
            <Button 
              variant="outline" 
              className="md:hidden"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
            >
              <FilterIcon size={18} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <aside className={`w-full md:w-64 bg-white p-5 rounded-lg shadow-sm ${showMobileFilter ? 'block' : 'hidden md:block'}`}>
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
                Reset Filters
              </Button>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm text-slate-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <h4 className="font-medium mb-3">Materials</h4>
              <div className="space-y-2">
                {materials.map((material) => (
                  <div key={material} className="flex items-center">
                    <Checkbox
                      id={`material-${material}`}
                      checked={selectedMaterials.includes(material)}
                      onCheckedChange={() => toggleMaterial(material)}
                    />
                    <label
                      htmlFor={`material-${material}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {material}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Search */}
            <div className="relative mb-4 md:hidden">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            </div>

            {/* Search Info */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
              </h2>
              <p className="text-slate-500">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                <Card 
                    key={product.id} 
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/product/${product.id}`)}
                >
                    <div className="aspect-video w-full bg-slate-100">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <span className="font-bold text-blue-600">${product.price}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                        <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">
                        {product.material}
                        </span>
                        <Button size="sm" onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/product/${product.id}`);
                        }}>
                        View Details
                        </Button>
                    </div>
                    </div>
                </Card>
                ))}
            </div>
            ) : (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your search or filters</p>
            </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;