import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Current from "./SearchCourses";
import Main from "./Main";
import "./App.css";
import AddClass from "./Forms/Add_Class";
import AddStudent from "./Forms/AddStudent";

class Menu extends Component {
    constructor (props) {
        super(props);
    }

render(props) {
    return(
        <Router>
        <div >
          <nav className="Menu">
             
            <span className="menuItems">
            <span>
                  <img id="logo" src="https://mlsvc01-prod.s3.amazonaws.com/f00d6b51601/a41c9498-e1d7-4233-83b9-cd81016e8845.png"></img>
              </span>
                <ul id="navigation">
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
              <Link to="/current">Search Courses</Link>
              </li>
              {/* <li>
              <Link to="/addclass">Add Courses</Link>
              </li>
              <li>
              <Link to="/addstudent">Add Student</Link>
              </li> */}
              </ul>
            </span>
          </nav>
          <Route exact path="/" component={Main}/>
          <Route path="/current" component={Current}/>
          <Route path="/addclass" component={AddClass}/>
          <Route path="/addstudent" component={AddStudent}/>
        </div>
    
        </Router>
    );
}

}

export default Menu;