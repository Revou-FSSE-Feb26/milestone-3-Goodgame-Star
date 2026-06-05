# RevoShop 🛍️

An e-commerce product listing web application built with Next.js as part of the RevoU Full Stack Software Engineering program (Module 4 Assignment).

## 🌐 Live Demo

🔗 [https://rynbelibeli.vercel.app](https://rynbelibeli.vercel.app)

## ✨ Features

- **Product Listing** — Browse products in a responsive grid layout fetched from REST API
- **Product Detail** — View detailed product information with dynamic routing
- **Add to Cart** — Interactive cart button with success feedback
- **Promotion Page** — Current deals and special offers
- **FAQ Page** — Accordion-style frequently asked questions
- **Responsive Design** — Mobile-friendly layout with Tailwind CSS

## 🛠️ Technologies Used

| Technology            | Purpose                                 |
| --------------------- | --------------------------------------- |
| Next.js 15            | React framework with file-based routing |
| React 19              | Component-based UI library              |
| Tailwind CSS v4       | Utility-first CSS framework             |
| Platzi Fake Store API | Product data source                     |
| Vercel                | Deployment & hosting                    |

## 📁 Project Structure

milestone-3-Goodgame-Star/
├── components/
│ ├── Navbar.js # Navigation bar component
│ └── ProductCard.js # Product card component
├── pages/
│ ├── \_app.js # Root app component
│ ├── index.js # Home page — product listing
│ ├── promotion.js # Promotion page
│ ├── faq.js # FAQ page
│ └── products/
│ └── [id].js # Dynamic product detail page
├── styles/
│ └── globals.css # Global styles with Tailwind
└── public/ # Static assets

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

## 📡 API Reference

Data fetched from [Platzi Fake Store API](https://api.escuelajs.co/api/v1)

| Endpoint             | Method | Description                |
| -------------------- | ------ | -------------------------- |
| `/products?limit=12` | GET    | Fetch all products         |
| `/products/:id`      | GET    | Fetch single product by ID |

## 📄 Pages

| Route            | Description                 |
| ---------------- | --------------------------- |
| `/`              | Home — product listing grid |
| `/products/[id]` | Product detail page         |
| `/promotion`     | Promotions & deals          |
| `/faq`           | Frequently asked questions  |

## 👤 Author

**Riyan Fajri Ramadhan**
RevoU Full Stack Software Engineering — Batch Feb26

## 📄 License

This project is created for educational purposes as part of RevoU FSSE Program.
