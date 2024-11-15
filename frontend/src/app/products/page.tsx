// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProducts, Product } from '../actions';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');
  const router = useRouter()

  useEffect(() => {
    const fetchProductList = async () => {
      const data = await fetchProducts(query);
      setProducts(data);
    };
    fetchProductList();
  }, [query]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router])

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Description</th>
            <th className="p-2 border-b">Price</th>
            <th className="p-2 border-b">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center border-b">
              <td className="p-2">{product.id}</td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2">{product.price}</td>
              <td className="p-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
