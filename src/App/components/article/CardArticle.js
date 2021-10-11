import React from 'react'
import {Card} from 'react-bootstrap'
import {FaTags} from "react-icons/fa"
import ModificationMenu from "./ModificationMenu"
import Like from "./liker/display_likers"
import Dislike from "./liker/display_dislikers"


const CardArticle = ({token,article,profile,setArticles,admin}) => {
    const displaysModificationMenu = profile.id === article.creatorId || profile.rank === "BOSS" ? true : false

    return(
        <Card.Body>
                <div id={`top-card${article.id}`} className="d-flex flex-wrap justify-content-between top-card">
                    <div className="d-flex justify-content-start flex-row">
                        <span className="me-2"><FaTags/></span>
                        <span className="me-2 article-genre">{article.genre}</span>
                        <span className="poste"><small>Posté le {article.dates}</small></span>
                    </div>
                    {displaysModificationMenu?
                        <ModificationMenu token={token} article={article} setArticles={setArticles} profile={profile} admin={admin} />
                    :
                    null
                }
                </div>
                {article.valide !==0 ? 
                    null
                :
                <div className="d-flex justify-content-between mb-2">
                    <Card.Text className="m-0 pseudo px-2">{article.pseudo}</Card.Text>
                    <div className="box-liker mb-0">
                        <div className="item-like">
                            <Like token={token} article={article} userId={profile.id} setArticles={setArticles} />

                            <span>{article.voteFor}</span>
                        </div>
                        <div className="item-like">
                            <Dislike token={token} article={article} userId={profile.id} setArticles={setArticles}/>

                            <span>{article.voteAgainst}</span>
                        </div>
                    </div>
                </div>
                }
                
                <Card.Text className="m-0 comment">{article.message}</Card.Text>
        </Card.Body>
    )
}
export default CardArticle