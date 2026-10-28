async function loadDashboard() {
  try {
    const response = await fetch('/api/dashboard');
    const data = await response.json();

    renderStats(data.summary);
    renderBarChart(data.shipments);
    renderRoutes(data.routes);
    renderFleet(data.vehicles);
    renderInventory(data.inventory);
    renderShipments(data.shipments);
  } catch (error) {
    console.error('Failed to load dashboard', error);
  }
}

function renderStats(summary) {
  const statsGrid = document.getElementById('stats-grid');
  const stats = [
    { label: 'Total Shipments', value: summary.totalShipments, trend: '+12% from last week' },
    { label: 'On Time', value: summary.onTime, trend: '92% performance' },
    { label: 'Delayed', value: summary.delayed, trend: 'Needs review' },
    { label: 'Total Value', value: `$${summary.totalValue.toLocaleString()}`, trend: 'Revenue tracked' }
  ];

  statsGrid.innerHTML = stats.map(stat => `
    <div class="stat-card">
      <span class="label">${stat.label}</span>
      <p class="value">${stat.value}</p>
      <div class="trend">${stat.trend}</div>
    </div>
  `).join('');
}

function renderBarChart(shipments) {
  const chart = document.getElementById('bar-chart');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const counts = [12, 15, 14, 17, 19, 13];

  chart.innerHTML = counts.map((count, index) => `
    <div class="bar" style="height:${count * 8}px" data-label="${days[index]}"></div>
  `).join('');
}

function renderRoutes(routes) {
  const routeList = document.getElementById('route-list');
  routeList.innerHTML = routes.map(route => `
    <div class="list-item">
      <div>
        <strong>${route.route}</strong>
        <small>${route.driver}</small>
      </div>
      <span class="tag ${route.status === 'Delayed' ? 'delayed' : 'on-time'}">${route.status}</span>
    </div>
  `).join('');
}

function renderFleet(vehicles) {
  const fleetList = document.getElementById('fleet-list');
  fleetList.innerHTML = vehicles.map(vehicle => `
    <div class="list-item">
      <div>
        <strong>${vehicle.name}</strong>
        <small>${vehicle.location}</small>
      </div>
      <span class="tag ${vehicle.status === 'Active' ? 'active' : 'warning'}">${vehicle.status}</span>
    </div>
  `).join('');
}

function renderInventory(inventory) {
  const inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = inventory.map(item => `
    <div class="list-item">
      <div>
        <strong>${item.item}</strong>
        <small>${item.stock} units • ${item.warehouse}</small>
      </div>
      <span class="tag ${item.reorder === 'Critical' ? 'warning' : 'low'}">${item.reorder}</span>
    </div>
  `).join('');
}

function renderShipments(shipments) {
  const tableBody = document.getElementById('shipment-table-body');
  const count = document.getElementById('shipment-count');

  count.textContent = shipments.length;

  tableBody.innerHTML = shipments.map(shipment => `
    <tr>
      <td>${shipment.id}</td>
      <td>${shipment.customer}</td>
      <td>${shipment.origin} → ${shipment.destination}</td>
      <td>
        <span class="status-pill status-${shipment.status.toLowerCase().replace(/\s+/g, '-')}">${shipment.status}</span>
      </td>
      <td>${shipment.vehicle}</td>
      <td>${shipment.eta}</td>
      <td>$${shipment.value.toLocaleString()}</td>
    </tr>
  `).join('');
}

loadDashboard();
