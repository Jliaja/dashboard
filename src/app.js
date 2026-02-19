const express = require('express');
const cors = require('cors');
const path = require('path');

const authroutes = require('./routes/authroutes');
const employeeRoutes = require('./routes/employeeroutes'); 
const departmentRoutes = require('./routes/departmentroutes');
const projectRoutes = require('./routes/projectroutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/departments', departmentRoutes);
app.use('/api/projects', projectRoutes);
// routes
app.use('/api/auth', authroutes);
// employee
app.use('/api/employee', employeeRoutes);

// static files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

module.exports = app;
