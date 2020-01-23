import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from "./Forms/StudentsModal";
import ClassModal from "./Forms/ClassModal";

export default function Current() {

   

    useEffect(() => {
        getCourse({})
       
    },[]);


//get classs data
    function getCourse(res){
        fetch("http://localhost:5000/classes/get", {
            method: "GET"
        })
        .then((res)=> { return res.json();
        })
        .then((res) =>{
            setClasses(res)
            return console.log(res)
        },
        // (error) => {
        //     setClasses("error")
        // }
        )
    }
    
//set up State
    const [selectedCourse, setSelectedCourse] = useState()

    const SelectedCourseContext = React.createContext(selectedCourse);

    const [classes, setClasses] = useState("")
    
//set up variables for deconstruction
    let Course;
    let courseList;
    let classesList;
    let classCampus;
    let classStartDate;
    let className;
    let courseText;
    
//deconstruct Get

if(classes != "") {
    console.log(classes);
    classesList = classes.map( (item,i) => {
        let itemIdex = item[i];
        className = item.ClassName;
        classStartDate = item.StartDate;
        classCampus = item.Campus;
        
        Course = className+classStartDate+classCampus;
        console.log(Course)
        return(
    <option value={Course}>{Course}</option>
        )
    })
}   

console.log(classes)


//Table of student info









    return(
        <div>
            <div>
            <h1>Lets see if this works. </h1>
            <form>
            <label>Course</label>
                    <select onChange={(e)=> setSelectedCourse(e.target.value)}>
                        <option value="default">Select Class</option>
                        {classesList}
                     </select>
            </form>
            <Modal/>
            <ClassModal/>
            </div>
            
        </div>
    );
}


