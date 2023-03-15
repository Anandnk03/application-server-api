const prefix = '/api/';

const routes = [
  { path: `${prefix}auth`, file: 'auth' },
  { path: `${prefix}users`, file: 'user' },
];

module.exports = routes;
