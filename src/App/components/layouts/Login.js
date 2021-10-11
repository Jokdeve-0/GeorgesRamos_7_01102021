import React from "react"
import { NavLink } from "react-router-dom"
import {Navbar,Nav} from 'react-bootstrap';
import logo from '../../../css/img/icon-left-font-monochrome-white.png'
import initDatas from "../../utils/InitDatas"
function Login(){

    return(<>

        <header>        
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#"><img src={logo} alt="Logo de Groupomania, leader en grande distribution" onClick={()=>{document.location.href='/'}}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-auto my-2 my-lg-0 text-light"  navbarScroll >
                        <NavLink className="btn-hover signup mb-1" aria-label="Lien vers la page d'inscription" to="/signup"></NavLink>
                        <NavLink className="btn-hover home mb-1" aria-label="Lien vers la page d'accueil" to="/"></NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>

        <main className="box-top desk">
            <div className="container-fluid login d-flex justify-content-center">
                <div className="box-form">
                    <h1>CONNEXION</h1>
                    <form>
                        <div>
                            <label aria-label="Entrez votre adresse email" htmlFor="Email">Email</label>
                            <input type="email" id="Email" placeholder="Example@groupomania.com"/>
                        </div>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <input type="password" id="Password" placeholder="********" />
                        </div>
                        <button type="button" className="btn-form" aria-label="boutton pour valider le formulaire de connexion"
                            onClick={
                                async ()=>{
                                    await initDatas.connect()
                                }
                            }
                        >Connexion</button>
                        <p>Vous n'avez pas de compte ? <NavLink aria-label="redirection vers le page d'inscription" to="/signup">s'inscrire</NavLink></p>
                    </form>
                </div>
            </div>
        </main>
    </>)
}
export default Login