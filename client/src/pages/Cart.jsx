import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config';

function Cart() {
  const { items, total, removeFromCart, clearCart } = useCart();
  const { token, isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(null);
  }, [items]);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo finalizar la compra.');
      }

      clearCart();
      alert('Compra realizada con éxito.');
      navigate('/mis-pedidos');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <section className="auth-card">
        <h1>Carrito de compras</h1>
        <p>Revisa tus productos antes de finalizar.</p>

        {items.length === 0 ? (
          <p>No tienes productos en el carrito.</p>
        ) : (
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <div className="cart-qty">Cantidad: {item.quantity}</div>
                  <div className="cart-price">
                    {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price * item.quantity)}
                  </div>
                </div>
                <button type="button" onClick={() => removeFromCart(item.id)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-total">
          <strong>Total:</strong>{' '}
          {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(total)}
        </div>

        {error && <div className="auth-error" style={{ marginTop: '1rem' }}>{error}</div>}

        <div className="cart-actions">
          <button type="button" onClick={clearCart} disabled={!items.length}>
            Vaciar carrito
          </button>
          <button type="button" onClick={handleCheckout} disabled={!items.length || loading}>
            {loading ? 'Procesando...' : 'Finalizar compra'}
          </button>
        </div>
      </section>
    </main>
  );
}

export default Cart;
