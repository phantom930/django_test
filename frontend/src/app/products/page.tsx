// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProducts, logout, Product } from '../../actions';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const router = useRouter()
  const token = localStorage.getItem('token');

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

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const sortProducts = (column: string) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);

    const sortedProducts = [...products].sort((a, b) => {
      const aValue = a[column as keyof Product];
      const bValue = b[column as keyof Product];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return newSortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return newSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    setProducts(sortedProducts);
  }

  return (
    <div className="container mx-auto p-4">
      {token && (
        <button
          className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 absolute top-4 right-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border-b cursor-pointer" onClick={() => sortProducts('id')}>
              ID {sortColumn === 'id' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => sortProducts('name')}>
              Name {sortColumn === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => sortProducts('description')}>
              Description {sortColumn === 'description' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => sortProducts('price')}>
              Price {sortColumn === 'price' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="p-2 border-b cursor-pointer" onClick={() => sortProducts('stock')}>
              Stock {sortColumn === 'stock' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
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
