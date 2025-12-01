import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMenu = () => setIsNavActive(false);

  const scrollToSection = (sectionId) => {
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 200);
    } else {
      doScroll();
    }
    closeMenu();
  };

  const goHome = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <button type="button" className="header-logo as-button" onClick={goHome}>
          <img src="/images/logo.svg" alt="Logo Hermanos Jota" /> 
          <span>Hermanos Jota</span>
        </button>

        <button 
          className="menu-toggle" 
          id="menu-toggle" 
          aria-label="Abrir menú"
          onClick={() => setIsNavActive(!isNavActive)} // Lógica para el menú móvil
        >
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
        </button>

        <nav className={`main-nav ${isNavActive ? 'is-active' : ''}`} id="main-nav">
          <ul>
            <li><button type="button" className="nav-link-btn" onClick={goHome}>Inicio</button></li>
            <li><button type="button" className="nav-link-btn" onClick={() => scrollToSection('productos')}>Productos</button></li>
            <li><button type="button" className="nav-link-btn" onClick={() => scrollToSection('contacto')}>Contacto</button></li>
            {isAuthenticated && (
              <>
                <li><Link to="/mis-pedidos" onClick={closeMenu}>Mis pedidos</Link></li>
                <li><Link to="/perfil" onClick={closeMenu}>Perfil</Link></li>
              </>
            )}
          </ul>
        </nav>
        
        <div className="header-actions">
          <div className="header-cart">
            <Link to="/carrito" onClick={closeMenu}>
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" strokeWidth="2" d="M12.5 21a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM5.5 21a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM3 3h2.25l2.452 12.26a1 1 0 0 0 .976.74h9.844a1 1 0 0 0 .976-.74L21 6H5.25"></path></svg>
              <span className="cart-counter" id="cart-counter">{itemCount}</span>
            </Link>
          </div>

          <div className="auth-links">
            {isAuthenticated ? (
              <>
              <span className="auth-user">Hola, {user?.name}</span>
                <Link to="/perfil" className="auth-button secondary" onClick={closeMenu}>Perfil</Link>
                <Link to="/mis-pedidos" className="auth-button secondary" onClick={closeMenu}>Mis pedidos</Link>
                <button type="button" className="auth-button" onClick={handleLogout}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-button secondary" onClick={closeMenu}>Login</Link>
                <Link to="/registro" className="auth-button" onClick={closeMenu}>Registro</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
