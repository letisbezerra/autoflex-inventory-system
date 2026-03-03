# 🛠️ Autoflex Inventory System - Backend

This is the backend module for the Autoflex Inventory Management System. Built with **Quarkus**, this project focuses on high performance, clean architecture, and native cloud integration.

---

## 🚀 Project Status
**Backend Fully Operational.** All functional requirements for product management, stock control, and production optimization are implemented, including full CRUD operations and business logic.

---

## 🧠 Architecture & Technologies
* **Java 21**: Latest LTS version.
* **Quarkus**: The Supersonic Subatomic Java Framework (RNF005).
* **PostgreSQL**: Relational database (RNF004).
* **Hibernate Panache**: Active Record pattern for simplified persistence.
* **Jackson**: Custom JSON serialization handling circular references.
* **CORS**: Fully configured for secure communication with the React frontend.

---

## 📋 Implemented Requirements

### ✅ Functional Requirements (RFs)
- **RF001 (Product CRUD)**: Full Create, Read, Update, and Delete operations for products.
- **RF002 (Raw Material CRUD)**: Full Create, Read, Update, and Delete operations for materials/inventory.
- **RF003 (Association)**: Dedicated endpoints to link raw materials to products with specific quantities.
- **RF004 (Production Suggestion)**: Intelligent algorithm prioritizing **higher-value** products based on available stock.
- **Sales Logic**: Implementation of a `/sell` endpoint that validates and deducts stock automatically.

### ✅ Non-Functional Requirements (RNFs)
- **RNF002**: Decoupled API architecture.
- **RNF007**: **Full English implementation** for code, database schemas, and documentation.

---

## 📝 Technical Implementation Details

1. **Full CRUD Support**: 
   - `GET`: Retrieve all items or specific IDs.
   - `POST`: Create new entries.
   - `PUT`: Update existing records via ID.
   - `DELETE`: Remove records with transactional integrity.
2. **Intelligent Production Engine**: Logic that sorts products by price (DESC), checks material availability, and calculates the maximum possible production volume.
3. **Circular Reference Fix**: Implemented `@JsonIgnore` on the `ProductComposition` model to allow seamless JSON rendering in the frontend.
4. **CORS Policy**: Enabled for `http://localhost:3000` and `http://localhost:5173` to support Vite/React development.

---

## ⚙️ How to Run

### 1. Prerequisites
* Docker Desktop (Running).
* Java 21 or higher.

### 2. Execution
```bash
# Navigate to the folder
cd inventory-backend

# Run in Dev Mode
./mvnw quarkus:dev
🔗 API Reference (Swagger UI)
Once the application is running, access the interactive documentation to test all POST, GET, PUT, and DELETE methods:

👉 http://localhost:8080/q/swagger-ui/

Key Endpoints:
PUT /products/{id}: Update product details.

DELETE /raw-materials/{id}: Remove material from inventory.

POST /compositions: Define the "recipe" for a product.

GET /production/suggest: View the production dashboard.
