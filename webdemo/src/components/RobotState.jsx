import React, {Component} from "react";
import {Row, Col, Container, Button} from "react-bootstrap";
import * as Three from "three";
import Config from "../scripts/config";

class RobotState extends Component {
    state= {
        ros:null,
        x:0,
        y:0,
        orientation:0,
        linear_velocity:0,
        angular_velocity:0,
    };

    constructor() {
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection established");
            this.setState({connected: true});
        });

        // this.state.ros.on("close", () =>{
        //     console.log("connection is closed");
        //     this.setState({connected: false});
            // reconnect function
            // setTimeout(() => {
            //     try {
            //         this.state.ros.connect("ws://10.242.28.135:9090");
            //     } catch (error) {
            //         console.log("connection problem");
            //     }
            // }, 5000);

        // });
        
        // try {
        //     this.state.ros.connect("ws://10.242.28.135:9090");
        // } catch (error) {
        //     console.log("connection problem");
        // }
    }

    componentDidMount() {
        this.getRobotState();
    }

    getRobotState(){
    //pose subcriber
    var pose_subscriber = new window.ROSLIB.Topic({
        ros: this.state.ros, 
        name: Config.POSE_TOPIC,
        messageType: "gemeotry_msge/PoseWithCovarianceStamped",

    });

    //pose callback
    pose_subscriber.subscribe((message)=>{
        this.setState({x: message.pose.pose.position.x.toFixed(2)});
        this.setState({y: message.pose.pose.position.y.toFixed(2)});
        this.setState({orientation: this.getOrientationFromQuaternion (
            message.pose.pose.orientation
        ).toFixed(2),
        
        });
    });

    //sub for vel
    var velocity_subscriber = new window.ROSLIB.Topic({
        ros: this.state.ros, 
        name: Config.ODOM_TOPIC,
        messageType: "nav_msgs/Odometry",
    });
    //odom callback
    velocity_subscriber.subscribe((message)=>{
        this.setState({linear_velocity: message.twist.twist.linear.x.toFixed(2)});
        this.setState({angular_velocity: message.twist.twist.angular.z.toFixed(2)});

       
    });

    }

    getOrientationFromQuaternion(ros_orientation_quaternion){
        var q = new Three.Quaternion(
            ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w,
        )

        //convert into roll pitch yaw
        var RPY = new Three.Euler().setFromQuaternion(q);

        return RPY["_z"] * (180 / Math.PI);

    }
    render() {
        return (
        <div>
            <Row>
                <Col>
                    <h4 className="mt-4">Position</h4>
                    <p className="mt-0">x: {this.state.x}</p>
                    <p className="mt-0">y: {this.state.y}</p>
                    <p className="mt-0">Orientaion: {this.state.orientation}</p>
                </Col>    
            </Row>

              <Row>
                <Col>
                    <h4 className="mt-4">Velocity</h4>
                    <p className="mt-0">Linear Velocity: {this.state.linear_velocity}</p>
                    <p className="mt-0">Angular Velocity: {this.state.angular_velocity}</p>
                </Col>    
            </Row> 
        </div>
        );
    }
}

export default RobotState;