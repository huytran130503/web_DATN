import React, {Component} from "react";
import Container from "react-bootstrap/esm/Container";

class Footer extends Component {
    state= {};
    render() {
        return (
        <Container className="text-center">
        <p>DATN - ROS Project &copy; 2024 - 2025</p>
        </Container>
        );
    }
}

export default Footer;