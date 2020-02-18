import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Current from "./SearchCourses";
import Main from "./Main";
import "./App.css";
import AddClass from "./Forms/Add_Class";
import AddStudent from "./Forms/AddStudent";
import ClassList from "./Forms/ClassList";
import './Menu.css';
import LoginScreen from "./Authorization/Login";
import CreateUser from "./Authorization/CreateUser";

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
                <Link to="/" className='menuLink'>Home</Link>
                </li>
                <li>
                <Link to="/current" className='menuLink'>Course Roster</Link>
                </li>
                <li>
                <Link to="/CourseList" className='menuLink'>Courses List</Link>
                </li>
                <li>
                <Link to="/login" className='menuLink'>Login</Link>
                </li>
                 {/* <li>
                <Link to="/login/CreateUser" className='menuLink'>CreateUser</Link>
                </li> */}
                {/* <li>
                <Link to="/addstudent">Add Student</Link>
                </li> */}
                </ul>
             
            </span>
          </nav>
          <Switch>
          <Route exact path="/" component={Main}/>
          <Route path="/current" component={Current}/>
          <Route path="/CourseList" component={ClassList}/>
          <Route path="/addstudent" component={AddStudent}/>
          <Route exact path="/login" component={LoginScreen}/>
          <Route exact path="/login/CreateUser" component={CreateUser}/>
          <Route path="*" component={()=> <h1>404 Not Found</h1>}/>
          
          </Switch>
        </div>
        </Router>
    );
}

}

export default Menu;