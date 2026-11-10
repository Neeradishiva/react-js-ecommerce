import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/cartcontext';
import { useSnackbar } from 'notistack';

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p style={{ padding: '2rem' }}>Loading product details...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <Link to="/">&larr; Back to Products</Link>
      <h2>{product.name}</h2>
      <p><strong>ID:</strong> {product._id}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category || 'N/A'}</p>
      <p><strong>Description:</strong> {product.description || 'N/A'}</p>
      <p><strong>In Stock:</strong> {product.countInStock ?? 'Available'}</p>
      <button onClick={() => { addToCart(product); enqueueSnackbar('Added to cart!', { variant: 'success' }); }}>
        Add to Cart
      </button>
    </div>
  );
}