const prefix = '/api/';

const routes = [
  { path: `${prefix}auth`, file: 'auth' },
  { path: `${prefix}users`, file: 'user' },
  { path: `${prefix}plans`, file: 'plan' },
  { path: `${prefix}communications`, file: 'communication' },
  { path: `${prefix}gapReason`, file: 'gapReason' },
  { path: `${prefix}rejection`, file: 'rejection' },
  { path: `${prefix}dashboard`, file: 'dashboard' },
  { path: `${prefix}role`, file: 'role' },
  { path: `${prefix}scope`, file: 'scope' },
  { path: `${prefix}downTime`, file: 'downTime' },
  { path: `${prefix}component`,file: 'component'},
  { path: `${prefix}operation`,file: 'operation'},
  { path: `${prefix}machineOperation`,file: 'machineOperation'}
];

module.exports = routes;
