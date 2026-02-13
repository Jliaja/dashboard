const express = require('express');
const cors = require('cors');

const authroutes = require('./routes/authroutes');
const employeeroutes = require('./routes/employeeroutes');
const statsroutes = require('./routes/statsroutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authroutes);
app.use('/api/employees', employeeroutes);
app.use('/api/stats', statsroutes);
app.get('/', (req, res) => {
  res.send('Backend jalan, database connected');
});

module.exports = app;
