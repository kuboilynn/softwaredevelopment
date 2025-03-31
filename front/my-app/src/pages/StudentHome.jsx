import DashboardStudent from "./DashboardStudent"
import './styles/student.css';


function StudentHome(){
  return(<div>
          <DashboardStudent/>
          <div className="content-home">
            <div className="sidebar">
              <p>Messages</p>
            </div>
            </div>
  </div>)
};
export default StudentHome