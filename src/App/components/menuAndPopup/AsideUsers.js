import React from "react"
import { NavLink } from "react-router-dom"
import initDatas from "../../utils/InitDatas"
import requestsArticle from "../../utils/RequestsArticle"

const AsideUsers = ({token,users}) => {    
    return(<>
        <h2>LES MEMBRES</h2>
        <nav className="d-flex flex-column mb-3" aria-label="menu des utilisateurs">
        {users.map(user => (
                    <NavLink key={user.pseudo} className="NavCat" aria-label={`lien vers la page de ${user.pseudo}`} to="/articlesProfile" onClick={ async (e) => {
                        e.preventDefault()
                        const all_articles_user = await requestsArticle.articles_by_user(token,user.id)
                        localStorage.setItem('articlesProfile',JSON.stringify(all_articles_user.all_articles))
                        await initDatas.refresh_articles(token)
                        document.location.href="./articlesProfile"
                    }
                    }>{user.pseudo}</NavLink>
                ))}
        </nav>
    </>)
}
export default AsideUsers