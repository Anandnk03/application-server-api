const prefix = '/api/';

const routes = [
  { path: `${prefix}auth`, file: 'auth' },
  { path: `${prefix}users`, file: 'user' },
  { path: `${prefix}plans`, file: 'plan' },
  { path: `${prefix}communications`, file: 'communication' },
  { path: `${prefix}gapReason`, file: 'gapReason' },
];

module.exports = routes;
