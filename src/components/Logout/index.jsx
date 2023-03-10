import React from 'react';
import './Logout.css';
import { Link } from 'react-router-dom';

export default function Logout() {
  const removeToken = () => {
    localStorage.removeItem('token');
  };
  return (
    <Link to="/login">
      <button type="button" className="logout" onClick={removeToken}>
        Logout
      </button>
    </Link>
  );
}
