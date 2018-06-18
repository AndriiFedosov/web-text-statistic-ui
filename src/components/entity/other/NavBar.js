import React, { Component } from 'react';
import { Link } from "react-router-dom";
import head from '../../../resources/head.png'

class NavBar extends Component{
    render(){
        return(
            <div>
                    <nav className="header navbar navbar-expand-lg ">
                        <div className="container">
                            <ul className="navbar-nav mr-auto vertical">
                                <li><Link to={'/'} >
                                    <img src={head} alt="head" style={{
                                        height:'2.8em',width:'2.8em'}}/>
                                </Link></li>
                                <li><Link to={'/'} className="nav-link">Главная </Link></li>
                                <li><Link to={'/texts/upload'} className="nav-link">Загрузить текст</Link></li>
                                <li><Link to={'/texts'} className="nav-link">Все тексты</Link></li>
                            </ul>
                        </div>
                    </nav>
            </div>
        );
    }
}
export default NavBar;