import DashboardRegistrar from './Dashboard';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Input from '../UI/input';
import "../pages/styles/contact.css";
import '../pages/styles/student.css';
function Contact(){
  
      const [message, setMessage] = useState("");
      const[statusMessage, setStatusMessage] = useState("");
      const sendMessage =()=>{
          if (message.trim()===""){
              setStatusMessage("Please write a message before sending.")
              return;
          }
          setTimeout(() => {
            setStatusMessage("Message sent successfully!");
            setMessage("");
           
          }, 1000);
        };
  return(<>
  <DashboardRegistrar/>
  <form>
 <div className='content'>
        <label>Message:</label>
          <textarea className='textarea'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Write your message here..."></textarea>
          <div>
            <Input placeholder='Enter Email'></Input>
            <p>Use <Link className='link'>Phone</Link> instead</p>
          </div>
    <button className="Message-button" onClick={sendMessage}>Send Message</button>
    <div className="message">{statusMessage}</div>
    </div>
    </form>
  </>)
}

export default Contact