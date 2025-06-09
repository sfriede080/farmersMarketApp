import { useState } from "react";
import "../styles/styles.css";
import useCreateProduct from "../api/hooks/products/useCreateProduct";
import useProductCategories from "../api/hooks/productCategories/useProductCategories";
import useUpdateProduct from "../api/hooks/products/useUpdateProduct";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function ProductForm({ product }) {
  const { data, isLoading, error } = useProductCategories();
  if (product) {
    var mutation = useUpdateProduct();
  } else {
    var mutation = useCreateProduct();
  }

  let categoryLabels = { 0: "Uncategorized" };

  if (data) {
    data.data.forEach((productCategory) => {
      categoryLabels[productCategory.ID] = productCategory.category;
    });
  }
  const statusLabels = {
    1: "CURRENT",
    2: "PAST",
    3: "UPCOMING",
  };

  const [category, setCategory] = useState(product ? product.category_FK : "0");
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(
    product ? getKeyByValue(statusLabels, product.status) : "1"
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
    setStatus("1");
    setUnit("");
    setUnitsInStock(0);
    setPrice(0.0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name,
      category_FK: category,
      description,
      image,
      status,
      unit,
      units_in_stock: unitsInStock,
      price,
    };
    if (product) {
      mutation.mutate({ id: product.ID, updatedProduct: productData });
    } else {
      mutation.mutate(productData);
    }
    clearForm();
  };

  if (isLoading) {
    return (
      <>
        <p>Loading product information...</p>
      </>
    );
  }
  if (error) {
    console.log(error);
    return (
      <>
        <p>Error loading product information.</p>
      </>
    );
  }

  if (mutation.isPending) {
    return (
      <>
        <p>Adding product...</p>
      </>
    );
  }
  if (mutation.isError) {
    return (
      <>
        <p>Error adding product.</p>
      </>
    );
  }

  if (mutation.isSuccess) {
    return (
      <>
        <p>Product added!</p>
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
        <div>
          <label>Status</label>
          <select
            value={status}
            className="form-input"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled value="">
              Select...
            </option>
            {Object.keys(statusLabels).map((key) => (
              <option value={key.toString()} key={key}>
                {statusLabels[key]}
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
