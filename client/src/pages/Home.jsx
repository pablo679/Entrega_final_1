import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductDetail from '../components/ProductDetail';
import ContactForm from '../components/ContactForm';
import { useCart } from '../context/CartContext';
import { API_BASE } from '../config';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_BASE}/api/productos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al conectar con la API. Verifica que el backend esté funcionando.');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error('Error al obtener los productos:', fetchError);
        setError(fetchError.message);
        setLoading(false);
      });
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={(product) => addToCart(product)}
          onBack={handleBackToList}
        />
      ) : (
        <>
          <ProductList
            products={products}
            onSelectProduct={handleSelectProduct}
          />
          <ContactForm />
        </>
      )}
    </main>
  );
}

export default Home;
