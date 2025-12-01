import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

function AddToCartToast() {
  const { lastAdded, clearLastAdded } = useCart();

  useEffect(() => {
    if (!lastAdded) return undefined;
    const timer = setTimeout(() => clearLastAdded(), 1800);
    return () => clearTimeout(timer);
  }, [lastAdded, clearLastAdded]);

  if (!lastAdded) return null;

  return (
    <div className="cart-toast">
      <span className="cart-toast-dot" />
      <div className="cart-toast-text">
        <strong>{lastAdded.name}</strong> añadido al carrito
      </div>
    </div>
  );
}

export default AddToCartToast;
