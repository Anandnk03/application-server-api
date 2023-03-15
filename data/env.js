require('dotenv').config();

// create configration objects
let ENV = {};

ENV.APP = process.env.APP || 'development';
ENV.PORT = process.env.PORT || '3367';

// DATABASE
ENV.DB_DIALECT = process.env.DB_DIALECT || 'mysql';
ENV.DB_HOST = process.env.DB_HOST || 'localhost';
ENV.DB_PORT = process.env.DB_PORT || '3306';
ENV.DB_NAME = process.env.DB_NAME || 'databasename';
ENV.DB_USER = process.env.DB_USER || 'username';
ENV.DB_PASSWORD = process.env.DB_PASSWORD || 'password';

// JWT
ENV.JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
ENV.JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d';
ENV.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshkey';
ENV.REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '2d';

// TIME ZONE
ENV.TIMEZONE = process.env.TIMEZONE || '+05:30';

module.exports = ENV;
