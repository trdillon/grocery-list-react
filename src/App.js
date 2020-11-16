import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return(
      <div className="app">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
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
            </div>
        </nav>

        <div className="container mt-3">
            <Switch>
                <Route exact path={["/", "/grocery"]} component={GroceryList} />
                <Route exact path="/add" component={AddGrocery} />
                <Route path="/grocery/:id" component={Grocery} />
            </Switch>
        </div>
      </div>
  );
}

export default App;
