# 📚 ShelfNet

ShelfNet is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) paired with Prisma ORM. It serves as a comprehensive bookstore management platform featuring dynamic administration controls and a smooth user experience.

## 🌐 Live Deployments

The application is deployed live and can be accessed through the following links:
* **Frontend Application:** [https://shelfnet-1.onrender.com](https://shelfnet-1.onrender.com)
* **Alternative Mirror / Backend API:** [https://shelfnet.onrender.com](https://shelfnet.onrender.com)

---

## 🛠️ Features

* **User Authentication:** Secure access using JSON Web Tokens (JWT).
* **Role-Based Routing:** Separate control dashboards for regular clients and platform administrators.
* **Book Management:** Administrators can easily add, update, manage, or delete inventory.
* **Genre Organization:** Dynamic categorization systems to cleanly organize books.
* **Responsive Design:** Polished frontend UI styled smoothly with modern CSS rules.

---

## 🚀 Tech Stack

### Frontend (`client/my-project`)
* **Framework:** React.js (compiled with Vite)
* **Styling:** CSS3 & Tailwind CSS
* **Build Tool:** Vite v7+

### Backend (`server`)
* **Runtime Environment:** Node.js
* **Server Framework:** Express.js
* **Database & Mapping:** MongoDB Atlas via Prisma ORM
* **Authentication:** JWT (JsonWebToken)

---

## 📂 Project Structure

```text
shelfs/
├── client/                 # Frontend architecture
│   └── my-project/
│       ├── src/
│       │   ├── assets/     # Static images and visual assets
│       │   ├── components/ # Component directory (adminUi, userui, common)
│       │   ├── main.css    # Core styling configurations
│       │   └── main.jsx    # Client entry point
│       └── package.json
└── server/                 # Backend architecture
    ├── controller/         # Request handling logic
    ├── middleware/         # Auth & validation checks
    ├── prisma/             # Schema definitions for MongoDB
    ├── router/             # Server endpoint directories
    ├── index.js            # Server entry point
    └── package.json
```

---

## ⚙️ Local Installation & Setup

Follow these steps to set up and run the application locally on your computer:

### 1. Clone the repository
```bash
git clone https://github.com
cd ShelfNet
```

### 2. Configure Backend Environments
Navigate to the server directory and create a `.env` file:
```bash
cd server
touch .env
```
Inside the `.env` file, configure your secrets safely:
```text
PORT=8060
DATABASE_URL="your-mongodb-atlas-connection-string"
JWT_SECRET_TOKEN="your-custom-secure-jwt-string"
```

### 3. Install Server Dependencies & Generate Prisma Client
```bash
npm install
npx prisma generate
npm start
```

### 4. Run the Frontend Development Server
Open a new terminal window, navigate into the React subdirectory, and start the development engine:
```bash
cd client/my-project
npm install
npm run dev
```

---

## 🌍 Cloud Deployment Notes (Render)

### Frontend Deployment Configuration
* **Root Directory:** `client/my-project`
* **Build Command:** `npm install && npm run build`
* **Publish Directory:** `dist`

### Backend Deployment Configuration
* **Root Directory:** `server`
* **Build Command:** `npm install && node ./node_modules/prisma/build/index.js generate`
* **Start Command:** `node index.js`
