// entry point
import express from "express";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Ingredient from "./models/Ingredient.js";
import ProductCategory from "./models/ProductCategory.js";
import authRoutes from "./routes/auth.js";
import auth from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//Routes
app.use("/api/auth", authRoutes);

// Protected route (only accessible with a valid token)
app.get("/api/private", auth, (req, res) => {
  res.send("This is a protected route");
});

app.get("/", (req, res) => {
  res.send("Server is ready!");
});

// Product Endpoints

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error while fetching Products: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    } else {
      return res.status(200).json({ success: true, data: product });
    }
  } catch (error) {
    console.error("Error while fetching a Product: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/products/name/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const product = await Product.findOne({ where: { name: name } });
    if (product == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    } else {
      return res.status(200).json({ success: true, data: product });
    }
  } catch (error) {
    console.error("Error while fetching a Product: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/products/category/:category_id", async (req, res) => {
  const { category_id } = req.params;
  try {
    const products = await Product.findAll({
      where: { category_FK: category_id },
    });
    if (products == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    } else {
      return res.status(200).json({ success: true, data: products });
    }
  } catch (error) {
    console.error("Error while fetching Products: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/products", async (req, res) => {
  const product = req.body; //sent in request
  console.log(product);
  if (
    !product.name ||
    !product.category_FK ||
    !product.price ||
    !product.description ||
    !product.unit
  ) {
    console.log("missing fields");
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }

  const newProduct = Product.build(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error while creating a Product: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const req_product = req.body;
  if (
    !req_product.name ||
    !req_product.category_FK ||
    !req_product.price ||
    !req_product.description ||
    !req_product.unit
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }
  try {
    const product = await Product.findByPk(id);
    if (product == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    } else {
      await product.update(req_product);
      await product.save();
      return res
        .status(200)
        .json({ success: true, message: "Product updated." });
    }
  } catch (error) {
    console.error("Error while updating a Product: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    } else {
      await product.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Product deleted." });
    }
  } catch (error) {
    console.error("Error while deleting a Product: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// User Endpoints

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error while fetching Users: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const req_user = req.body;
  if (
    !req_user.fname ||
    !req_user.lname ||
    !req_user.username ||
    !req_user.email ||
    !req_user.password
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }
  try {
    const user = await User.findByPk(id);
    if (user == null) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    } else {
      await user.update(req_user);
      await user.save();
      return res.status(200).json({ success: true, message: "User updated." });
    }
  } catch (error) {
    console.error("Error while updating a User: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

//Ingredient Endpoints

app.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json({ success: true, data: ingredients });
  } catch (error) {
    console.error("Error while fetching Ingredients: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/ingredients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await Ingredient.findByPk(id);
    if (ingredient == null) {
      return res
        .status(404)
        .json({ success: false, message: "Ingredient not found." });
    } else {
      return res.status(200).json({ success: true, data: ingredient });
    }
  } catch (error) {
    console.error("Error while fetching a Ingredient: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/ingredients/name/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const ingredient = await Ingredient.findOne({ where: { name: name } });
    if (ingredient == null) {
      return res
        .status(404)
        .json({ success: false, message: "Ingredient not found." });
    } else {
      return res.status(200).json({ success: true, data: ingredient });
    }
  } catch (error) {
    console.error("Error while fetching a Ingredient: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/ingredients", async (req, res) => {
  const ingredient = req.body; //sent in request
  if (!ingredient.name || !ingredient.description) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }

  const newIngredient = Ingredient.build(ingredient);

  try {
    await newIngredient.save();
    return res.status(201).json({ success: true, data: newIngredient });
  } catch (error) {
    console.error("Error while creating a Ingredient: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.patch("/ingredients/:id", async (req, res) => {
  const { id } = req.params;
  const req_ingredient = req.body;
  if (!req_ingredient.name || !req_ingredient.description) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }
  try {
    const ingredient = await Ingredient.findByPk(id);
    if (ingredient == null) {
      return res
        .status(404)
        .json({ success: false, message: "Ingredient not found." });
    } else {
      await ingredient.update(req_ingredient);
      await ingredient.save();
      return res
        .status(200)
        .json({ success: true, message: "Ingredient updated." });
    }
  } catch (error) {
    console.error("Error while updating a Ingredient: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/ingredients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await Ingredient.findByPk(id);
    if (ingredient == null) {
      return res
        .status(404)
        .json({ success: false, message: "Ingredient not found." });
    } else {
      await ingredient.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Ingredient deleted." });
    }
  } catch (error) {
    console.error("Error while deleting a Ingredient: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

//Product Category Endpoints

app.get("/productCategories", async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.status(200).json({ success: true, data: productCategories });
  } catch (error) {
    console.error("Error while fetching Product Categories: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/productCategories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productCategory = await ProductCategory.findByPk(id);
    if (productCategory == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product Category not found." });
    } else {
      return res.status(200).json({ success: true, data: productCategory });
    }
  } catch (error) {
    console.error("Error while fetching a Product Category: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/productCategories/type/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const productCategory = await ProductCategory.findOne({
      where: { type: type },
    });
    if (productCategory == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product Category not found." });
    } else {
      return res.status(200).json({ success: true, data: productCategory });
    }
  } catch (error) {
    console.error("Error while fetching a Product Category: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/productCategories", async (req, res) => {
  const productCategory = req.body; //sent in request
  if (!productCategory.category || !productCategory.description) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }

  const newProductCategory = ProductCategory.build(productCategory);

  try {
    await newProductCategory.save();
    return res.status(201).json({ success: true, data: newProductCategory });
  } catch (error) {
    console.error("Error while creating a Product Category: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.patch("/productCategories/:id", async (req, res) => {
  const { id } = req.params;
  const req_productCategory = req.body;
  if (!req_productCategory.type || !req_productCategory.description) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }
  try {
    const productCategory = await ProductCategory.findByPk(id);
    if (productCategory == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product Category not found." });
    } else {
      await productCategory.update(req_productCategory);
      await productCategory.save();
      return res
        .status(200)
        .json({ success: true, message: "Product Category updated." });
    }
  } catch (error) {
    console.error("Error while updating a Product Category: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/productCategories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productCategory = await ProductCategory.findByPk(id);
    if (productCategory == null) {
      return res
        .status(404)
        .json({ success: false, message: "Product Category not found." });
    } else {
      await productCategory.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Product Category deleted." });
    }
  } catch (error) {
    console.error("Error while deleting a Product Category: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Sever started at http://localhost:${PORT}`);
});
