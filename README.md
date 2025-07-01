# 👨‍💼 Employee Management System (MERN + Next.js)

A full-stack web application to manage employees using modern technologies like **Next.js (App Router)**, **Node.js**, **Express**, and **MongoDB**.  
It includes secure authentication, employee CRUD operations, dashboard stats, pagination, search, and more.

---

## 🔗 Live Demo

> 🚀 Coming soon — [Your deployed Vercel/Render link]

---

## 📸 Screenshots

| Login | Dashboard | Employee List |
|-------|-----------|----------------|
| ![Login](screenshots/login.png) | ![Dashboard](screenshots/dashboard.png) | ![List](screenshots/employees.png) |

---

## ⚙️ Tech Stack

| Layer        | Tech Used                      |
|--------------|--------------------------------|
| **Frontend** | Next.js (App Router), React, Tailwind CSS |
| **Backend**  | Express.js, Node.js            |
| **Database** | MongoDB, Mongoose              |
| **Auth**     | JWT (stored in Cookies)        |
| **API**      | Axios                          |
| **Extras**   | Middleware, Search, Pagination, Dashboard |

---

## ✨ Features

- 🔐 **Secure Login** (JWT + Cookie-based Auth)
- 🧾 **CRUD for Employees**: Add, Edit, Delete
- 🔎 **Search + Filter** by name or position
- 🔄 **Pagination** (5 per page, easily customizable)
- 📊 **Dashboard** with:
  - Total employee count
  - Average salary
  - Most common job position
- ✅ **Route Protection** using middleware
- 🕑 **Token expiration** (auto logout after 2h)

---

## 📁 Project Structure

```bash
employee-management/
├── employee-management-frontend/       # Next.js frontend
│   ├── app/
│   │   ├── employees/
│   │   ├── add-employee/
│   │   └── dashboard/
│   ├── utils/
│   │   ├── api.js
│   │   └── checkTokenExpiration.js
│   ├── components/
│   │   └── Navbar.js
│   └── middleware.js
│
├── employee-management-backend/        # Express.js backend
│   ├── routes/
│   │   ├── employeeRoutes.js
│   │   └── authRoutes.js
│   ├── controllers/
│   │   ├── employeeController.js
│   │   └── authController.js
│   ├── models/
│   │   └── Employee.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
