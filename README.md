# 🛠️ Autoflex Inventory System

This is the full-stack documentation for the Autoflex Inventory Management System. The project focuses on high performance, clean architecture, and business-driven logic.

---

## 🚀 Project Status
**System Fully Operational.** All functional requirements for product management, stock control, and production optimization are implemented. The system utilizes **Business Codes** for all primary operations, ensuring a decoupled and professional API.

---

## 🧠 Key Business Logic: Production Strategy
The core of this system is the **Production Suggestion Engine (RF004)**. 
* **Priority Algorithm:** Products are sorted by unit price (descending). The system allocates available raw materials to the most expensive items first to maximize potential revenue.
* **Virtual Stock Simulation:** Suggestions are calculated in-memory using a virtual stock map, ensuring that a single batch of material isn't "double-counted" across multiple suggested products.



---

## 🖥️ Frontend Module (React + Vite)
The frontend is a modern Dashboard built for speed and responsiveness.
* **React 18 & Vite**: Fast, component-based development.
* **Tailwind CSS**: Utility-first styling for a clean, professional UI.
* **Data Sync**: Fully synchronized with Backend DTOs (`quantityPossible`, `totalValue`).

---

## ⚙️ Backend Module (Quarkus)
High-performance Java backend focused on data integrity.
* **Java 21 & Quarkus**: Supersonic Subatomic Java.
* **Hibernate Panache**: Active Record pattern for simplified persistence.
* **Optimization**: Arithmetic-based production calculation (Performance: O(n)).

---

## 📋 Implemented Requirements

### ✅ Functional Requirements (RFs)
- **RF001 (Product CRUD)**: Management via unique business codes.
- **RF002 (Raw Material CRUD)**: Full inventory control.
- **RF003 (Composition)**: Linking materials to products via `CompositionRequest`.
- **RF004 (Production Planning)**: Intelligent dashboard prioritizing **higher-value** products.
- **RF005 (Stock Service)**: Logic to validate and deduct materials during sales.

### ✅ Non-Functional Requirements (RNFs)
- **Security**: Database credentials managed via `.env`. IDs hidden via `@JsonIgnore`.
- **Language**: Full English implementation (code, UI, and docs) per **RNF007**.

---

## ⚙️ How to Run

### 1. Prerequisites
* Docker Desktop (PostgreSQL).
* Java 21+.
* Node.js & npm.

### 2. Backend
```bash
cd inventory-backend
./mvnw quarkus:dev
```

### 3. Frontend
```bash
cd inventory-frontend
npm install
npm run dev
```

🔗 API Reference (Swagger UI): http://localhost:8080/q/swagger-ui/
