# 🛠️ Autoflex Inventory System - Backend

This is the backend module for the Autoflex Inventory Management System. Built with **Quarkus**, this project focuses on high performance, clean architecture, and native cloud integration.

---

## 🚀 Project Status
**Backend Fully Operational.** All functional requirements for product management, stock control, and production optimization are implemented and documented.

---

## 🧠 Architecture & Technologies
* **Java 21**: Latest LTS version.
* **Quarkus**: The Supersonic Subatomic Java Framework (RNF005).
* **PostgreSQL**: Relational database (RNF004).
* **Hibernate Panache**: Active Record pattern for simplified persistence.
* **CORS**: Fully configured for secure communication with the React frontend.

---

## 📋 Implemented Requirements

### ✅ Functional Requirements (RFs)
- **RF001**: Full Product CRUD (Name, Price).
- **RF002**: Full Raw Material CRUD (Stock/Inventory).
- **RF003**: Product-Material Association (Recipe/Composition definition).
- **RF004**: **Production Suggestion Engine**: Intelligent algorithm prioritizing **higher-value** products based on available stock.

### ✅ Non-Functional Requirements (RNFs)
- **RNF002**: Decoupled API architecture.
- **RNF007**: **Full English implementation** for code, database schemas, and documentation.

---

## 📝 Development Highlights
1. **Intelligent Production Logic**: The system calculates stock bottlenecks and suggests maximum production capacity, sorted by product price (descending).
2. **Data Integrity**: Used `@JsonIgnore` to handle bi-directional relationships and prevent circular JSON references.
3. **API Documentation**: Integrated SmallRye OpenAPI (Swagger) for real-time endpoint testing.

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
🔗 Main Endpoints (Swagger UI)
Once the application is running, access the interactive documentation:

👉 http://localhost:8080/q/swagger-ui/

GET /production/suggest: Production optimization logic.

POST /compositions: Link raw materials to products.

GET /products: List all registered products and their compositions.
