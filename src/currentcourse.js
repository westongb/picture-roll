import React, { useState, useEffect } from "react";
import './currentcourse.css';


export default function CurrentCourse(props){

    useEffect(() => {
        getCourse({});
    },[]);

   const [classes, setClasses] = useState('')

    const[time, setTime] = useState()


    function getCourse(res){
        fetch("http://localhost:5000/classes/get", {
            method: "GET"
        })
        .then((res)=> { return res.json();
        })
        .then((res) =>{
            setClasses(res);
         

        },
        // (error) => {
        //     setClasses("error")
        // }
        )
    }

    var classDate;
    var timeBetweenClasses;
    var futureDates;

   
  
    var i;
    // console.log(classes)

    if(classes != "") {
     const nextClass = classes.map((item, i) => {
         classDate = new Date(item.StartDate)
        timeBetweenClasses= Date.parse(classDate) ;  
        var dateList = Array.from(timeBetweenClasses);
        futureDates = dateList.filter(dateList => dateList > 1);
        console.log(futureDates)
     
     })}

  

    return(
        <div id="currentCourse">
            <div>
            <h1>{props.Course}</h1>
            <img id="locationImage" src={props.image}></img>
            </div>
            <span>Current Class dates</span>
            <span>Current Class dates</span>
        </div>
    );

}

