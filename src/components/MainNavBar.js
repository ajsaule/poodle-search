import React from 'react'

export default function MainNavBar() {
    return (
        <div className="nav-bar">
            <ul className="menu">
                <li className="menu-left">
                    <a  href="#about">About</a>
                </li>
                <li className="menu-left">
                    <a  href="#store">Store</a>
                </li>
                <li className="menu-right ml-auto">
                    <a  href="#gmail">Gmail</a>
                </li>
                <li className="menu-right">
                    <a  href="#images">Images</a>
                </li>
                <li className="menu-right">
                    <input type="button" value="Sign In" />
                </li>
            </ul>
        </div>
    )
}
