import React from "react";
import BookView from "./book/bookView";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavMenu = () => (
    <Router>
        <div>
        <Route exact path="/" component={BookView} />
        </div>
    </Router>
);

export default NavMenu;
