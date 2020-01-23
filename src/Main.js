import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Current from "./SearchCourses";
import Menu from "./Menu";
import CurrentCourse from "./currentcourse";


function Main() {
  return (
    <div className="Main">
     <body>
       <h1>
         Helio Training Student Directory
       </h1>
       <img className='banner-image' src="https://mlsvc01-prod.s3.amazonaws.com/f00d6b51601/52e318fe-7810-4371-9687-b774b1b301a8.jpg"></img>
       <h2>
         Check Out Our Students
       </h2>
       <p>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 

ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
       </p>
       <h2>
         Current Courses
       </h2>
       <div id="currentCourse">
            <CurrentCourse image='https://mlsvc01-prod.s3.amazonaws.com/f00d6b51601/8bfbe04b-f7f5-4fcb-91e2-6a27f111aa71.jpg' Course='Draper'/>
       </div>
       <br></br>
       <div id="currentCourse">
            <CurrentCourse image='https://mlsvc01-prod.s3.amazonaws.com/f00d6b51601/37a332d9-7b5c-4460-8ccb-33ee61b34fa8.jpg' Course='Salt Lake City'/>
       </div>
     </body>
     <footer>
         <div></div>
     </footer>

    </div>

  );
}



export default Main;