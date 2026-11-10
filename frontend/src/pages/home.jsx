import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartcontext';
import { useSnackbar } from 'notistack';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { addToCart } = useContext(CartContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get('https://ecommerce-backend-ui5e.onrender.com/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    enqueueSnackbar(`${product.name} added to cart!`, { variant: 'success' });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search products by title or name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: '400px', marginBottom: '1.5rem' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {filteredProducts.map((p) => (
          <div key={p._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '6px' }}>
            <h3>{p.name}</h3>
            <p><strong>Price:</strong> ${p.price}</p>
            <p><strong>Category:</strong> {p.category || 'General'}</p>
            <p><strong>Description:</strong> {p.description || 'N/A'}</p>
            <p><strong>In Stock:</strong> {p.countInStock ?? 'Available'}</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <Link to={`/details/${p._id}`}>
                <button>View Details</button>
              </Link>
              <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}