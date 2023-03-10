/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import './register.css';
import uploadImg from '../../assets/undraw-upload-re-pasx.png';

export default function Login() {
  return (
    <div className="login">
      <div className="left">
        <div className="identity">
          <div className="identity-text">
            Design APIs fast, <br />
            Manage content easily.
          </div>
          <img src={uploadImg} alt="upload" />
        </div>
      </div>
      <RegisterForm />
    </div>
  );
}
