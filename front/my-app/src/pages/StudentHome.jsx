import DashboardStudent from "./DashboardStudent"
import './styles/student.css';



function StudentHome(){
   
 const messages=[{ id:1, text:"welcome to AITs",sender:"admin",time:"10:20 am"}
 ]


  return(<div>
          <DashboardStudent/>
          <div className="content-home">
            <div>
            <p>Welcome to easy problem solving</p>
            </div>
           
            <div className="sidebar">
              Messages
              <div>
                <span>{messages.id}</span>
                <p>{messages.text}</p>
                <span>{messages.sender}</span>
                <span>{messages.time}</span>
              </div>
            </div>
            </div>
  </div>)
};
export default StudentHome