import React from "react"
function Footer() {
    return (<>
        <div className="text-center p-3">
            Groupomania © 2021 Copyright&nbsp;&nbsp;|&nbsp;&nbsp;
            <a aria-label="Lien vers la page d'accueil" href='/' onClick={ async (e)=>{ e.preventDefault();document.location.href='/'}}>Terms and Privacy</a>
        </div>
    </>);
}
export default Footer