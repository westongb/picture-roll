import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClassModal from './ClassModal';
import './Add_Class.css';

export default function ClassList () {

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

    console.log(classes)
if(classes != "") {
    
    classesList = classes.map( (item,i) => {
        let itemIdex = item[i];
        liClassName = item.ClassName;
        liClassStartDate = item.StartDate;
        liClassCampus = item.Campus;
        
        Course = liClassName+"-"+liClassStartDate+"-"+liClassCampus;
      
        return(
               
<TableRow>
<TableCell>{liClassName}</TableCell>
  <TableCell>{liClassStartDate}</TableCell>
  <TableCell>{liClassCampus}</TableCell>
  <TableCell>{
    <button>Delete</button>
    }</TableCell>
  <TableCell>{<button>Update</button>}</TableCell>
    </TableRow>
        )
    })
}   

return(
    <div>
        <h1>Course List</h1>
        <ClassModal/>
        <br></br>
        <div>
            <Table>
                {classesList}
            </Table>
        </div>
    </div>

);
}