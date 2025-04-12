import React, { useState, useRef } from 'react';
import { domain } from '../utils/domain';
import { ShieldCheck } from 'lucide-react';
import './styles/forgotPassword.css';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const regRefSuccess = useRef();

  function validateForm() {
    return email.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    regRefSuccess.current.style.display = "block";
    regRefSuccess.current.textContent = "Request password reset link, Please wait...";

    const form = e.target;
    const data = new FormData(form);

    const requestOptions = {
      method: 'POST',
      body: data
    };

    const response = await fetch(`${domain}/accounts/request-password-reset`, requestOptions);

    const resBody = await response.json();
    if (response.ok) {
      regRefSuccess.current.textContent = resBody.message;
      form.reset();
      setEmail("");
    } else {
      regRefSuccess.current.textContent = resBody.error;
    }

    setTimeout(() => {
      regRefSuccess.current.textContent = '';
      regRefSuccess.current.style.display = "none";
    }, 5000);

    setIsPending(false);
  };

  return (
    <div className="forgot-wrapper">
      <motion.div
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="forgot-container"
      >
        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="icon-wrapper">
            <ShieldCheck className="icon" />
          </div>

          <h1 className="forgot-title">Forgot Password</h1>
          <p className="forgot-desc">
            Please provide us with a valid username or email address to send you reset instructions.
          </p>
          <p ref={regRefSuccess} className="forgot-success" style={{ display: "none" }}></p>

          <div className="forgot-form-group">
            <input
              type="text"
              name="email"
              className="forgot-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username or email address"
              aria-label="Username"
            />
          </div>

          {!isPending ? (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              className="forgot-button"
              type="submit"
              disabled={!validateForm()}
            >
              Reset Password
            </motion.button>
          ) : (
            <button className="forgot-button disabled" disabled>
              Requesting Reset Instructions...
            </button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
