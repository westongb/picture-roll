import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default function Current() {

    useEffect(() => {
        getCourse({})
       
    },[]);

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

    

    const [classes, setClasses] = useState("")
    
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
    <div>
    <option value={Course}>{Course}</option>
    </div>
        )
    })
}   

console.log(classes)

    return(
        <div>
            <h1>Lets see if this works. </h1>
            <form>
            <label>Course</label>
                    <select>
                        <option>{classesList}</option>
                     </select>
            </form>
            <button>Add Course</button>
            <button>Add Student</button>
        </div>
    );
}


