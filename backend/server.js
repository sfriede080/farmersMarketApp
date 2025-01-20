// entry point
import express from 'express'
const sequelize = require('./config/sequelize.js');
import Product from './model/Product.js'
import User from './model/User.js'

const app = express();

app.listen(5000, () => {
    
    console.log('Sever started at http://localhost:5000');
});

app.get("/", (req, res) => {
    res.send("Server is ready!");
});

// Product Endpoints

app.get("/products", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.error("Error while fetching Products: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }

})

app.get("/products/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product == null) {
            return res.status(404).json({success: false, message: "Product not found."});
        } else {
            return res.status(200).json({success: true, data: product});
        }
    } catch (error) {
        console.error("Error while fetching a Product: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
})

app.get("/products/name/:name", async (req, res) => {
    const {req_name} = req.params;
    try {
        const product = await Product.findOne({ where: { name: req_name } });
        if (product == null) {
            return res.status(404).json({success: false, message: "Product not found."});
        } else {
            return res.status(200).json({success: true, data: product});
        }
    } catch (error) {
        console.error("Error while fetching a Product: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
})

app.get("/products/category/:category_id", async (req, res) => {
    const {req_category_FK} = req.params;
    try {
        const products = await Product.findAll({ where: { category_FK: req_category_FK } });
        if (products == null) {
            return res.status(404).json({success: false, message: "Product not found."});
        } else {
            return res.status(200).json({success: true, data: products});
        }
    } catch (error) {
        console.error("Error while fetching Products: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
})

app.post("/products", async (req, res) => {
    const product = req.body; //sent in request
    if(!product.name || !product.category_FK || !product.price
        || !product.description || !product.unit) {
        return res.status(400).json({success: false, message: "Please fill out all required fields."});
    }

    const newProduct = Product.build(product);

    try { 
        await newProduct.save();
        return res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error while creating a Product: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

app.patch("/products/:id", async (req, res) => {
    const {id} = req.params;
    const req_product = req.body;
    try {
        const product = await Product.findByPk(id);
        if (product == null) {
            return res.status(404).json({success: false, message: "Product not found."});
        } else {
            await product.update(req_product);
            await product.save();
            return res.status(200).json({success: true, message: "Product updated."});
        }
    } catch (error) {
        console.error("Error while updating a Product: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

app.delete("/products/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product == null) {
            return res.status(404).json({success: false, message: "Product not found."});
        } else {
            await product.destroy();
            return res.status(200).json({success: true, message: "Product deleted."});
        }
    } catch (error) {
        console.error("Error while deleting a Product: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

// User Endpoints

app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        console.error("Error while fetching Users: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }

})

app.get("/users/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if (user == null) {
            return res.status(404).json({success: false, message: "User not found."});
        } else {
            return res.status(200).json({success: true, data: user});
        }
    } catch (error) {
        console.error("Error while fetching a User: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
})

app.get("/users/email/:email", async (req, res) => {
    const {req_email} = req.params;
    try {
        const user = await User.findOne({ where: { email: req_email } });
        if (user == null) {
            return res.status(404).json({success: false, message: "User not found."});
        } else {
            return res.status(200).json({success: true, data: user});
        }
    } catch (error) {
        console.error("Error while fetching a User: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
})

app.post("/users", async (req, res) => {
    const user = req.body; //sent in request
    if(!user.lname || !user.fname || !user.email || !user.phone_number ) {
        return res.status(400).json({success: false, message: "Please fill out all required fields."});
    }

    const newUser = User.build(user);

    try { 
        await newUser.save();
        return res.status(201).json({success: true, data: newUser});
    } catch (error) {
        console.error("Error while creating a User: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

app.patch("/users/:id", async (req, res) => {
    const {id} = req.params;
    const req_user = req.body;
    try {
        const user = await User.findByPk(id);
        if (user == null) {
            return res.status(404).json({success: false, message: "User not found."});
        } else {
            await user.update(req_user);
            await user.save();
            return res.status(200).json({success: true, message: "User updated."});
        }
    } catch (error) {
        console.error("Error while updating a User: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

app.delete("/users/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if (user == null) {
            return res.status(404).json({success: false, message: "User not found."});
        } else {
            await user.destroy();
            return res.status(200).json({success: true, message: "User deleted."});
        }
    } catch (error) {
        console.error("Error while deleting a User: ", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

//TODO

//get ingredient by name
//get ingredient by id
//get all ingredients
//add ingredient
//delete ingredient
//update ingredient

//get all product categories
//get category by name
//get category by id
//add category
//delete category