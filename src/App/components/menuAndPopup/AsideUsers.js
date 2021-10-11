import React from "react"
import { NavLink } from "react-router-dom"
import initDatas from "../../utils/InitDatas"
import requestsArticle from "../../utils/RequestsArticle"


const AsideUsers = ({token,users}) => {    
    return(<>
        <p>LES MEMBRES</p>
        <nav className="d-flex flex-column mb-3">
        {users.map(user => (
                    <NavLink key={user.pseudo} className="NavCat" aria-label="" to={`/`} onClick={ async (e) => {
                        e.preventDefault()
                        const all_articles_user = await requestsArticle.articles_by_user(token,user.id)
                        localStorage.setItem('articlesProfile',JSON.stringify(all_articles_user.all_articles))
                        await initDatas.refresh_articles(token)

                        document.location.href="/articlesProfile"
                    }
                    }>{user.pseudo}</NavLink>
                ))}
        </nav>
    </>)
}
export default AsideUsers