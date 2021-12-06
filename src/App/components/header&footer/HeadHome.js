import React from "react"
import {NavLink} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import logo from '../../../css/img/icon-left-font-monochrome-white.png'

const HeaderHome = () => {
    return(
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="#"><img src={logo} alt="Logo de Groupomania, leader en grande distribution" onClick={()=>{document.location.href='/'}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="mr-auto my-2 my-lg-0 text-light"  navbarScroll >
                    <NavLink className="btn-hover login mb-1" aria-label="Lien vers la page de connexion" to="/login"></NavLink>
                    <NavLink className="btn-hover signup mb-1" aria-label="Lien vers la page d'inscription" to="/signup"></NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default HeaderHome