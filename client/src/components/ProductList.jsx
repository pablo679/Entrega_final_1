
import ProductCard from './ProductCard';

function ProductList({ products, onSelectProduct }) {
  return (
    <section className="catalog-section" id="productos">
        <div className="container">
            <div className="catalog-header">
                <h1>Nuestro Catálogo</h1>
            </div>
            <div className="products-grid">
                {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                />
                ))}
            </div>
        </div>
    </section>
  );
}

export default ProductList;
