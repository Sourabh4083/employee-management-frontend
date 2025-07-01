# 🛠️ Installation Guide for Employee Management System

Follow these steps to set up and run the project on your local machine.

---

## 1. 📦 Clone the Repository

```bash
git clone https://github.com/yourusername/employee-management.git
cd employee-management
```

---

## 2. ⚙️ Backend Setup

```bash
cd employee-management-backend
npm install
```

Create a `.env` file inside the `employee-management-backend` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Start the backend server:

```bash
npm run dev
```

> Backend runs at: [http://localhost:5000](http://localhost:5000)

---

## 3. 🎨 Frontend Setup

Open a **new terminal window** and run:

```bash
cd employee-management-frontend
npm install
npm run dev
```

> Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Admin Login Credentials

```bash
Username: admin
Password: admin123
```

---

All set! You can now manage employees, view dashboard stats, and explore all features. 🎉