'use client';

import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Monitor',
    description: '24" Full HD LED monitor with ultra-slim design.',
    price: 149.99,
    image: 'https://source.unsplash.com/featured/?monitor',
  },
  {
    id: 2,
    name: 'Smart TV',
    description: '50" 4K UHD Smart TV with built-in apps.',
    price: 499.99,
    image: 'https://source.unsplash.com/featured/?tv',
  },
  {
    id: 3,
    name: 'Refrigerator',
    description: 'Double door fridge with inverter technology.',
    price: 799.99,
    image: 'https://source.unsplash.com/featured/?refrigerator',
  },
  {
    id: 4,
    name: 'Vacuum Cleaner',
    description: 'Portable and powerful vacuum cleaner.',
    price: 129.99,
    image: 'https://source.unsplash.com/featured/?vacuum',
  },
];

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilter = () => {
    const filtered = products.filter((product) => product.price < 500);
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Filter Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Electronics</h2>
        <button
          onClick={handleFilter}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
        >
          Filter Under $500
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
