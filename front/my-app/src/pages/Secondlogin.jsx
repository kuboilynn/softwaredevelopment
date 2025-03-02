import './Secondlogin.css';
import makererelogo from '../assets/makererelogo.png';
function Secondlogin(){
    return ( 
    <div className="LoginContainer">
    <img src={makererelogo} alt="Makerere University Logo" className='Logo' />
    <p>Are you signing in as a;</p>
    <div className='Buttons'>
        <button className='LecturerloginButton'>
            LECTURER
        </button>   <br />
        
        <button className='RegistrarloginButton'>
            REGISTRAR
        </button>    <br />

        <button className='StudentloginButton'>
            STUDENT
        </button>
        <br />
        </div>

        <p>Already have an account?</p> 
        <h2 className='loginText'>
            <a href="/login">Log in</a> 
        </h2>

        </div>

     )
}
export default Secondlogin