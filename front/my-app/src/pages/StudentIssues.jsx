import DashboardStudent from "./DashboardStudent"
import './styles/student.css';

function StudentIssues(){
  return(<div>
          <DashboardStudent/>
          <p className="content">
            No pending or file issues
            </p>
  </div>)
}
export default StudentIssues