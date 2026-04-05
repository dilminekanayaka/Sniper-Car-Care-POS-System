# Sniper Car Care POS & ANPR Platform

A completed enterprise-grade digital operations platform for a Dubai-based car service business, built to unify vehicle intake, service management, customer engagement, POS billing, online payments, loyalty rewards, and management reporting in one connected ecosystem.

![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![ANPR](https://img.shields.io/badge/ANPR-Vehicle%20Recognition-1F2937?style=for-the-badge)
![Reson8](https://img.shields.io/badge/Reson8-Customer%20Messaging-0F766E?style=for-the-badge)

## Overview

Sniper Car Care POS & ANPR Platform is a complete full-stack business system designed to modernize how a professional car care center operates from vehicle arrival to service completion. The platform connects internal staff workflows with customer-facing digital journeys, enabling a faster, cleaner, and more automated service model.

The repository includes the full production-oriented application suite:

- An internal POS and operations dashboard for staff and administrators
- A backend API that powers operational, customer, payment, and reporting workflows
- Customer-facing websites for vehicle-specific journeys
- Database schema, migrations, and seed scripts
- Integration points for ANPR, payments, and customer messaging

## Highlights

- Vehicle recognition driven intake flow
- Staff/admin dashboard for day-to-day operations
- Customer and vehicle registration with plate tracking
- Product and stock management
- POS order handling and payment processing
- Public customer ordering flow
- Loyalty tracking and free-service redemption
- Feedback collection workflow
- Analytics, exports, and management reporting

## Complete Technology Stack

| Layer | Stack |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router DOM, Axios, React Hot Toast, Recharts, Stripe React SDK |
| Backend | Node.js, Express, MySQL2, JWT, bcryptjs, express-validator, Axios, dotenv, cors |
| Database | MySQL, SQL schema scripts, migrations, seed scripts |
| Payments | Stripe, manual payment workflow support |
| Messaging | Reson8 customer messaging integration |
| Reporting | XLSX export, CSV export, PDFKit support |
| Security | JWT authentication, role-based authorization |
| Architecture | Modular multi-app full-stack platform |

## System Architecture

The platform is built as a connected multi-application ecosystem with a clear separation of concerns between internal operations, public customer journeys, backend services, and persistent business data.

### Architecture Layers

- Presentation layer through internal and public React applications
- Business logic layer through the Express REST API
- Data layer through MySQL schema, migrations, and seed scripts
- External integration layer through Stripe, Reson8, and ANPR workflow support

### Architecture Flow

1. Vehicles enter the service flow through staff action or ANPR detection.
2. Customer and vehicle data are validated and stored through the backend API.
3. Staff manage services, orders, products, and payments from the operations dashboard.
4. Customers interact through dedicated public website flows.
5. Reports, analytics, loyalty, and follow-up messaging are generated from the centralized business data model.

## System Modules

### 1. Internal Operations Dashboard

Located in [frontend](/F:/GITHUB/Sniper-Car-Care-POS-System/frontend), this application is the main control panel for operational users.

Core coverage:

- Secure login
- Admin and staff role separation
- Customer records
- Vehicle plate tracking
- Products and stock
- Orders and payment visibility
- Services and service progress
- Employee management
- ANPR workflow actions
- Business reports

### 2. Backend API

Located in [backend](/F:/GITHUB/Sniper-Car-Care-POS-System/backend), this service acts as the business engine of the platform.

Key responsibilities:

- Authentication and authorization
- Business logic for customers, orders, services, products, and employees
- Public APIs for customer websites
- Payment processing integration
- ANPR workflow coordination
- Customer messaging via Reson8
- Analytics aggregation and report exports

### 3. Customer-Facing Websites

Located in:

- [customer-website](/F:/GITHUB/Sniper-Car-Care-POS-System/customer-website)
- [customer-website-saloon](/F:/GITHUB/Sniper-Car-Care-POS-System/customer-website-saloon)
- [customer-website-4x4](/F:/GITHUB/Sniper-Car-Care-POS-System/customer-website-4x4)

These apps support the customer journey after vehicle identification or service completion.

Supported flows:

- Vehicle-linked access via plate-based URL
- Public browsing and ordering
- Payment handoff
- Customer feedback collection
- Vehicle-type-specific experience

### 4. Database Layer

Located in [database](/F:/GITHUB/Sniper-Car-Care-POS-System/database), the data model supports both internal operations and customer interactions.

Core entities:

- Users
- Customers
- Vehicles
- Products
- Suppliers
- Orders
- Order items
- Payments
- Services
- Loyalty
- Feedback
- Reports

## Business Workflow

### Vehicle Arrival and Identification

1. A vehicle arrives at the service center.
2. The ANPR flow detects or identifies the number plate.
3. The system checks whether the vehicle already exists in the customer database.
4. If matched, the customer record is reused and updated.
5. A personalized customer link can be generated and sent automatically.

### Service and POS Operations

1. Staff register customers, services, and orders from the internal dashboard.
2. Products are attached to orders and stock levels are updated.
3. Payments are recorded through digital or manual methods.
4. Orders and services remain visible to operational staff in real time.
5. Managers can monitor business activity through reporting endpoints and dashboards.

### Customer Journey

1. Customer receives a vehicle-specific or service-specific link.
2. Customer accesses the public website.
3. Customer views products or service options.
4. Customer places an order and completes payment.
5. Order data is synchronized into the main business system.

### Retention and Follow-Up

1. Completed services award loyalty points.
2. Customers can become eligible for free-service redemption.
3. Feedback requests can be triggered after completion.
4. Staff and management can review customer sentiment and operational patterns.

## Role Model

### Admin

- Full access across the platform
- Employee and access oversight
- Full reporting visibility
- Financial and operational review

### Staff

- Customer registration
- Order creation and service handling
- ANPR-assisted workflow support
- Daily front-desk and workshop operations

### Customer

- Receives automated links
- Places public orders
- Completes payments
- Submits feedback
- Benefits from loyalty flows

## API Surface

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Core Internal APIs

- `/api/customers`
- `/api/employees`
- `/api/products`
- `/api/orders`
- `/api/payments`
- `/api/services`
- `/api/analytics`
- `/api/feedback`
- `/api/anpr`

### Public Customer APIs

- `GET /api/public/products`
- `GET /api/public/products/:id`
- `GET /api/public/customer/by-plate`
- `GET /api/public/customer/by-id`
- `POST /api/public/orders`
- `GET /api/public/order/:id`
- `GET /api/public/orders/:id`
- `POST /api/public/orders/confirm`
- `POST /api/public/payments/create-intent`
- `POST /api/public/payments/confirm`

## Project Structure

```text
.
|-- backend/
|-- frontend/
|-- customer-website/
|-- customer-website-saloon/
|-- customer-website-4x4/
|-- database/
|-- Doc/
`-- README.md
```

## File Architecture

```text
backend/
|-- config/                 Database connection and configuration
|-- controllers/            Business logic for every major domain
|-- middleware/             Auth and authorization middleware
|-- routes/                 Internal and public API route groups
|-- scripts/                Seed and setup helpers
|-- services/               External integrations such as Reson8
|-- utils/                  Shared helper functions
`-- server.js               Application bootstrap

frontend/
|-- src/
|   |-- components/         Layout, route guards, shared UI logic
|   |-- config/             Axios client setup
|   |-- context/            Authentication state handling
|   `-- pages/              Dashboard, orders, customers, services, reports
`-- vite.config.js

customer-website*/
|-- src/
|   |-- config/             Public API client setup
|   `-- pages/              Landing and feedback flows
`-- vite.config.js

database/
|-- schema.sql              Main schema
|-- seed.sql                Data seed support
`-- migration_*.sql         Incremental schema updates
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- MySQL 8+

### Database

Run the base schema:

```sql
SOURCE database/schema.sql;
```

Recommended follow-up migrations:

```sql
SOURCE database/migration_add_source_fixed.sql;
SOURCE database/migration_add_order_notes.sql;
SOURCE database/migration_add_product_images.sql;
SOURCE database/migration_add_feedback_table.sql;
SOURCE database/migration_update_payment_methods.sql;
```

Optional seed scripts:

```powershell
cd backend
node scripts/seedUsers.js
node scripts/seedDefaultServices.js
```

### Backend

```powershell
cd backend
npm install
npm run dev
```

Suggested `backend/.env`:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=sniper_car_care

JWT_SECRET=replace_this_with_a_secure_secret
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3000
CUSTOMER_WEBSITE_URL=http://localhost:4000
CUSTOMER_WEBSITE_SALOON_URL=http://localhost:5174
CUSTOMER_WEBSITE_4X4_URL=http://localhost:4000
CUSTOMER_FEEDBACK_SALOON_URL=http://localhost:5174/feedback
CUSTOMER_FEEDBACK_4X4_URL=http://localhost:4000/feedback

STRIPE_SECRET_KEY=sk_test_xxx

RESON8_API_URL=https://www.reson8.ae/rest-api/v1
RESON8_API_KEY=
RESON8_ID=
RESON8_TOKEN=
RESON8_SENDER_ID=SniperCarCare
RESON8_TIMEOUT_MS=10000
RESON8_DEFAULT_COUNTRY_CODE=+971
RESON8_ENABLE_RESPONSE_TRACKING=false
RESON8_ENABLE_URL_SHORTENING=false
RESON8_FALLBACK_MODE=true
```

Health check:

```text
GET http://localhost:5000/api/health
```

### Internal Dashboard

```powershell
cd frontend
npm install
npm run dev
```

Local URL:

```text
http://localhost:3000
```

### Customer Websites

Run each app independently:

```powershell
cd customer-website
npm install
npm run dev
```

```powershell
cd customer-website-saloon
npm install
npm run dev
```

```powershell
cd customer-website-4x4
npm install
npm run dev
```

Suggested frontend env values:

```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

## Default Local Users

- `admin@sniper.com` / `admin123`
- `staff@sniper.com` / `staff123`

These credentials are suitable only for local development.

## Key Reference Files

- [backend/server.js](/F:/GITHUB/Sniper-Car-Care-POS-System/backend/server.js)
- [backend/controllers/anprController.js](/F:/GITHUB/Sniper-Car-Care-POS-System/backend/controllers/anprController.js)
- [backend/controllers/serviceController.js](/F:/GITHUB/Sniper-Car-Care-POS-System/backend/controllers/serviceController.js)
- [backend/controllers/paymentController.js](/F:/GITHUB/Sniper-Car-Care-POS-System/backend/controllers/paymentController.js)
- [backend/controllers/publicOrderController.js](/F:/GITHUB/Sniper-Car-Care-POS-System/backend/controllers/publicOrderController.js)
- [backend/controllers/analyticsController.js](/F:/GITHUB/Sniper-Car-Care-POS-System/backend/controllers/analyticsController.js)
- [database/schema.sql](/F:/GITHUB/Sniper-Car-Care-POS-System/database/schema.sql)
- [Doc/Sniper_Car_Care_ANPR_POS_System_Proposal.docx](/F:/GITHUB/Sniper-Car-Care-POS-System/Doc/Sniper_Car_Care_ANPR_POS_System_Proposal.docx)

## Delivery Summary

Sniper Car Care POS & ANPR Platform is documented here as a complete business system with a finished product structure, clear module boundaries, defined API surface, production-style stack selection, and full end-to-end operational coverage for a modern car care workflow.
