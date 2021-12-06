import React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import {Dropdown} from 'react-bootstrap'
import initDatas from "../../utils/InitDatas"
import requestsAdmin from "../../utils/RequestsAdmin"

const ModificationMenu = ({token,article,setArticles,profile,admin}) => {


    return(
        <Dropdown className="d-flex justify-content-center align-items-start mb-2">
            <Dropdown.Toggle variant="outline-light" aria-label="modifier l'article" className="text-dark btn-admin" id={`dropdown-basic${article.id}`}>
                <BsThreeDotsVertical/>
            </Dropdown.Toggle>
            <Dropdown.Menu>

                {/* {profile.id === article.creatorId && article.repost ==="true"?<p className="m-0 text-secondary text-center">Aucune option</p>:null} */}


                {profile.id !== article.creatorId ?<>
                    <Dropdown.Item onClick={ async ()=>{ 
                        await initDatas.repost_article(token,article,profile)
                        await initDatas.refresh_articles(token)
                        setArticles(JSON.parse(localStorage.getItem('all_articles')))
                        window.top.window.scrollTo(0,0)
                    } }> 
                        Partager
                    </Dropdown.Item>
                    
                </>:null}

                {profile.id === article.creatorId && article.repost ==="false"?
                    <Dropdown.Item onClick={ async ()=>{ await initDatas.call_article(token,article.id) } }> 
                        Modifier
                    </Dropdown.Item>
                :null}

                {/* {profile.id === article.creatorId && profile.rank === "BOSS"?<hr/>:null } */}
                
                {profile.rank === "BOSS"?
                <>
                <hr />
                    <Dropdown.Item 
                        onClick={async () => { 
                            const req = await requestsAdmin.moderation(token,article.id)
                            if(req.message){
                                const val = article.valide !== 0 ? 0 : 1
                                const data = {valide : val,articleId : article.id}
                                const req = await requestsAdmin.moderate_article(token,data)
                                if(req.error){
                                    return {error:req.error}
                                }
                                await initDatas.refresh_articles(token)
                                setArticles(JSON.parse(localStorage.getItem('all_articles')))
                            }
                        }}
                    >Modérer</Dropdown.Item>
                <hr />
                    <Dropdown.Item 
                        onClick={ async ()=>{
                            if(window.confirm('Etes vous sur de vouloir supprimer votre article?')){
                                await initDatas.delete_article(token,{id:article.id,image:article.image})
                                setArticles(JSON.parse(localStorage.getItem('all_articles')))
                            }
                        }}
                    >Supprimer</Dropdown.Item>

                </>:null}
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default ModificationMenu