import DashboardStudent from "./DashboardStudent"
import './styles/StudentHome.css';


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