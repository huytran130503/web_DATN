import React, {Component} from "react";
import { Joystick } from 'react-joystick-component'; 

class Teleoperation extends Component {
    state = {ros: null};

    constructor() {
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
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



    handleMove(event) {
        //ROS publisher
        var cmd_vel = new  window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "",
            messageType: "geometry_msgs/Twist",
        });

        //twisted message
        var twist = new window.ROSLIB.Message(
            {
                linear:{
                    x: event.y / 50,
                    y:0,
                    z:0,
                },
    
                angular:{
                    x:0,
                    y:0,
                    z: event.x / 50,
                },
            }
        );
        //message publish
        cmd_vel.publish(twist);
    }

    handleStop() {
        console.log("handle stop");
        // Ros publisher on the topic cmd_vel
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name:"",
            messageType: "geometry_msgs/Twist",
        })    
        //twisted message
        var twist = new window.ROSLIB.Message(
            {
                linear:{
                    x:0,
                    y:0,
                    z:0,
                },
    
                angular:{
                    x:0,
                    y:0,
                    z:0,
                },
            }
        );
        //message publish
        cmd_vel.publish(twist);
    }


    render() {
        return(
            <h2>
                <Joystick 
                size={100} 
                sticky={true} 
                baseColor="#EEEEEE" 
                stickColor="#BBBBBB" 
                move={this.handleMove} 
                stop={this.handleStop}>
                </Joystick>
            </h2>
        );
    }
}

export default Teleoperation;