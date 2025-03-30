import React, {useState} from "react";
import '../styles.css';
import { useNavigate} from "react-router-dom";

export default function ProductForm() {

    const [category, setCategory] = useState("4");
    const categoryLabels = {
        1: "Cookies",
        2: "Cakes",
        3: "Other",
        4: "Uncategorized"
    }
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [status, setStatus] = useState("1");
    const statusLabels = {
        1: "CURRENT",
        2: "PAST",
        3: "UPCOMING",
    }
    const [unit, setUnit] = useState("");
    const [unitsInStock, setUnitsInStock] = useState(0);
    const [price, setPrice] = useState(0.00);

    const clearForm = () => {
        setCategory("4");
        setName("");
        setDescription("");
        setImage("");
        setStatus("1");
        setUnit("");
        setUnitsInStock(0);
        setPrice(0.00);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            name, 
            category,
            description, 
            image,
            id: new Date().toISOString(),
            status,
            unit,
            unitsInStock,
            price
        }
        clearForm();


    }

    let navigate = useNavigate();

    return (
    
        <div>
            <>
                <button onClick={() => navigate(-1)}>Back</button> 
            </>
            <form onSubmit = {handleSubmit} className = 'ticket-form'>
                <div>
                    <label>Category</label>
                    <select value={category} className="form-input" onChange={e => setCategory(e.target.value)}>
                    <option disabled value="">Select...</option>
                    {Object.keys(categoryLabels).map(key => (
                        <option value = {key.toString()}>
                            {categoryLabels[key]}
                        </option>
                        ))
                    }
                </select>
                </div>
                <div>
                    <label>Status</label>
                    <select value={status} className="form-input" onChange={e => setStatus(e.target.value)}>
                    <option disabled value="">Select...</option>
                    {Object.keys(statusLabels).map(key => (
                        <option value = {key.toString()}>
                            {statusLabels[key]}
                        </option>
                        ))
                    }
                </select>
                </div>
                <div>
                    <label>Name</label>
                    <input type = "text" value = {name} className="form-input" onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type = "text" value = {description} className="form-input" onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Price</label>
                    <input type = "number" value = {price} min = "0.00" precision = {2} className="form-input" onChange={e => setPrice(e.target.value)}></input>
                </div>
                <div>
                    <label>Image</label>
                    <input type = "file" value = {image} className="form-input" onChange={e => setImage(e.target.value)}></input>
                </div>
                <div>
                    <label>Unit</label>
                    <input type = "text" value = {unit} className="form-input" onChange={e => setUnit(e.target.value)}></input>
                </div>
                <div>
                    <label>Units in Stock</label>
                    <input type = "number" value = {unitsInStock} min = "0" className="form-input" onChange={e => setUnitsInStock(e.target.value)}></input>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}