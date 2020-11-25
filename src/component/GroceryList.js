import React, { useState, useEffect } from "react";
import GroceryService from "../service/GroceryService";
import { Link } from "react-router-dom";

const GroceryList = () => {
    const [groceries, setGroceries] = useState([]);
    const [currentGrocery, setCurrentGrocery] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        getGroceryList();
    }, []);

    const getGroceryList = () => {
        GroceryService.getAll()
            .then(response => {
                setGroceries(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChangeSearchName = event => {
        const searchName = event.target.value;
        setSearchName(searchName);
    };

    const getByName = () => {
        GroceryService.getByName(searchName)
            .then(response => {
                setGroceries(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setActiveGrocery = (grocery, index) => {
        setCurrentGrocery(grocery);
        setCurrentIndex(index);
    }

    const refreshList = () => {
        getGroceryList();
        setCurrentGrocery(null);
        setCurrentIndex(-1);
    }

    const purgeList = () => {
        GroceryService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div className="list-row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by grocery item name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={getByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Grocery List</h4>

                <ul className="list-group">
                    { groceries && groceries.map((grocery, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveGrocery(grocery, index)}
                            key={index}
                        >
                            {grocery.name}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={purgeList}
                >
                    Delete All
                </button>
            </div>
            <div className="col-md-6">
                {currentGrocery ? (
                    <div>
                        <h4>Grocery Item</h4>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentGrocery.name}
                        </div>
                        <div>
                          <label>
                              <strong>Quantity:</strong>
                          </label>{" "}
                            {currentGrocery.quantity}
                        </div>
                        <div>
                            <label>
                                <strong>Price:</strong>
                            </label>{" "}
                            {currentGrocery.price}
                        </div>
                        <div>
                            <label>
                                <strong>Notes:</strong>
                            </label>{" "}
                            {currentGrocery.notes}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentGrocery.purchased ? "Purchased" : "Need to buy"}
                        </div>

                        <Link
                            to={"/grocery/" + currentGrocery.id}
                            className="btn btn-sm btn-primary"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please select a grocery item.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroceryList;