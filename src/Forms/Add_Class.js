import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Add_Class.css';

export default function AddClass() {

const [className, setClassName] = useState("");
const [classStartDate, setClassStartDate] = useState("")
const [classEndDate, setClassEndDate] = useState("")

const handleSubmit = (e) => {
    
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
                <input type='text'
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                ></input>
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
                <button>Submit</button>
            </form>
        </div>

);}