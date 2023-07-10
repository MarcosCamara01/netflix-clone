import React, { useEffect, useState } from 'react';
import "../styles/Nav.css";

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
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                    alt="Netflix Logo"
                    className='nav__logo'
                />
                <img
                    src="https://i.pinimg.com/550x/0c/91/71/0c9171ce965fb4ec175c2b001516e754.jpg"
                    alt="Netflix Avatar"
                    className='nav__avatar'
                />
            </div>

        </div>
    )
}
