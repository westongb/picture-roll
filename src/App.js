import React, { Component} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Draper from "./SearchCourses";
import Menu from "./Menu";
import Main from "./Main";


function App() {
  return (
    <div className="App">
      <div className="Menu">
      <Menu/>
      </div>
      <div>
      {/* <Router>
      <Route exact path="/" exact component={Main}/>
     <Route exact path="/Draper" exact component={Draper} />
        </Router> */}
     </div>
     </div>
   );
  }


export default App;
