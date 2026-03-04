# 🛠️ Autoflex Inventory System - Backend

This is the backend module for the Autoflex Inventory Management System. Built with **Quarkus**, this project focuses on high performance, clean architecture, and business-driven logic.

---

## 🚀 Project Status
**Backend Fully Operational.** All functional requirements for product management, stock control, and production optimization are implemented. The system now utilizes **Business Codes** for all primary operations, ensuring a decoupled and professional API.

---

## 🧠 Architecture & Technologies
* **Java 21**: Latest LTS version.
* **Quarkus**: The Supersonic Subatomic Java Framework.
* **PostgreSQL**: Relational database.
* **Hibernate Panache**: Active Record pattern for simplified persistence.
* **Global Exception Handling**: Custom `RestExceptionMapper` to manage database constraints and integrity errors (e.g., duplicate codes).
* **CORS**: Fully configured for secure communication with React/Vite frontends.

---

## 📋 Implemented Requirements

### ✅ Functional Requirements (RFs)
- **RF001 (Product CRUD)**: Management via unique business codes (e.g., `PRD-001`).
- **RF002 (Raw Material CRUD)**: Full control of inventory materials.
- **RF003 (Composition)**: Linking raw materials to products with specific "recipe" quantities.
- **RF004 (Production Planning)**: Intelligent dashboard prioritizing **higher-value** products based on current raw material stock.
- **Sales Logic**: `/sell` endpoint for automatic stock validation and deduction.

### ✅ Non-Functional Requirements (RNFs)
- **Security**: Internal database IDs are hidden from the API layer using `@JsonIgnore`.
- **Data Integrity**: Robust handling of duplicate codes and constraint violations.
- **Language**: Full English implementation for code, schemas, and documentation.

---

## 📝 Technical Implementation Details

1. **Business Code Identification**: Instead of exposing database IDs, the API uses unique strings (e.g., `code: "PRD-001"`) for all `GET`, `PUT`, and `DELETE` operations.
2. **Global Error Mapping**: A specialized `RestExceptionMapper` intercepts `ConstraintViolationException` to return clean `409 Conflict` messages instead of generic server errors.
3. **Production Suggestion Engine**: Logic that:
   - Sorts products by price (**Highest First**).
   - Validates availability across multiple raw materials.
   - Calculates the maximum possible production volume.
4. **JSON Optimization**: Prevents circular references in the `ProductComposition` model to maintain a clean payload for the frontend.

---

## ⚙️ How to Run

### 1. Prerequisites
* Docker Desktop (Running PostgreSQL).
* Java 21+.

### 2. Execution
```bash
# Navigate to the folder
cd inventory-backend

# Run in Dev Mode
./mvnw quarkus:dev
🔗 API Reference (Swagger UI)
Access the interactive documentation while the app is running:

👉 http://localhost:8080/q/swagger-ui/

Key Endpoints:
POST /compositions: Define the "recipe" for a product.

GET /production/suggest: View the prioritized production dashboard.

PUT /products/{code}: Update details using the business code.

DELETE /raw-materials/{code}: Remove materials via business code.
