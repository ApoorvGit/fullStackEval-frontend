/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-parens */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const [loginMessage, setLoginMessage] = React.useState('');
  const navigate = useNavigate();
  const emailHandler = e => {
    setEmail(e.target.value);
  };
  const passwordHandler = e => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const submitHandler = () => {
    axios
      .post('http://localhost:5000/login', {
        email,
        password,
      })
      .then(response => {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch(() => {
        setLoginMessage('*Invalid email or password');
      });
  };
  return (
    <div className="login-form">
      <div className="login-form-title">Login to your CMS+ account</div>
      <div className="login-message">{loginMessage}</div>
      <div className="login-form-input">
        <p>Email</p>
        <input type="text" onChange={emailHandler} />
        <p>Password</p>
        <input type="password" onChange={passwordHandler} />
        <br />
        <button type="submit" onClick={submitHandler}>
          Login
        </button>
        <p className="text-center">Forgot Password?</p>
        <p className="text-center" onClick={() => navigate('/register')}>
          Register
        </p>
      </div>
    </div>
  );
}
