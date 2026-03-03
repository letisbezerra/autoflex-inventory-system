# 🛠️ Autoflex Inventory System - Backend

Este é o módulo de backend do sistema de gestão de estoque Autoflex. Desenvolvido com **Quarkus**, o projeto foca em alta performance e código limpo.

---

## 🚀 Status do Projeto
**Backend 100% Operacional.** Todas as funcionalidades de gestão de produtos, controle de insumos e otimização de produção foram implementadas.

---

## 🧠 Arquitetura e Tecnologias
* **Java 21**: Versão LTS mais recente.
* **Quarkus**: Framework Java focado em cloud-native (RNF005).
* **PostgreSQL**: Banco de dados relacional (RNF004).
* **Hibernate Panache**: Persistência simplificada.
* **CORS**: Configurado para integração com o frontend React.

---

## 📋 Requisitos Implementados

### ✅ Requisitos Funcionais (RFs)
- **RF001**: CRUD completo de Produtos.
- **RF002**: CRUD completo de Matérias-Primas.
- **RF003**: Associação Produto-Material (Composição).
- **RF004**: **Motor de Sugestão de Produção** (Prioridade por maior valor).

### ✅ Requisitos Não Funcionais (RNFs)
- **RNF002**: Arquitetura desacoplada (API).
- **RNF007**: Código e documentação em **Inglês**.

---

## ⚙️ Como Executar

### 1. Pré-requisitos
* Docker Desktop (Rodando).
* Java 21+.

### 2. Instalação e Execução
```bash
# Acessar a pasta
cd inventory-backend

# Iniciar em modo dev
./mvnw quarkus:dev
🔗 Endpoints Principais (Swagger)
Com a aplicação rodando, acesse a interface interativa para testes:

👉 http://localhost:8080/q/swagger-ui/
