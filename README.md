# RevoShop 🛍️

An e-commerce web application built with Next.js featuring authentication, shopping cart, checkout, and an admin dashboard for product management. Part of the RevoU Full Stack Software Engineering program (Module 5 Assignment).

## 🌐 Live Demo

🔗 [https://rynbelibeli.vercel.app](https://rynbelibeli.vercel.app)

## ✨ Features

### Core
- **Product Listing** — Browse products in a responsive grid layout fetched from REST API
- **Product Detail** — View detailed product information with dynamic routing
- **Responsive Design** — Mobile-friendly layout with Tailwind CSS
- **Promotion Page** — Current deals and special offers
- **FAQ Page** — Accordion-style frequently asked questions

### Authentication & Authorization
- **Login System** — JWT-based authentication via Platzi Fake Store API
- **Route Protection** — Next.js Middleware (proxy) restricts access to `/checkout` and `/admin` routes
- **Persistent Auth** — Token stored in localStorage + cookies, validated on page refresh
- **Auth State** — Global authentication state via React Context

### Shopping Cart & Checkout
- **Add to Cart** — Add products from listing or detail page
- **Cart Management** — Update quantities, remove items
- **Persistent Cart** — Cart data saved to localStorage, survives page refresh
- **Protected Checkout** — Only accessible to logged-in users
- **Order Placement** — Shipping form with validation, order confirmation

### Admin Dashboard (CRUD)
- **Product List** — View all products with search/filter functionality
- **Create Product** — Form to add new products with validation
- **Edit Product** — Pre-filled form to update existing products
- **Delete Product** — Delete with confirmation modal
- **API Routes** — Server-side API routes proxy requests to Platzi Fake Store API

## 🛠️ Technologies Used

| Technology            | Purpose                                    |
| --------------------- | ------------------------------------------ |
| Next.js 15            | React framework with file-based routing    |
| React 19              | Component-based UI library                 |
| Tailwind CSS v4       | Utility-first CSS framework                |
| React Context API     | Global state management (Auth & Cart)      |
| Next.js Middleware     | Route protection (proxy)                   |
| Next.js API Routes    | Server-side CRUD operations                |
| Platzi Fake Store API | Product data source & authentication       |
| localStorage          | Persistent cart & auth token storage       |
| Vercel                | Deployment & hosting                       |

## 📁 Project Structure

```
milestone-3-Goodgame-Star/
├── components/
│   ├── Navbar.js            # Navigation with cart badge & auth controls
│   └── ProductCard.js       # Product card with add-to-cart
├── context/
│   ├── AuthContext.js       # Authentication state provider
│   └── CartContext.js       # Cart state with localStorage
├── pages/
│   ├── _app.js              # Root app with context providers
│   ├── index.js             # Home — product listing
│   ├── login.js             # Login page
│   ├── cart.js              # Shopping cart page
│   ├── checkout.js          # Protected checkout page
│   ├── promotion.js         # Promotions page
│   ├── faq.js               # FAQ page
│   ├── products/
│   │   └── [id].js          # Product detail page
│   ├── admin/
│   │   ├── index.js         # Admin dashboard — product list
│   │   ├── create.js        # Admin — create product
│   │   └── edit/
│   │       └── [id].js      # Admin — edit product
│   └── api/
│       ├── auth/
│       │   └── login.js     # Auth API proxy
│       └── products/
│           ├── index.js     # Products API (GET, POST)
│           └── [id].js      # Product API (GET, PUT, DELETE)
├── middleware.js             # Route protection middleware
├── styles/
│   └── globals.css          # Global styles with Tailwind
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

1. Clone the repository

```bash
   git clone https://github.com/Revou-FSSE-Feb26/milestone-3-Goodgame-Star.git
```

2. Navigate to project folder

```bash
   cd milestone-3-Goodgame-Star
```

3. Install dependencies

```bash
   npm install
```

4. Run development server

```bash
   npm run dev
```

5. Open browser
   http://localhost:3000

## 🔐 Authentication

**Demo Credentials:**
- Email: `john@mail.com`
- Password: `changeme`

The login process uses JWT authentication via the Platzi Fake Store API. Tokens are stored in:
- `localStorage` — for client-side auth state
- `cookies` — for middleware route protection

## 📡 API Reference

### External API
Data fetched from [Platzi Fake Store API](https://api.escuelajs.co/api/v1)

### Internal API Routes

| Endpoint             | Method | Description               |
| -------------------- | ------ | ------------------------- |
| `/api/auth/login`    | POST   | Proxy login to Platzi API |
| `/api/products`      | GET    | Fetch all products        |
| `/api/products`      | POST   | Create new product        |
| `/api/products/:id`  | GET    | Fetch single product      |
| `/api/products/:id`  | PUT    | Update product            |
| `/api/products/:id`  | DELETE | Delete product            |

## 📄 Pages

| Route               | Access       | Description                  |
| -------------------- | ------------ | ---------------------------- |
| `/`                  | Public       | Home — product listing grid  |
| `/products/[id]`     | Public       | Product detail page          |
| `/promotion`         | Public       | Promotions & deals           |
| `/faq`               | Public       | Frequently asked questions   |
| `/login`             | Public       | Login page                   |
| `/cart`              | Public       | Shopping cart                |
| `/checkout`          | Protected    | Checkout (requires login)    |
| `/admin`             | Protected    | Admin product dashboard      |
| `/admin/create`      | Protected    | Create new product           |
| `/admin/edit/[id]`   | Protected    | Edit existing product        |

## 👤 Author

**Riyan Fajri Ramadhan**
RevoU Full Stack Software Engineering — Batch Feb26

## 📄 License

This project is created for educational purposes as part of RevoU FSSE Program.
