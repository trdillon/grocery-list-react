import React, { useState, useEffect } from "react";
import GroceryService from "../service/GroceryService";

const Grocery = props => {
    const initialGroceryState = {
        id: null,
        name: "",
        quantity: 1,
        price: 0,
        notes: "",
        purchased: false,
        favorite: false
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
            price: currentGrocery.price,
            notes: currentGrocery.notes,
            purchased: status,
            favorite: currentGrocery.favorite
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

    const editFavorite = status => {
        let data = {
            id: currentGrocery.id,
            name: currentGrocery.name,
            quantity: currentGrocery.quantity,
            price: currentGrocery.price,
            notes: currentGrocery.notes,
            purchased: currentGrocery.purchased,
            favorite: status
        };

        GroceryService.edit(currentGrocery.id, data)
            .then(response => {
                setCurrentGrocery({ ...currentGrocery, favorite: status });
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
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={currentGrocery.price}
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
                            </label>{" "}
                            {currentGrocery.purchased ? "Purchased" : "Need to buy"}
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Favorite:</strong>
                            </label>{" "}
                            {currentGrocery.favorite ? "Yes" : "No"}
                        </div>
                    </form>

                    {currentGrocery.purchased ? (
                        <button
                            className="btn btn-primary btn-sm mr-3"
                            onClick={() => editPurchased(false)}
                        >
                            Need to buy
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary btn-sm mr-3"
                            onClick={() => editPurchased(true)}
                        >
                            Already purchased
                        </button>
                    )}

                    {currentGrocery.favorite ? (
                        <button
                            className="btn btn-primary btn-sm mr-3"
                            onClick={() => editFavorite(false)}
                        >
                            No
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary btn-sm mr-3"
                            onClick={() => editFavorite(true)}
                        >
                            Yes
                        </button>
                    )}

                    <button
                        type="submit"
                        className="btn btn-success btn-sm mr-3"
                        onClick={editGrocery}
                    >
                        Update
                    </button>

                    <button className="btn btn-danger btn-sm" onClick={deleteGrocery}>
                        Delete
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