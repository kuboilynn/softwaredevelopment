import DashboardStudent from "./DashboardStudent"
import './styles/StudentHome.css';
import Input from "../UI/input";
import Select from "../UI/select";
import Button from "../UI/Button"
import { useState } from "react";

function FileIssue(){
  
    // State to manage if the radio button is checked or not
      const [isRadioChecked, setIsRadioChecked] = useState("");
  
    // Handle radio button change
    const handleRadioChange = (event) => {
      setIsRadioChecked(event.target.checked);
    };
  return(<div>
          <DashboardStudent/>
          <form className="content-file"> 
            <div>
            <label>
            Time of study
            <Select>
              <option>Day</option>
              <option>Evening</option>
            </Select>
              </label>
            
            </div><br/>
            <div>
            <label>Course Unit</label>
            <Input type=""></Input>
            </div><br/>
            <div>
            <label>Lecturer</label>
            <Input type=""></Input>  
            </div><br/>
            <div>
            <div>
            <label>Type of Issue</label><br/>
            
            <label>
            <input type="radio" value="course work" name="choice"></input>
              couser work</label>
            
            
            <label>
            <input type="radio" value="final exam" name="choice"></input>
              final exam</label>

              <label>
            <input type="radio" value="both" name="choice"></input>
              both</label>
            
            <label>
            <input type="radio"value="other" name="choice" checked={isRadioChecked}
          onChange={handleRadioChange}></input>
              other</label>
             
            </div><br/>
            </div>
            {isRadioChecked && (
        <div>
          <label htmlFor="textInput">Enter some text:</label>
          <Input type="text" id="textInput" />
        </div>
      )}
           
            <Button>Submit</Button>
            

          </form>

            
         
    </div>)}
  
export default FileIssue