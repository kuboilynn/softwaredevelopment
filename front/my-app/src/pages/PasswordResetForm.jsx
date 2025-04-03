import React, { useState, useRef } from 'react';
import { domain } from '../utils/domain';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import './styles/passwordreset.css';

const PasswordResetForms = () => {
  const { slug, token } = useParams();
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const validatePasswordStrength = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'new_password') {
      setPasswordStrength(validatePasswordStrength(value));
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));
    setMessage({ text: '', type: '' });
  };

  const validateForm = () => {
    const { new_password, confirm_password } = formData;
    const criteria = validatePasswordStrength(new_password);
    let newErrors = {};

    if (!criteria.length) newErrors.new_password = 'Minimum 8 characters required';
    else if (!criteria.uppercase) newErrors.new_password = 'Must include uppercase letter';
    else if (!criteria.lowercase) newErrors.new_password = 'Must include lowercase letter';
    else if (!criteria.number) newErrors.new_password = 'Must include a number';
    else if (!criteria.special) newErrors.new_password = 'Must include special character (!@#$%^&*)';

    
    if (!confirm_password) newErrors.confirm_password = 'Please confirm your password';
    else if (new_password !== confirm_password) newErrors.confirm_password = 'Passwords do not match';
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!validateForm()) return;

    setIsPending(true);
    

    const data = new FormData();
    data.append('new_password', formData.new_password);
    data.append('confirm_password', formData.confirm_password);

    try {
      const res = await fetch(`${domain}/accounts/reset-password/${slug}/${token}`, {
        method: 'POST',
        body: data
      });

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || 'Password reset failed');

      setMessage({ text: response.message || 'Password changed successfully.', type: 'success' });

      setTimeout(() => navigate('/'), 4000);
    } catch (err) {
      setMessage({ text: err.message || 'Something went wrong!', type: 'error' });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-right">
        <form className="reset-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Set a New Password</h1>
          {message.text && (
            <div className={`form-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="input-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="new_password"
                id="newPassword"
                value={formData.new_password}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
              <span onClick={() => setPasswordVisible(!passwordVisible)} className="toggle-icon">
                {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.new_password && <p className="errors">{errors.new_password}</p>}
          </div>

          <ul className="strength-list">
            <li className={passwordStrength.length ? 'pass' : 'fail'}>At least 8 characters</li>
            <li className={passwordStrength.uppercase ? 'pass' : 'fail'}>One uppercase letter</li>
            <li className={passwordStrength.lowercase ? 'pass' : 'fail'}>One lowercase letter</li>
            <li className={passwordStrength.number ? 'pass' : 'fail'}>One number</li>
            <li className={passwordStrength.special ? 'pass' : 'fail'}>One special character (!@#$%^&*)</li>
          </ul>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="confirm_password"
                id="confirmPassword"
                value={formData.confirm_password}
                onChange={handleInputChange}
                placeholder="Confirm password"
              />
              <span onClick={() => setPasswordVisible(!passwordVisible)} className="toggle-icon">
                {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.confirm_password && <p className="errors">{errors.confirm_password}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="submit-btn"
            disabled={isPending}
          >
            {isPending ? 'Changing Password...' : 'Change Password'}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForms;
