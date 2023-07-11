import React, { useEffect, useState } from 'react';
import "../styles/Nav.css";
import Logo from "../assets/img/LogoNetflix.png"
import avatar from "../assets/img/Netflix-avatar.png"

export const Nav = () => {

    const [show, handleShow] = useState(false);

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar)
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img
                    src={Logo}
                    alt="Netflix Logo"
                    className='nav__logo'
                />
                <img
                    src={avatar}
                    alt="Netflix Avatar"
                    className='nav__avatar'
                />
            </div>

        </div>
    )
}
