import { useContext } from 'react';
import { CartContext } from '../context/cartcontext';
import { useSnackbar } from 'notistack';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { enqueueSnackbar } = useSnackbar();

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <button onClick={() => { clearCart(); enqueueSnackbar('Cart cleared!', { variant: 'info' }); }} style={{ marginBottom: '1rem' }}>
            Clear All
          </button>
          {cart.map((item) => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '0.5rem 0', alignItems: 'center' }}>
              <div>
                <h4>{item.name}</h4>
                <p>${item.price} x {item.quantity || 1}</p>
              </div>
              <button onClick={() => { removeFromCart(item._id); enqueueSnackbar('Item removed', { variant: 'warning' }); }}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}