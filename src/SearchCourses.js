import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Modal from "./Forms/StudentsModal";
import ClassModal from "./Forms/ClassModal";
import ClassRoster from "./StudentTable";

export default function Current() {

   

    useEffect(() => {
        getCourse({})
    },[]);

    useEffect(() => {
        getStudents({})
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

    
  //get Student data
  function getStudents(res){
    fetch("http://localhost:5000/students/"+ selectedCourse, {
        method: "GET"
    })
    .then((res)=> { return res.json();
    })
    .then((res) =>{
        setClassRoster(res)
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

    const [classes, setClasses] = useState("");

    const [classRoster, setClassRoster] = useState('');
    
//set up variables for Classes deconstruction
    let Course;
    let courseList;
    let classesList;
    let classCampus;
    let classStartDate;
    let className;
    let courseText;
    
//deconstruct Get

if(classes != "") {
    
    classesList = classes.map( (item,i) => {
        let itemIdex = item[i];
        className = item.ClassName;
        classStartDate = item.StartDate;
        classCampus = item.Campus;
        
        Course = className+" "+classStartDate+" "+classCampus;
      
        return(
    <option value={Course}>{Course}</option>
        )
    })
}   


const changeCourse = (e) => {
    setSelectedCourse(e.target.value)
                        getStudents()
}


//Select Class Drop Down

    return(
        <div>
            <div>
            <h1>Lets see if this works. </h1>
            <div>
            <form>
            <label>Course</label> 
                    <select onChange={
                        changeCourse
                    }>
                        <option value="default">Select Class</option>
                        {classesList}
                     </select>
                     
            </form>
           
            </div>
            <Modal/>
            <ClassModal/>
            </div>
            <br></br>
            <ClassRoster classList={classRoster}/>
        </div>
    );
}


