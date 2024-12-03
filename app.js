require('dotenv').config()
const express = require('express')
const mysql = require('mysql');
const app = express();
const port = 3000;
const inventoryRoutes = require('./routes/inventory')
const requestOrderRoutes = require('./routes/request_order_routes')
// middlewares 
app.use(express.json());


// routes
app.use('/', inventoryRoutes)
app.use('/', requestOrderRoutes)

const connection = mysql.createConnection({
    host: process.env.SERVER_HOST,
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PASSWORD,
    database: process.env.SERVER_DB
})

connection.connect();




app.listen(port, ()=> {
    console.log(`${connection.state}`)
})


module.exports = connection;

