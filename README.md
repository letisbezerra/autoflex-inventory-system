# 🛠️ Autoflex Inventory System - Backend

This is the backend module for the Autoflex Inventory Management System. Built with **Quarkus**, this project focuses on high performance and native Docker integration.

## 🚀 Project Status
Currently, the core API for Product and Raw Material management is operational, including persistence in a relational database.

## 🧠 Architecture & Technologies
- **Java 21**: Latest LTS version. (RNF001)
- **Quarkus**: The Supersonic Subatomic Java Framework.
- **PostgreSQL**: Relational database. (RNF004)
- **Hibernate Panache**: Simplified persistence using the Active Record pattern.
- **Docker**: Container management for the database environment.

## 📋 Implemented Requirements (Sprint 1)
- [x] **RF001**: Product CRUD (Creation and Listing via API).
- [x] **RF002**: Raw Material CRUD (Inventory and stock management).
- [x] **RNF007**: All code, variables, and API messages implemented in **English**.
- [x] **SmallRye OpenAPI**: Integrated Swagger UI for automatic API documentation.

---

## 📝 Development Step-by-Step (Documentation)

To reach the current state of the project, the following steps were performed:

1. **Project Initialization**: Generated the Quarkus project structure using Maven with `resteasy-reactive-jackson`, `hibernate-orm-panache`, and `jdbc-postgresql` extensions.
2. **Database Configuration**: Configured `application.properties` to connect with PostgreSQL and enabled Dev Services to automatically manage Docker containers.
3. **Domain Modeling**:
   - Created `RawMaterial.java`: Defines the schema for raw materials and stock quantities.
   - Created `Product.java`: Defines the schema for final products and pricing.
   - Created `ProductComposition.java`: Established the Many-to-One relationship between products and their required materials.
4. **REST API Implementation**:
   - Created `RawMaterialResource.java`: HTTP endpoints for raw material operations.
   - Created `ProductResource.java`: HTTP endpoints for product operations.
5. **Standardization**: Organized all files into a clean package structure (`com.autoflex.inventory.models` and `com.autoflex.inventory.controllers`).

---

## ⚙️ How to Run

### Prerequisites
- Docker Desktop installed and running.
- Java 21 or higher.

### Installation
1. Clone the repository.
2. Navigate to the backend folder:
   ```bash
   cd inventory-backend

### ⚙️ Execution
Start the application in dev mode:

```bash
./mvnw quarkus:dev

### 🔗 Main Endpoints
Once the application is running, you can access:

* **Swagger UI (API Testing):** [http://localhost:8080/q/swagger-ui/](http://localhost:8080/q/swagger-ui/)
* **List Products:** `GET /products`
* **List Raw Materials:** `GET /raw-materials`

🔗 Main Endpoints
Once the application is running, you can access:

Swagger UI (API Testing): http://localhost:8080/q/swagger-ui/

List Products: GET /products

List Raw Materials: GET /raw-materials
