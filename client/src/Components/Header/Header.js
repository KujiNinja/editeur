import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo/Logo'
import './Header.scss'


function Header() {

  const history = useHistory();
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError('')
    try {
      await logout()
      history.push('/')
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <nav className="header">
      <Link to="/" className="header__link"><Logo /></Link>
      <ul className="header__links">
        <li className="header__link">
          <Link to="/" className="header__link link">Главная</Link>
        </li>
        <li className="header__link">
          <Link to="/books" className="header__link link">Книги</Link>
        </li>
        <li className="header__link">
          {currentUser ?
            <Link to="/user" className="header__link link">Кабинет</Link> :
            <Link to="/login" className="header__link link">Кабинет</Link>
          }

        </li>
        {error && <p>{error}</p>}
        {currentUser === null ?
          <li className="header__link">
            <Link to="/login" className="header__link link">Войти</Link>
          </li> :
          <li className="header__link">
            <Link to="/" onClick={handleLogout} className="header__link link">Выйти</Link>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Header;
