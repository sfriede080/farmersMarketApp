import { useState } from "react";
import "../styles/styles.css";
import useCreateProduct from "../api/hooks/products/useCreateProduct";
import useProductCategories from "../api/hooks/productCategories/useProductCategories";
import useCreateProductCategory from "../api/hooks/productCategories/useCreateProductCategory";
import useUpdateProduct from "../api/hooks/products/useUpdateProduct";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] == value);
}

export default function ProductForm({ product }) {
  const { data, isLoading, error } = useProductCategories();

  const {
    mutateAsync: updateProduct,
    isPending: isUpdatingProduct,
    error: updateProductError,
    isSuccess: updateProductSuccess,
  } = useUpdateProduct();

  const {
    mutateAsync: createProduct,
    isPending: isCreatingProduct,
    error: createProductError,
    isSuccess: createProductSuccess,
  } = useCreateProduct();

  const {
    mutateAsync: createCategory,
    isPending: isCreatingCategory,
    error: createCategoryError,
    isSuccess: createCategorySuccess,
  } = useCreateProductCategory();

  let categoryLabels = { 0: "Add a new category" };

  if (data) {
    data.data.forEach((productCategory) => {
      categoryLabels[productCategory.ID] = productCategory.category;
    });
  }

  const statusOptions = [
    { key: 1, label: "CURRENT" },
    { key: 2, label: "PAST" },
    { key: 3, label: "UPCOMING" },
  ];

  const [category, setCategory] = useState(product ? product.category_FK : "");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(
    product
      ? statusOptions.find((option) => option.label === product.status)?.key
      : 1
  );
  const [unit, setUnit] = useState(product ? product.unit : "");
  const [unitsInStock, setUnitsInStock] = useState(
    product ? product.units_in_stock : 0
  );
  const [price, setPrice] = useState(product ? product.price : 0.0);

  const clearForm = () => {
    setCategory("0");
    setName("");
    setDescription("");
    setImage("");
    setStatus(1);
    setUnit("");
    setUnitsInStock(0);
    setPrice(0.0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let categoryID = category;

      if (categoryID == "0") {
        const newCategoryData = await createCategory({
          category: newCategory,
          description: newCategoryDesc,
        });
        categoryID = newCategoryData.data.ID;
      }

      const productData = {
        name,
        category_FK: categoryID,
        description,
        image,
        status: statusOptions.find((option) => option.key == status)?.label,
        unit,
        units_in_stock: unitsInStock,
        price,
      };

      if (product) {
        await updateProduct({ id: product.ID, updatedProduct: productData });
      } else {
        await createProduct(productData);
      }
      clearForm();
    } catch (err) {
      console.error("Error creating product or category:", err);
    }
  };

  if (isLoading) {
    return (
      <>
        <p>Loading product information...</p>
      </>
    );
  }
  if (error) {
    return (
      <>
        <p>Error loading product information.</p>
      </>
    );
  }

  if (isCreatingProduct) {
    return (
      <>
        <p>Adding product...</p>
      </>
    );
  }

  if (isUpdatingProduct) {
    return (
      <>
        <p>Updating product...</p>
      </>
    );
  }

  if (createProductError) {
    return (
      <>
        <p>Error adding product.</p>
      </>
    );
  }

  if (updateProductError) {
    return (
      <>
        <p>Error updating product.</p>
      </>
    );
  }

  if (createProductSuccess) {
    return (
      <>
        <p>Product added!</p>
      </>
    );
  }

  if (updateProductSuccess) {
    return (
      <>
        <p>Product updated!</p>
      </>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div>
          <label>Category</label>
          <select
            value={category}
            className="form-input"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">
              Select...
            </option>
            {Object.keys(categoryLabels).map((key) => (
              <option value={key.toString()} key={key}>
                {categoryLabels[key]}
              </option>
            ))}
          </select>
        </div>

        {category == "0" && (
          <div>
            <label>Category</label>
            <input
              type="text"
              value={newCategory}
              className="form-input"
              onChange={(e) => setNewCategory(e.target.value)}
            ></input>
            <label>Description</label>
            <input
              type="text"
              value={newCategoryDesc}
              className="form-input"
              onChange={(e) => setNewCategoryDesc(e.target.value)}
            ></input>
          </div>
        )}
        <div>
          <label>Status</label>
          <select
            value={status}
            className="form-input"
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option disabled value="">
              Select...
            </option>
            {statusOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            className="form-input"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            className="form-input"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            min="0.00"
            precision={2}
            className="form-input"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            value={image}
            className="form-input"
            onChange={(e) => setImage(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Unit</label>
          <input
            type="text"
            value={unit}
            className="form-input"
            onChange={(e) => setUnit(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Units in Stock</label>
          <input
            type="number"
            value={unitsInStock}
            min="0"
            className="form-input"
            onChange={(e) => setUnitsInStock(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
