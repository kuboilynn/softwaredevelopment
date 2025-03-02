import './Firstloginpage.css';
import makererelogo from '../assets/makererelogo.png';
function Firstloginpage(){
    return ( 
    <div className="FirstLoginContainer">
    <img src={makererelogo} alt="Makerere University Logo" className='Logo' />
    <div className='FirstButtons'>
        <button className='loginButton'>
            LOG IN
        </button>   <br />
        
        <button className='RegisterButton'>
            REGISTER
        </button>    <br />

    </div>
        </div>

     )
}
export default Firstloginpage