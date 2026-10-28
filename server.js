const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const shipments = [
  {
    id: 'LD-1001',
    customer: 'Northwind Retail',
    origin: 'Dubai',
    destination: 'Abu Dhabi',
    status: 'In Transit',
    priority: 'High',
    vehicle: 'TR-204',
    eta: '2026-10-28 15:30',
    value: 24500,
    items: 120
  },
  {
    id: 'LD-1002',
    customer: 'City Mart',
    origin: 'Sharjah',
    destination: 'Ajman',
    status: 'Delivered',
    priority: 'Medium',
    vehicle: 'TR-118',
    eta: 'Delivered',
    value: 15800,
    items: 84
  },
  {
    id: 'LD-1003',
    customer: 'Prime Foods',
    origin: 'Jebel Ali',
    destination: 'Ras Al Khaimah',
    status: 'Delayed',
    priority: 'High',
    vehicle: 'TR-307',
    eta: '2026-10-28 19:00',
    value: 32150,
    items: 200
  },
  {
    id: 'LD-1004',
    customer: 'Greenline',
    origin: 'Al Ain',
    destination: 'Dubai',
    status: 'Loading',
    priority: 'Low',
    vehicle: 'TR-450',
    eta: '2026-10-29 09:15',
    value: 11250,
    items: 55
  }
];

const vehicles = [
  { id: 'TR-204', name: 'Truck 204', status: 'Active', location: 'Dubai', utilization: 82 },
  { id: 'TR-118', name: 'Truck 118', status: 'Idle', location: 'Sharjah', utilization: 36 },
  { id: 'TR-307', name: 'Truck 307', status: 'Maintenance', location: 'Jebel Ali', utilization: 63 },
  { id: 'TR-450', name: 'Truck 450', status: 'Active', location: 'Al Ain', utilization: 74 }
];

const routes = [
  { route: 'Dubai → Abu Dhabi', driver: 'A. Khan', status: 'On Time', load: '92%' },
  { route: 'Sharjah → Ajman', driver: 'S. Ali', status: 'Completed', load: '66%' },
  { route: 'Jebel Ali → Ras Al Khaimah', driver: 'N. Saeed', status: 'Delayed', load: '88%' },
  { route: 'Al Ain → Dubai', driver: 'H. Faris', status: 'On Time', load: '58%' }
];

const inventory = [
  { sku: 'SKU-1042', item: 'Cold Storage Packs', stock: 421, warehouse: 'Warehouse A', reorder: 'Low' },
  { sku: 'SKU-1178', item: 'Packaging Boxes', stock: 872, warehouse: 'Warehouse B', reorder: 'Normal' },
  { sku: 'SKU-2105', item: 'Heavy Duty Cables', stock: 140, warehouse: 'Warehouse C', reorder: 'Critical' },
  { sku: 'SKU-3029', item: 'Safety Kits', stock: 634, warehouse: 'Warehouse A', reorder: 'Normal' }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'logistics-service-management' });
});

app.get('/api/dashboard', (req, res) => {
  const totalShipments = shipments.length;
  const onTime = shipments.filter(item => item.status === 'In Transit' || item.status === 'Delivered').length;
  const delayed = shipments.filter(item => item.status === 'Delayed').length;
  const totalValue = shipments.reduce((sum, item) => sum + item.value, 0);

  res.json({
    summary: {
      totalShipments,
      onTime,
      delayed,
      totalValue,
      activeVehicles: vehicles.filter(vehicle => vehicle.status === 'Active').length,
      warehouses: 5
    },
    shipments,
    vehicles,
    routes,
    inventory
  });
});

app.get('/api/shipments', (req, res) => {
  res.json(shipments);
});

app.get('/api/shipments/:id', (req, res) => {
  const shipment = shipments.find(item => item.id === req.params.id);

  if (!shipment) {
    return res.status(404).json({ message: 'Shipment not found' });
  }

  return res.json(shipment);
});

app.post('/api/shipments', (req, res) => {
  const shipment = {
    id: `LD-${Math.floor(Math.random() * 9000 + 1000)}`,
    customer: req.body.customer || 'New Customer',
    origin: req.body.origin || 'Unknown',
    destination: req.body.destination || 'Unknown',
    status: req.body.status || 'Pending',
    priority: req.body.priority || 'Medium',
    vehicle: req.body.vehicle || 'Unassigned',
    eta: req.body.eta || 'TBD',
    value: Number(req.body.value || 0),
    items: Number(req.body.items || 0)
  };

  shipments.unshift(shipment);
  res.status(201).json(shipment);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Logistics service management app running on http://localhost:${PORT}`);
});
