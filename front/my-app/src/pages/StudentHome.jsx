import DashboardStudent from "./DashboardStudent"
import './styles/student.css';





function StudentHome(){
   
 

  return(<div>
          <DashboardStudent/>
          <div className="content-home">
            <div className="home-message">
            welcome to easier problem solving
 Lynn
            </div>
            <p className="message2">
            Looking for a system to make issue filing and follow up easier look no further.
            This is a system developed by fellow students that understand the dillema
            </p>
            </div>
            
  </div>)
};
export default StudentHome