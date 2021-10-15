import React from "react"
import { Link } from "react-router-dom"
function Footer() {
    return (<>
        <div className="text-center p-3">
            Groupomania © 2021 Copyright&nbsp;&nbsp;|&nbsp;&nbsp;
            <Link aria-label="Lien vers la page d'accueil" to="/">Terms and Privacy</Link>
        </div>
    </>);
}
export default Footer