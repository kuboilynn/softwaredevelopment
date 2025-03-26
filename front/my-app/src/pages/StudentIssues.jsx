import DashboardStudent from "./DashboardStudent"
import './styles/StudentHome.css';

function StudentIssues(){
  return(<div>
          <DashboardStudent/>
          <p className="content">
            No pending or file issues
            </p>
  </div>)
}
export default StudentIssues