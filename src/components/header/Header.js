import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './Header.css'


class Header extends Component {
    render() {
        return (
            <header className="header page__header">
                <div className="container header__container">
                    <Link to="/courses" className="header__logo">OTUS</Link>
					<Link to="/courses" className="header__menu_item" id="courses_menu_item">Курсы</Link>
                    <Link to="/login" className="header__menu_item_right">Вход</Link>
					<Link to="/register" className="header__menu_item">Регистрация</Link>
                    <Link to="/account" className="header__menu_item">Мой профиль</Link>
                </div>
            </header>
        );
    }
}

export default Header;
