import DashboardRegistrar from './Dashboard';
import '../pages/styles/student.css';

function Home(){
  return(<>
 
  <DashboardRegistrar/>
  <div className='sidebar'>
    <p>messages</p>

  </div>
  </>)
}

export default Home