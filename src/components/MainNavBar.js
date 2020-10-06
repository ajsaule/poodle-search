import React from 'react'

export default function MainNavBar() {
    return (
        <div className="nav-bar">
            <div>
                <a href="#">About</a>
                <a href="#">Store</a>
            </div>
            <div>
                <a href="#">Gmail</a>
                <a href="#">Images</a>
                <input type="button" value="Sign In" />
            </div>
        </div>
    )
}
