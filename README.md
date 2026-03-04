# 🛠️ Autoflex Inventory System

This is the full-stack documentation for the Autoflex Inventory Management System. The project focuses on high performance, clean architecture, and business-driven logic.

---

## 🚀 Project Status
**System Fully Operational.** All functional requirements for product management, stock control, and production optimization are implemented. The system utilizes **Business Codes** for all primary operations, ensuring a decoupled and professional API.

---

## 🖥️ Frontend Module (React + Vite)
The frontend is a modern Dashboard built for speed and responsiveness.

### 🧠 Architecture & Technologies
* **React 18 & Vite**: For a fast, component-based development experience.
* **Tailwind CSS**: For modern, utility-first styling.
* **Lucide React**: Iconography for the UI.
* **Axios**: Managed HTTP requests via a centralized `api.js`.
* **React Router**: Client-side navigation between inventory views.

---

## ⚙️ Backend Module (Quarkus)
High-performance Java backend focused on data integrity and business logic.

### 🧠 Architecture & Technologies
* **Java 21 & Quarkus**: The Supersonic Subatomic Java Framework.
* **PostgreSQL**: Relational database.
* **Hibernate Panache**: Simplified persistence with the Active Record pattern.
* **Dotenv Support**: Secure credential management via `.env` files.
* **Global Exception Handling**: Custom `RestExceptionMapper` to manage database constraints and integrity errors (e.g., duplicate codes).
* **CORS**: Fully configured for secure communication via `CorsFilter.java`.

---

## 📋 Implemented Requirements

### ✅ Functional Requirements (RFs)
- **RF001 (Product CRUD)**: Management via unique business codes (e.g., `PRD-001`).
- **RF002 (Raw Material CRUD)**: Full control of inventory materials.
- **RF003 (Composition)**: Linking raw materials to products with specific "recipe" quantities.
- **RF004 (Production Planning)**: Intelligent dashboard prioritizing **higher-value** products based on current raw material stock.
- **Sales Logic**: `/sell` endpoint for automatic stock validation and deduction.

### ✅ Non-Functional Requirements (RNFs)
- **Security**: Internal database IDs are hidden from the API layer using `@JsonIgnore`. Database credentials are kept in a protected `.env` file.
- **Data Integrity**: Robust handling of duplicate codes and constraint violations.
- **Language**: Full English implementation for code, schemas, and documentation.

---

## 📝 Technical Implementation Details

1. **Business Code Identification**: The API uses unique strings (e.g., `code: "PRD-001"`) for all `GET`, `PUT`, and `DELETE` operations.
2. **Global Error Mapping**: A specialized `RestExceptionMapper` intercepts `ConstraintViolationException` to return clean `409 Conflict` messages.
3. **Production Suggestion Engine**: Logic that sorts products by price (**Highest First**), validates availability, and calculates max volume.
4. **JSON Optimization**: Prevents circular references in the `ProductComposition` model.

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

🔗 API Reference (Swagger UI)
👉 http://localhost:8080/q/swagger-ui/
