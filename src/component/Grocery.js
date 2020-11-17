import React, { useState, useEffect } from "react";
import GroceryService from "../service/GroceryService";

const Grocery = props => {
    const initialGroceryState = {
        id: null,
        name: "",
        quantity: null,
        notes: "",
        purchased: false
    };

    const [currentGrocery, setCurrentGrocery] = useState(initialGroceryState);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getGrocery(props.match.params.id);
    }, [props.match.params.id]);

    const getGrocery = id => {
        GroceryService.get(id)
            .then(response => {
                setCurrentGrocery(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentGrocery({...currentGrocery, [name]: value});
    };

    const editPurchased = status => {
        let data = {
            id: currentGrocery.id,
            name: currentGrocery.name,
            quantity: currentGrocery.quantity,
            notes: currentGrocery.notes,
            purchased: status
        };

        GroceryService.edit(currentGrocery.id, data)
            .then(response => {
                setCurrentGrocery({ ...currentGrocery, purchased: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const editGrocery = () => {
        GroceryService.edit(currentGrocery.id, currentGrocery)
            .then(response => {
                setMessage("You have edited the grocery item successfully.");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteGrocery = () => {
        GroceryService.remove(currentGrocery.id)
            .then(response => {
                props.history.push("/grocery");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentGrocery ? (
                <div className="edit-form">
                    <h4>Grocery Item</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentGrocery.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                name="quantity"
                                value={currentGrocery.quantity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes">Notes</label>
                            <input
                                type="text"
                                className="form-control"
                                id="notes"
                                name="notes"
                                value={currentGrocery.notes}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentGrocery.purchased ? "Purchased" : "Need to buy"}
                        </div>
                    </form>

                    {currentGrocery.purchased ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => editPurchased(false)}
                        >
                            Need to buy
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => editPurchased(true)}
                        >
                            Already purchased
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deleteGrocery}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={editGrocery}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please select a grocery item.</p>
                </div>
            )}
        </div>
    );
};

export default Grocery;