import React from "react"
import { NavLink } from "react-router-dom"
import initDatas from "../../utils/InitDatas"
import popAlertServer from "../../utils/PopAlertServer"
import validations from "../../utils/Validations"
import {Navbar,Nav} from 'react-bootstrap';
import logo from '../../../css/img/icon-left-font-monochrome-white.png'
import requestsUser from "../../utils/RequestsUser"
function Signup(){

    const register = async () => {
        // Remove errors messages
        validations.remove_validations_errors()
        // check form datas
        const user = validations.validations_control()
        if (!user) {
            // Not valid
            return user
        } else {
            // Send form data
            const register = await requestsUser.signup(user)
            if (register.message) {
                // Save global datas in localStorage
                await initDatas.initializeDatasInStorage(user)
            } else {
                // Display error message
                popAlertServer.register(register)
            }
        }
    }
    
    return(<>
        <header>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#"><img src={logo} alt="Logo de Groupomania, leader en grande distribution" onClick={()=>{document.location.href='/'}}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-auto my-2 my-lg-0 text-light"  navbarScroll >
                    <NavLink className="btn-hover login mb-1" aria-label="Lien vers la page de connexion" to="/login"></NavLink>
                    <NavLink className="btn-hover home mb-1" aria-label="Lien vers la page d'accueil" to="/"></NavLink>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
        </header>
        <main className="box-top desk">
            <div className="container-fluid login signup d-flex justify-content-center">
                <div className="box-form">
                    <h1>INSCRIPTION</h1> 
                    <form>
                        <div>
                            <label htmlFor="Pseudo" aria-label="Entrez votre nom d'utilisateur">Nom d'utilisateur</label>
                            <input type="text" id="Pseudo"  placeholder="Entrez votre nom d'utilisateur" />
                            <small> <span role="img" aria-label="Warning">⚠️</span> Au minimum deux caratères</small>
                        </div>
                        <div>
                            <label aria-label="Entrez votre adresse email" htmlFor="Email">Email</label>
                            <input type="email" id="Email" placeholder="Example@groupomania.com" />
                        </div>
                        <div>
                            <label htmlFor="Password">Password</label>
                            <input type="password" id="Password" placeholder="********" />
                            <small> <span role="img" aria-label="Warning">⚠️</span> Au minimum une minuscule, une majuscule, un chiffre, un caratère spécial et au moins 8 caratères</small>
                        </div>
                        <button type="button" className="btn-form" aria-label="boutton pour valider le formulaire d'inscription"
                        onClick={async()=>{
                            await register()
                        }}>S'inscrire</button>
                        <p>Vous avez déjà un compte ? <NavLink aria-label="redirection vers le page de connexion" to="/login">Se connecter</NavLink></p>
                    </form>
                </div>
            </div>
        </main>
    </>)
}
export default Signup