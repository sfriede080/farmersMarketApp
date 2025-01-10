// entry point
import express from 'express'

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