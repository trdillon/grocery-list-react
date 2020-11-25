import React, { useState } from "react";
import GroceryService from "../service/GroceryService";

const AddGrocery = () => {
    const initialGroceryState = {
        id: null,
        name: "",
        quantity: 1,
        price: 0,
        notes: "",
        purchased: false
    };

    const [grocery, setGrocery] = useState(initialGroceryState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setGrocery({...grocery, [name]: value });
    };

    const saveGrocery = () => {
        let data = {
            name: grocery.name,
            quantity: grocery.quantity,
            price: grocery.price,
            notes: grocery.notes
        };

        GroceryService.add(data)
            .then(response => {
                setGrocery({
                    id: response.data.id,
                    name: response.data.name,
                    quantity: response.data.quantity,
                    price: response.data.price,
                    notes: response.data.notes,
                    purchased: response.data.purchased
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newGrocery = () => {
        setGrocery(initialGroceryState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Grocery item has been added successfully.</h4>
                    <button className="btn btn-success" onClick={newGrocery}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={grocery.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            required
                            value={grocery.quantity}
                            onChange={handleInputChange}
                            name="quantity"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            required
                            value={grocery.price}
                            onChange={handleInputChange}
                            name="price"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Notes</label>
                        <input
                            type="text"
                            className="form-control"
                            id="notes"
                            value={grocery.notes}
                            onChange={handleInputChange}
                            name="notes"
                        />
                    </div>

                    <button onClick={saveGrocery} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddGrocery;