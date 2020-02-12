import React from 'react'

function NavbarItem(props) {
    return (
        <li className="nav-item">
            <a className="nav-link" onClick={props.onClick} href={props.link}>{props.label}</a>
        </li>
    )
}

export default NavbarItem;