import DashboardStudent from "./DashboardStudent"
import './styles/student.css';
import Input from "../UI/input";
import Select from "../UI/select";
import Button from "../UI/Button"
import { useState } from "react";

function FileIssue(){
  
   
    
  


    const [data,setdata]=useState({
      courseUnit:"",
      lecturer:"",
      issue:"",
      timeFiled: new Date().toLocaleString(),
      resolved: false,

    })
    const[errors,setErrors]=useState("")

    const handleChange=(e)=>{
      setdata({...data,[e.target.name]:e.target.value,});
      setErrors((prevErrors)=>({...prevErrors,[e.target.courseUnit]:"",}));
  };
    const handlesubmit=(e)=>{
      e.preventDefault();

      let newErrors={};
      if(!data.courseUnit.trim()) newErrors.courseUnit="*field Required"
      if(!data.lecturer.trim()) newErrors.lecturer="*field Required"
      if(!data.issue.trim()) newErrors.issue="*field Required"

      if (Object.keys(newErrors).length>0){setErrors(newErrors);
        return;
      }
    }
 
    

  return(<div>
          <DashboardStudent/>
          <form className="content-file"
          onSubmit={handlesubmit}> 

          <div>
            <label>
            Time of study
            <Select >
              <option>Day</option>
              <option>Evening</option>
            </Select>
              </label>
            </div><br/>


            <div>
            <label>Course Unit</label>
            <Input type=""
            name="courseUnit"
            onChange={handleChange}
            placeholder="Enter course Unit" />
              {errors.courseUnit && <p style={{color :"red",fontSize:10,}}>{errors.courseUnit}</p>}
            </div>

            <div>
            <label>Lecturer</label>
            <Input type="email"
            name="lecturer"
            onChange={handleChange}
            placeholder="Enter Lecturer email"/>
            {errors.lecturer && <p style={{color :"red",fontSize:10,}}>{errors.lecturer}</p>}  
            </div><br/>
            <div>
          <input type="text" 
          name="issue"
          id="textInput"
          className="issuebox"
          placeholder="enter issue"/>
          {errors.issue && <p style={{color :"red",fontSize:10,}}>{errors.issue}</p>}
        </div>
           
            <Button>Submit</Button>
          </form> 
    </div>)}
  
export default FileIssue