import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Footer.scss'


function Footer(props) {
  return (
    <nav className="footer">
      <ul className="footer__links flex_row">
        <li className="copyright footer__box">&#169; 2021 Editeur</li>
        <li className="footer__box flex_center">
          <Link to="/" className="footer__link text-center">Главная</Link>
          <Link to="/books" className="footer__link text-center">Книги</Link>
          <Link to="/projectTeam" className="footer__link text-center">Контакты</Link>
        </li>
        <li className="footer__box footer__link_right">
          <a href="https://github.com/nikitoi/no-publishers-project" className="footer__a github footer__link"><img className="github" src="./images/github5.png" alt="github-icon" /></a>
        </li>
      </ul>
    </nav>
  );
}

export default Footer;
