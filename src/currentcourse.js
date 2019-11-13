import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './currentcourse.css';


class CurrentCourse extends Component {
    constructor (props) {
        super(props);
    }

render(props) {
    return(
        <div id="currentCourse">
            <div>
            <h1>{this.props.Course}</h1>
            <img id="locationImage" src={this.props.image}></img>
            </div>
            <span>Current Class dates</span>
            <span>Current Class dates</span>
        </div>
    );
}
}

export default CurrentCourse;