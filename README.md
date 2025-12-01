# Entrega Final – Hermanos Jota (Full-Stack)

Aplicación e‑commerce con frontend React/Vite y backend Express/MongoDB. Incluye autenticación JWT, carrito de compras, creación de pedidos protegidos y seguimiento visual de pedidos.

## Enlaces de despliegue
- Repositorio: https://github.com/pablo679/final_1.git
- Frontend (Vercel/Netlify): _pendiente de publicar_
- Backend (Render): _pendiente de publicar_

## Arquitectura breve
- Monorepo: `/client` (SPA React + Vite) y `/backend` (API REST Express + Mongoose).
- Auth: registro/login (`/api/auth`), middleware JWT (`authMiddleware`) para rutas protegidas.
- Catálogo: `/api/productos` y consumo desde Home.
- Carrito/Pedidos: `CartContext` global; checkout envía `POST /api/pedidos` (alias `/api/orders`) con JWT; seguimiento tipo “Rappi” en `/mis-pedidos`.

## Tecnologías principales
- Frontend: React 19, React Router, Vite, CSS.
- Backend: Node.js, Express, Mongoose, JWT, bcrypt.
- Infra prevista: MongoDB Atlas, Render (API), Vercel/Netlify (SPA).

## Ejecución local
1) Clonar o descomprimir el proyecto.
2) Backend  
```bash
cd backend
npm install
# crear backend/.env con:
# MONGODB_URI=<tu URI de Atlas>
# JWT_SECRET=<clave>
# CLIENT_URL=http://localhost:5173
npm run dev
```
3) Frontend  
```bash
cd client
npm install
# crear client/.env.local con:
# VITE_API_URL=http://localhost:3001
npm run dev
```
4) Abrir `http://localhost:5173`

## Despliegue
- Backend en Render: build `npm install`, start `npm start`, env `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL=<URL frontend>`.
- Frontend en Vercel/Netlify: build `npm run build`, output `dist`, env `VITE_API_URL=<URL pública del backend>`.

## Créditos
Camila Maturano · Eduardo Benjamin Lopez Avila · Lautaro Sebastian Mambrin · Pablo Méndez
