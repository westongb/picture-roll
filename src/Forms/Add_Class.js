import React, { useState, useEffect } from "react";
import './Add_Class.css';

export default function AddClass() {

    useEffect(() => {
        getCourse({})
    },[]);

    const [classes, setClasses] = useState("");
    const [className, setClassName] = useState("");
    const [classStartDate, setClassStartDate] = useState("")
    const [classEndDate, setClassEndDate] = useState("")
    const [classCampus, setClassCampus] = useState("")

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


    function postCourse(res){
        fetch("http://localhost:5000/classes/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                ClassName:className,
                Campus: classCampus,
                StartDate: classStartDate,
                EndDate: classEndDate
                
            })
            
        }).then(
            res=> console.log("this Worked")
        )
    }

    let Course;
    let courseList;
    let classesList;
    let liClassCampus;
    let liClassStartDate;
    let liClassName;
    let courseText;
    
//deconstruct Get

if(classes != "") {
    
    classesList = classes.map( (item,i) => {
        let itemIdex = item[i];
        liClassName = item.ClassName;
        liClassStartDate = item.StartDate;
        liClassCampus = item.Campus;
        
        Course = liClassName+"-"+liClassStartDate+"-"+liClassCampus;
      
        return(
                <li>{Course}</li>
        )
    })
}   



const handleSubmit = (e) => {
    e.preventDefault();
    postCourse();
    getCourse();
}

const submitClasses = () => {


}


return(
        <div>
            <form
                className='New_Class_Form'
                onSubmit={handleSubmit}
            >
                <h1>Add A Class</h1>
                <br></br>
                <lable className='formLabel'>Class Name</lable>
                <select option="option" value={className}
                    onChange={e => setClassName(e.target.value)}
                >
                    <option>Full Stack Immersive</option>
                     <option>Full Stack After Hours LVL1</option>
                     <option>Full Stack After Hours LVL2</option>
                     <option>UIUX Design</option>
                </select>
                <br></br>
                <label className='formLabel'>Start Date</label>
                <input 
                type='text'
                value={classStartDate}
                    onChange={e => setClassStartDate(e.target.value)}
                ></input>
                <br></br>
                <label className='formLabel'>End Date</label>
                <input 
                type='text'
                value={classEndDate}
                onChange={e => setClassEndDate(e.target.value)}
                ></input>
                <br></br>
                <label className='formLabel'>Campus</label>
                <select 
                
                value={classCampus}
                onChange={e => setClassCampus(e.target.value)}
                    
                >
                    <option>Draper</option>
                    <option>SLC</option>
                </select>
                <button>Submit</button>
            </form>
        </div>

);
}