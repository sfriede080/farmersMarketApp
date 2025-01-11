// entry point
import express from 'express'
import mysql from 'mysql'
import { Sequelize } from 'sequelize';

const app = express();

app.get("/", (req, res) => {
    res.send("Server is ready!");
});

app.get("/products", (req, res) => {
    res.send("Server is ready!");
});

app.listen(5000, () => {
    console.log('Sever started at http://localhost:5000');
});


// configurations for creating mysql connection
const connection = mysql.createConnection({
    host: 'localhost',     // host for connection
    port: 3306,            // default port for mysql is 3306
    database: 'farmers_market_app',      // database from which we want to connect our node application
    user: 'root',          // username of the mysql connection
    password: 'RunnerGirl080**'       // password of the mysql connection
});

// executing connection
connection.connect(function(err) {
    if (err) {
        console.log("error occurred while connecting");
        console.log(err);
    } else {
        console.log("connection created with mysql successfully");
    }
});

connection.end();

const sequelize = new Sequelize(
    'farmers_market_app',
    'root',
    'RunnerGirl080**',
    {
        host: 'root@localhost:3306',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 sequelize.close();