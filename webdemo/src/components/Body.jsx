import React, {Component} from "react";
import  Container  from "react-bootstrap/esm/Container.js";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import About from "./About.jsx";
import Home from "./Home.jsx";

class Body extends Component {
    render() {
        return (
        <Container>
            <Router>
            <Routes>
                <Route path="/home" exact element={<Home />}></Route>
                <Route path="/about"  exact element={<About />}></Route>
            </Routes>    
            </Router>    
                
        </Container>    
    );
    }
}

export default Body;