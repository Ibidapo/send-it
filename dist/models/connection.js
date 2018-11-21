'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var pool = new _pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'send_it',
  password: 'postgres',
  port: 5432
});

exports.default = pool;