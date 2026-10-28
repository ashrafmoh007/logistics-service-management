# logistics-service-management

A complete logistics service management platform for tracking shipments, vehicles, warehouse inventory, routes, and operational performance.

## Overview
This project is a starter logistics operations dashboard built with Node.js and Express. It includes a clean admin dashboard UI and API endpoints for logistics data.

## Features
- Shipment tracking dashboard
- Fleet and vehicle monitoring
- Route status dashboard
- Warehousing and inventory overview
- Real-time-like mock data for demo use
- REST API endpoints for dashboard and shipment data
- GitHub-ready project structure with CI workflow

## Tech Stack
- Node.js
- Express
- HTML/CSS/JavaScript
- GitHub Actions

## Project Structure
```bash
.
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .gitignore
├── .npmrc
├── package.json
├── server.js
└── README.md
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the app
```bash
npm start
```

Then open:
```bash
http://localhost:3000
```

### 3. Development mode
```bash
npm run dev
```

## API Endpoints
- `GET /api/health` — health check
- `GET /api/dashboard` — summary, fleet, inventory, shipments, routes
- `GET /api/shipments` — list all shipments
- `GET /api/shipments/:id` — details for one shipment
- `POST /api/shipments` — create a new shipment

## Example shipment payload
```json
{
  "customer": "Northwind Retail",
  "origin": "Dubai",
  "destination": "Abu Dhabi",
  "status": "In Transit",
  "priority": "High",
  "vehicle": "TR-204",
  "eta": "2026-10-28 15:30",
  "value": 24500,
  "items": 120
}
```

## GitHub CI
The repository includes a basic CI workflow that checks the server file for syntax errors.

## License
MIT
