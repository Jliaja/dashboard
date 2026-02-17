const express = require('express');
const cors = require('cors');
const path = require('path');

const authroutes = require('./routes/authroutes');
const employeeroutes = require('./routes/employeeroutes');
const statsroutes = require('./routes/statsroutes');

const app = express();

app.use(cors());
app.use(express.json());

// API dulu
app.use('/api/auth', authroutes);
app.use('/api/employees', employeeroutes);
app.use('/api/stats', statsroutes);

// Static terakhir
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

module.exports = app;
