const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhpcmEiLCJpYXQiOjE3NDg2MTc0ODEsImV4cCI6MTc0ODYyMTA4MX0.cegjY7Djv0fWCc0miXYvFWGi4JEzYHZBQsCjEwGyjfM';

// Decode payload only (no secret needed, no verification)
const decoded = jwt.decode(token);
// second part of jwt token is payload

console.log('Decoded payload:', decoded);