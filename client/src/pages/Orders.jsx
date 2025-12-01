import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../config';

function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [statusMap, setStatusMap] = useState({});

  const statusSteps = ['recibido', 'alistando', 'en_ruta', 'entregado'];

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/pedidos`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener pedidos.');
      }

      setOrders(data);
      // pedidos históricos se marcan como entregados para el tracker
      const delivered = {};
      data.forEach((order) => { delivered[order._id] = statusSteps.length - 1; });
      setStatusMap(delivered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const advanceStatus = (orderId, currentStep = 0) => {
    const nextStep = Math.min(currentStep + 1, statusSteps.length - 1);
    setStatusMap((prev) => ({ ...prev, [orderId]: nextStep }));
    if (nextStep < statusSteps.length - 1) {
      setTimeout(() => advanceStatus(orderId, nextStep), 2500);
    }
  };

  const createOrder = async () => {
    setCreating(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [{ name: 'Pedido generado desde la UI', quantity: 1 }],
          total: Math.floor(Math.random() * 50000) + 10000,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'No se pudo crear el pedido.');
      }

      setOrders((prev) => [data, ...prev]);
      // inicia tracker tipo "Rappi"
      setStatusMap((prev) => ({ ...prev, [data._id]: 0 }));
      advanceStatus(data._id, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const latestOrder = orders[0];
  const latestStatus = latestOrder ? statusMap[latestOrder._id] ?? statusSteps.length - 1 : null;

  return (
    <main className="auth-container">
      <section className="auth-card">
        <div className="orders-header">
          <div>
            <h1>Mis pedidos</h1>
            <p>Consulta y crea pedidos protegidos.</p>
          </div>
          <button type="button" onClick={createOrder} disabled={creating}>
            {creating ? 'Creando...' : 'Crear pedido'}
          </button>
        </div>

        {error && <div className="auth-error" style={{ marginTop: '1rem' }}>{error}</div>}

        {loading ? (
          <p>Cargando pedidos...</p>
        ) : orders.length === 0 ? (
          <p>Aún no tienes pedidos.</p>
        ) : (
          <>
            {latestOrder && (
              <div className="order-tracker">
                <div className="tracker-header">
                  <div>
                    <div className="tracker-label">Seguimiento en vivo</div>
                    <div className="tracker-id">Pedido {latestOrder._id.slice(-6)}</div>
                  </div>
                  <div className="tracker-status">{statusSteps[latestStatus] || 'entregado'}</div>
                </div>
                <div className="tracker-steps">
                  {statusSteps.map((step, idx) => {
                    const isActive = latestStatus >= idx;
                    const isCurrent = latestStatus === idx;
                    return (
                      <div key={step} className={`tracker-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                        <div className="tracker-dot" />
                        <span>{step.replace('_', ' ')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <ul className="orders-list">
              {orders.map((order) => (
                <li key={order._id} className="order-item">
                  <div>
                    <strong>Pedido:</strong> {order._id}
                    <div className="order-date">{new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <strong>Items:</strong> {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                  </div>
                  <div>
                    <strong>Total:</strong> ${order.total}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}

export default Orders;
