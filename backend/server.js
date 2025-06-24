// entry point
import express from "express";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Ingredient from "./models/Ingredient.js";
import ProductCategory from "./models/ProductCategory.js";
import Preorder from "./models/Preorder.js";
import PreorderItem from "./models/PreorderItem.js";
import { checkJWT } from "./middleware/auth.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// other middleware like express.json()
app.use(express.json());

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

app.get("/products/status/:status", async (req, res) => {
  const { status } = req.params;
  try {
    const products = await Product.findAll({ where: { status: status } });
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error while fetching Products: ", error.message);
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
  if (
    !product.name ||
    !product.category_FK ||
    !product.price ||
    !product.description ||
    !product.unit
  ) {
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

app.post("/users/sync", checkJWT, async (req, res) => {
  const user = req.body;
  if (!user.name || !user.email || !user.auth0_id) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }
  try {
    const existingUser = await User.findOne({
      where: { auth0_id: user.auth0_id },
    });

    if (existingUser == null) {
      const newUser = User.build(user);
      await newUser.save();
      return res.status(201).json({ success: true, data: newUser });
    } else {
      return res.status(200).json({ success: true, data: existingUser });
    }
  } catch (error) {
    console.log(error);
    console.error("Error while syncing User: ", error.message);
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

app.get("/productCategories/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const productCategory = await ProductCategory.findOne({
      where: { category: category },
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
  if (!req_productCategory.category || !req_productCategory.description) {
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

// Preorder Endpoints

app.get("/preorder/:userId/:status", async (req, res) => {
  const { userId, status } = req.params;

  if (!userId || !status) {
    return res.status(400).json({
      success: false,
      message: "Please provide User ID and order status code.",
    });
  }

  // Verify status code
  if (!["unplaced", "placed", "fulfilled", "unfulfilled"].includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status code provided." });
  }

  try {
    const existingPreorder = await Preorder.findOne({
      where: { user_FK: userId, status_code: status },
    });

    let data = [];

    if (existingPreorder != null) {
      data = await PreorderItem.findAll({
        where: { preorder_FK: existingPreorder.ID },
        attributes: ["product_FK", "quantity"],
        include: [
          {
            model: Product,
            attributes: [
              "name",
              "description",
              "image_path",
              "unit",
              "units_in_stock",
              "price",
            ],
          },
        ],
      });
    }

    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error while fetching a Preorder: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/preorder/add/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Please provide User and Product ID and product quantity.",
    });
  }

  // Verify user exists
  try {
    const existingUser = await User.findByPk(userId);
    if (existingUser == null) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID provided." });
    }
  } catch (error) {
    console.error("Error while fetching a User: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }

  // Check if preorder exists and, if not, create one
  let preorder = null;
  try {
    const existingPreorder = await Preorder.findOne({
      where: { user_FK: userId, status_code: "unplaced" },
    });
    if (existingPreorder != null) {
      preorder = existingPreorder;
    } else {
      //create a new preorder
      const newPreorder = Preorder.build({
        user_FK: userId,
        status_code: "unplaced",
        created_at: Date.now(),
        fulfilled_at: null,
        order_code: null,
      });

      preorder = await newPreorder.save();
    }
  } catch (error) {
    console.error("Error while creating a Preorder: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }

  if (preorder == null) {
    console.error("Failed to create a preorder");
    return res.status(500).json({ success: false, message: "Server Error" });
  }

  // Create or update preorder item

  try {
    // Check if an preorder item already exists
    const existingPreorderItem = await PreorderItem.findOne({
      where: { preorder_FK: preorder.ID, product_FK: productId },
    });
    if (existingPreorderItem != null) {
      // Update product quantity
      await existingPreorderItem.update({
        quantity: existingPreorderItem.quantity + quantity,
      });
      await existingPreorderItem.save();
      return res.status(200).json({
        success: true,
        message: "Preorder Item updated.",
        data: existingPreorderItem,
      });
    } else {
      //Create a new preorder item
      const newPreorderItem = PreorderItem.build({
        preorder_FK: preorder.ID,
        product_FK: productId,
        quantity: quantity,
      });

      await newPreorderItem.save();
      return res.status(201).json({
        success: true,
        message: "Preorder Item created.",
        data: newPreorderItem,
      });
    }
  } catch (error) {
    console.error("Error while creating a Preorder Item: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/preorder/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "Please provide User and Product IDs.",
    });
  }

  // Delete preorder item
  try {
    //Find preorder
    const existingPreorder = await Preorder.findOne({
      where: { user_FK: userId, status_code: "unplaced" },
    });

    if (existingPreorder == null) {
      return res.status(400).json({
        success: false,
        message: "Unable to find a preorder for this user.",
      });
    }

    const preorderItem = await Ingredient.findOne({
      where: { preorder_FK: existingPreorder.ID, product_FK: productId },
    });
    if (preorderItem == null) {
      return res
        .status(404)
        .json({ success: false, message: "Preorder item not found." });
    } else {
      await preorderItem.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Preorder Item deleted." });
    }
  } catch (error) {
    console.error("Error while deleting a Preorder Item: ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Sever started at http://localhost:${PORT}`);
});
