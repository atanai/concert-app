# 🎵 Concert App

Concert App is a full-stack web application for managing concerts.
Users can view concerts, reserve seats, cancel reservations, and the system records all actions in a history log for auditing purposes.

---

## 🧱 Tech Stack

### Frontend

* **Next.js**
* **React**
* **Tailwind CSS**

### Backend

* **NestJS**
* **TypeORM**
* **PostgreSQL** (recommended, but other TypeORM-supported databases can be used)

---

## 📁 Project Structure

```bash
concert-app/
├── frontend/        # Next.js + Tailwind CSS
└── backend/         # NestJS + TypeORM
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* **Node.js** (version 18 or higher)
* **npm** or **yarn**
* **PostgreSQL** (or another database supported by TypeORM)

---

## 🚀 Backend Setup (NestJS)

### 1️⃣ Navigate to backend folder

```bash
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start backend server

```bash
npm run start:dev
```

Backend will be available at:

```
http://localhost:3001
```

---

## 🌐 Frontend Setup (Next.js)

### 1️⃣ Navigate to frontend folder

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start frontend

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:3000
```

---

## 🧪 Testing

### Backend tests

```bash
cd backend
npm run test
```

### Frontend tests

```bash
cd frontend
npm run test
```

---

## 🔄 API Overview (Backend)

### Concerts

* `GET /concerts` — List all concerts
* `POST /concerts` — Create a concert
* `PATCH /concerts/:id` — Update concert info
* `POST /concerts/:id/reserve` — Reserve a seat
* `POST /concerts/:id/cancel` — Cancel reservation
* `DELETE /concerts/:id` — Soft delete a concert

### Histories

* `GET /histories` — List reservation/cancellation history

---

## 📄 License

MIT License
