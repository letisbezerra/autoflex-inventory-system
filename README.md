🛠️ Autoflex Inventory System - Backend
This is the backend module for the Autoflex Inventory Management System. Built with Quarkus, this project focuses on high performance and clean architecture.

🚀 Project Status
Backend Fully Operational. All functional requirements for product management, stock control, and production optimization have been implemented.

🧠 Architecture & Technologies
Java 21: Latest LTS version.

Quarkus: The Supersonic Subatomic Java Framework. (RNF005)

PostgreSQL: Relational database. (RNF004)

Hibernate Panache: Active Record pattern for simplified persistence.

Jackson: Efficient JSON serialization/deserialization with circular reference handling.

CORS Enabled: Configured to allow integration with React frontend.

📋 Implemented Requirements
[x] RF001: Full Product CRUD.

[x] RF002: Full Raw Material CRUD (Inventory tracking).

[x] RF003: Product-Material Association (Define recipes/compositions).

[x] RF004: Production Suggestion Engine: Intelligent algorithm that suggests production quantities based on current stock, prioritizing products with higher market value.

[x] RNF007: Full English implementation for code, database schemas, and API documentation.

📝 Development Highlights
Intelligent Production Logic: Implemented a service that simulates production by calculating the "bottleneck" material for each product, sorted by price in descending order.

Database Integrity: Established robust relationships (OneToMany/ManyToOne) to ensure data consistency between products and materials.

API Documentation: Integrated Swagger UI for real-time testing and schema validation.

CORS Configuration: Prepared the backend for secure communication with the React application.

⚙️ How to Run
Prerequisites
Docker Desktop (Running).

Java 21+.

Execution
Clone the repository and navigate to the folder:

Bash
cd inventory-backend
Start in Dev Mode:

Bash
./mvnw quarkus:dev
🔗 Main Endpoints (Swagger)
Access the interactive documentation to test the API:
👉 http://localhost:8080/q/swagger-ui/

GET /production/suggest: The core logic for production optimization.

POST /compositions: Link raw materials to products.

POST /products/{id}/sell: Process sales and automatically deduct stock.
