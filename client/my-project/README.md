# 📚 ShelfNet

ShelfNet is a full-stack web bookstore management platform built using the MERN stack (MongoDB, Express.js, React, Node.js) paired with Prisma ORM. It features secure user authentication, role-based controls, and a fully responsive interface.

## 🌐 Live Application URLs

The application is split into microservices and hosted across optimized cloud platforms:
* **Frontend Web Application (Vercel):** [https://shelf-fekj3vala-afshaik775-5021s-projects.vercel.app](https://shelf-fekj3vala-afshaik775-5021s-projects.vercel.app)
* **Backend Production API (Render):** [https://onrender.com](https://onrender.com)

---

## 🛠️ Key Features

* **User Authentication:** Secure user and administrator access sessions managed via JSON Web Tokens (JWT).
* **Dynamic Dashboards:** Dedicated operational routes for regular platform users (`/bookshelf`) and store administrators (`/adminUi/dashboard`).
* **Inventory Management:** Administrative forms to add, manage, track, and catalog books and genres.
* **Seamless Routing:** Production client-side routing fallback configurations enabled natively using Vercel rewrites.
* **Modern Interface:** Polished UI designs styled with Tailwind CSS v4.

---

## 🚀 Tech Stack

### Frontend Architecture
* **Core Framework:** React.js (Compiled with Vite Engine)
* **Styling Framework:** Tailwind CSS v4 (Via `@tailwindcss/vite` compiler plugin)
* **Deployment Platform:** Vercel

### Backend Architecture
* **Runtime Engine:** Node.js
* **Server Framework:** Express.js
* **Database Layer:** MongoDB Atlas
* **Object-Relational Mapping (ORM):** Prisma Client
* **Deployment Platform:** Render (Free Tier Web Service)

---

## 📂 Repository Layout

```text
shelfs/
├── client/                 # Frontend sub-system
│   └── my-project/
│       ├── src/
│       │   ├── assets/     # Static visual elements (Images/Logos)
│       │   ├── components/ # View UI Modules (adminUi, userui, common)
│       │   ├── main.css    # Tailwind @import directive entry
│       │   └── main.jsx    # React bundle mount point
│       ├── vercel.json     # Vercel router rewrite rule configuration
│       └── package.json
└── server/                 # Backend sub-system
    ├── prisma/             # Database architecture mapping schemas
    ├── router/             # Express API path parameters
    ├── index.js            # Node app execution entry point
    └── package.json
```

---

## ⚙️ Local Installation & Environment Execution

### 1. System Setup
Clone the codebase down to your operating device:
```bash
git clone https://github.com
cd ShelfNet
```

### 2. Backend Configurations
Navigate to your backend server folder and initialize environmental parameters:
```bash
cd server
touch .env
```
Populate the newly generated `.env` file with your direct secrets:
```text
PORT=8060
DATABASE_URL="your-mongodb-atlas-connection-string"
JWT_SECRET_TOKEN="your-secure-jwt-string"
```
Install system node packages, run internal database syncs, and initialize the system:
```bash
npm install
npx prisma generate
npm start
```

### 3. Frontend Execution
Open a secondary terminal process, access your UI layer, and mount the developer engine locally:
```bash
cd client/my-project
npm install
npm run dev
```

---

## ☁️ Cloud Deployment Configurations

### Vercel Deployment parameters (`client/my-project`)
* **Framework Preset:** Vite
* **Root Directory:** `client/my-project`
* **Build Command:** `npm install && npm run build`
* **Output Directory:** `dist`

### Render Deployment parameters (`server`)
* **Root Directory:** `server`
* **Build Command:** `npm install && node ./node_modules/prisma/build/index.js generate`
* **Start Command:** `node index.js`
