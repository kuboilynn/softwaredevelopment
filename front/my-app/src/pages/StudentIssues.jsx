import DashboardStudent from "./DashboardStudent"
import './styles/student.css';

function StudentIssues(){
  const messages=[{ id:1, text:"welcome to AITs",sender:"admin",time:"10:20 am"}
  ]
  return(<div>
          <DashboardStudent/>
          <p className="content">
            No pending or file issues
            </p>
            <div className="sidebar">
              Messages
              <div>
                <span>{messages.id}</span>
                <p>{messages.text}</p>
                <span>{messages.sender}</span>
                <span>{messages.time}</span>
              </div>
            </div>
  </div>)
}
export default StudentIssues