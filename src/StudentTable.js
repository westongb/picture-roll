import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Forms/Add_Class.css';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function SimpleTable(props) {

  useEffect(() => {
    getImage({})
},[]);

const [defaultImage, setDefaultImage] = useState(null)

  function getImage() {
    fetch("http://localhost:5000/Public/JohnDoe.png", {
      method: "GET"
  })
  .then(res=> res.blob()
  )
  .then(images => {
    // Then create a local URL for that image and print it 
    url = URL.createObjectURL(images)
    
})
  }




let url;
let tablerows;
let studentImage;
let studentName;
let Course;
let studentSurvey;

const imageURL = `https://helio-student-photos.s3-us-west-1.amazonaws.com/${studentName}.jpg`


if(props.classList != "") {
tablerows = props.classList.map((item, i) => {
  studentImage = item.studentImage;
  studentName = item.studentName;
  Course = item.course;
  studentSurvey = item.studentSurvey;




  return(
    <TableRow>
<TableCell><img src={`https://helio-student-photos.s3-us-west-1.amazonaws.com/${studentName}.jpg`} className="studentImage"/></TableCell>
  <TableCell>{studentName}</TableCell>
  <TableCell>{Course}</TableCell>
  <TableCell>{studentSurvey}</TableCell>
  <TableCell>{
    <button>Delete</button>
    }</TableCell>
  <TableCell>{<button>Update</button>}</TableCell>
    </TableRow>
  )

})
}

console.log(props.classList)

  
  const classes = useStyles();



  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell >Course</TableCell>
            <TableCell >Survey</TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tablerows}
         </TableBody>
      </Table>
    </TableContainer>
  );
}

