import DashboardStudent from "./DashboardStudent"
import './styles/student.css';
import Input from "../UI/input";
import Select from "../UI/select";
import Button from "../UI/Button"
import { useState } from "react";

function FileIssue(){
  
   
    const [isRadioChecked, setIsRadioChecked] = useState("");
    const handleRadioChange = (event) => {
      setIsRadioChecked(event.target.value);
  };
  


    const [data,setdata]=useState({
      courseUnit:"",
      lecturer:"",
      issueType:"",
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
      if(!data.issueType.trim()) newErrors.issueType="*field Required"

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
            <Input type=""
            name="lecturer"
            onChange={handleChange}
            placeholder="Enter Lecturer"/>
            {errors.lecturer && <p style={{color :"red",fontSize:10,}}>{errors.lecturer}</p>}  
            </div><br/>
            <div>
            <div>
            <label>Type of Issue</label><br/>
            <div >
            <label>
            <input type="radio"
             value="course work" 
             name="choice" 
             checked={isRadioChecked==="course work"}
             onChange={handleRadioChange}></input>
              course work</label>
            
            
            <label>
            <input type="radio" 
            value="final exam" 
            name="choice"
            checked={isRadioChecked==="final exam"}
            onChange={handleRadioChange}></input>
              final exam</label>

              <label>
            <input type="radio"
             value="both" 
             name="choice"
             checked={isRadioChecked==="both"}
             onChange={handleRadioChange}>
              
             </input>
              both</label>
            
            <label>
            <input type="radio"
            value="other" 
            name="choice" 
            checked={isRadioChecked==="other"}
          onChange={handleRadioChange}
          ></input>
              other</label>
             
            </div><br/>
            </div>
            </div>
            {isRadioChecked==="other" && (
        <div>
          
          <input type="text" 
          id="textInput"
          style={{width:200,height:100}} 
          placeholder="enter other information"/>
        </div>
      )}
           
            <Button>Submit</Button>
            

          </form>

            
         
    </div>)}
  
export default FileIssue