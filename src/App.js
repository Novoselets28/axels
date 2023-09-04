import React, { useState, useEffect } from 'react';
import './index.css';
import ProductItem from './ProductItem/ProductItem';

export default function App() {
  const [products, setProduct] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('https://62d92de95d893b27b2dfeae8.mockapi.io/products/all')
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.products);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [filter, products]);

  return (
    <div className="container">
      <h1 className="header">Products list</h1>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        {filteredProducts.map((product) => (
          <ProductItem key={product.asin} product={product} />
        ))}
      </div>
    </div>
  );
}
