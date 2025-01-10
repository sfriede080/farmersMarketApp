// entry point
import express from 'express'
import mysql from 'mysql'
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
    database: 'testdb',      // database from which we want to connect our node application
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