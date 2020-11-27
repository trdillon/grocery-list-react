import React, { Component } from 'react';
import {Link, Route, Switch} from "react-router-dom";
import GroceryList from "./GroceryList";
import AddGrocery from "./AddGrocery";
import FavoritesList from "./FavoritesList";
import Grocery from "./Grocery";

class Header extends Component {

    render() {
        return(
            <header id="nav">
                <nav className="navbar navbar-expand navbar-dark">
                    <a href="https://itsdits.com" className="navbar-brand">
                        itsdits
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/grocery"} className="nav-link">
                                Grocery List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/favs"} className="nav-link">
                                Favorites
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/grocery"]} component={GroceryList} />
                        <Route exact path="/add" component={AddGrocery} />
                        <Route exact path="/favs" component={FavoritesList} />
                        <Route path="/grocery/:id" component={Grocery} />
                    </Switch>
                </div>
            </header>
        );
    }
}

export default Header;