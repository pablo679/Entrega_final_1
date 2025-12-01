# Casa Jota Digital – E-commerce Full-Stack

Aplicación completa (frontend + backend) para Hermanos Jota: catálogo, autenticación con JWT, carrito persistente en memoria de cliente, pedidos protegidos y despliegue en la nube.

## Enlaces de despliegue
- Repositorio: https://github.com/pablo679/Entrega_-consigna-7.git
- Frontend (Vercel/Netlify): **[pendiente de publicar]**
- Backend (Render): **[pendiente de publicar]**

## Arquitectura breve
- Monorepo con `/client` (React + Vite) y `/backend` (Express + MongoDB/Mongoose).
- Auth con JWT: registro/login, middleware `authMiddleware` para validar `Authorization: Bearer`.
- Carrito en `CartContext`, accesible en toda la app; checkout crea pedidos protegidos.
- Endpoints principales:
  - `POST /api/auth/register` y `POST /api/auth/login`
  - `GET /api/productos`
  - `GET/POST /api/pedidos` (alias `/api/orders`), protegidos.

## Tecnologías
- Frontend: React 19, React Router, Vite, CSS.
- Backend: Node.js, Express, Mongoose, JWT, bcrypt.
- Infra: MongoDB Atlas, Render (API), Vercel/Netlify (SPA).

## Correr en local
1) Clonar repo  
`git clone https://github.com/pablo679/Entrega_-consigna-7.git`

2) Backend  
```bash
cd backend
npm install
cp .env.example .env # o crear manualmente
# .env: MONGODB_URI=..., JWT_SECRET=..., CLIENT_URL=http://localhost:5173
npm run dev
```

3) Frontend  
```bash
cd client
npm install
# .env.local: VITE_API_URL=http://localhost:3001
npm run dev
```

4) Navegar a `http://localhost:5173`

## Despliegue
- Backend en Render: build `npm install`, start `npm start`, env vars `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` (URL del frontend).
- Frontend en Vercel/Netlify: build `npm run build`, output `dist`, env `VITE_API_URL=https://<tu-api>.onrender.com`.
- Base de datos: MongoDB Atlas con IP whitelist y usuario/password usados en `MONGODB_URI`.

## Créditos
Camila Maturano · Eduardo Benjamin Lopez Avila · Lautaro Sebastian Mambrin · Pablo Méndez
