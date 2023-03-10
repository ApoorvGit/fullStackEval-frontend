/* eslint-disable arrow-parens */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loginMessage, setLoginMessage] = React.useState('');

  const navigate = useNavigate();
  const emailHandler = e => {
    setEmail(e.target.value);
  };
  const passwordHandler = e => {
    setPassword(e.target.value);
  };
  const confirmPasswordHandler = e => {
    setConfirmPassword(e.target.value);
  };
  const submitHandler = () => {
    if (password !== confirmPassword) {
      setLoginMessage('*Passwords do not match');
      setConfirmPassword('');
      setPassword('');
      return;
    }
    axios
      .post('http://localhost:5000/register', {
        email,
        password,
      })
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        setLoginMessage(error.response.data.message);
      });
  };
  return (
    <div className="login-form">
      <div className="login-form-title">Register to your CMS+ account</div>
      <div className="login-message">{loginMessage}</div>
      <div className="login-form-input">
        <p>Email</p>
        <input type="text" onChange={emailHandler} />
        <p>Password</p>
        <input type="password" onChange={passwordHandler} />
        <p>Confirm Password</p>
        <input type="password" onChange={confirmPasswordHandler} />
        <br />
        <button type="submit" onClick={submitHandler}>
          Login
        </button>
        <p className="text-center">Forgot Password?</p>
      </div>
    </div>
  );
}
