import React,{useState} from "react"
import { BiLeftArrowCircle } from "react-icons/bi"

import { MdDeleteForever} from "react-icons/md"
import { DatasContext } from "../../../App"
import initDatas from "../../utils/InitDatas"
import HeaderAdmin from "../header&footer/HeaderAdmin"
import Article from "../article/Article"
import { AiOutlineSetting } from "react-icons/ai"
import {GiConfirmed } from "react-icons/gi"
import requestsAdmin from '../../utils/RequestsAdmin'
import { NavLink } from "react-router-dom"

const AdminPanel = () => {

    const datas = React.useContext(DatasContext)
    let token = null
    let profile = null
    let articlesState = null
    let usersState = null
    let commentsState = null
    let answersState = null
    let userId = null
    let ranking = null

    if(localStorage.getItem('ACCESS_TOKEN') === null){
        // If token is not null or not valid => redirect to home
        document.location.href='/'
    }else{
        // Else Initialization Datas 
        token = datas.token[0].ACCESS_TOKEN
        articlesState = initDatas.set_articles(datas.token[0].ACCESS_TOKEN)
        usersState =  JSON.parse(localStorage.getItem('Users')) ? JSON.parse( localStorage.getItem('Users')) : []
        profile = datas.profile[0]
        userId = profile.id
        ranking = datas.ranking
        commentsState = JSON.parse(localStorage.getItem('comments')) ? JSON.parse( localStorage.getItem('comments')) : []
        answersState = JSON.parse(localStorage.getItem('answers')) ? JSON.parse( localStorage.getItem('answers')) : []
    }
    // Check User Admin or logout
    if(ranking[0] !== "BOSS"){initDatas.cleanStore()}

    const [articles,setArticles] = useState(articlesState )
    const [comments,setComments] = useState(commentsState.all_comments )
    const [answers,setAnswers] = useState(answersState)
    const [users,setUsers] = useState(usersState)

    // Display Btn of Validation modify user rank
    let [btnDisplay,setBtnDisplay] = useState(false)
    return(
    <>
        <header>
            <HeaderAdmin token={token} />
            <NavLink aria-label="lien vers le forum" to="/forum" onClick={ async ()=>{
                await initDatas.initializeGlobalDatas({token:token})
            }}><BiLeftArrowCircle className='icon-return'/></NavLink>
        </header>
        <main className="box-top desk">
            {/* USER */}
            <div id="container-forum">
            <h1 key="h1-admin-panel" className="article-profile admin">PANNEAU D'ADMINISTRATION</h1>
            <section className="w-100" key="Admin-user">
                <h2 key="rank-h2" className="article-profile">LES UTILISATEURS</h2>
                    <div className="d-flex p-2 w-100">
                        <span className="w-50">Email</span>
                        <span className="d-flex justify-content-end w-50">Ranking <AiOutlineSetting className="openAdmin" onClick={()=>{setBtnDisplay(!btnDisplay)}}/></span>
                    </div>
                    <hr className="my-1" key={`hr1-${profile.id}`}/>
                    {users.map(user => (
                    <div className="d-flex justify-content-between users" key={`${(Math.random(999)+Date.now()).toString()}-comment`} >
                        <span key={`email-${user.id}`} className="d-flex align-items-center w-50">{user.email}</span>
                        <span key={`admin-${user.id}`} className="ranking">
                            <select 
                            aria-label="selectionner le rang de l'utilisateur"
                                key={`Ranking-${user.id}`} 
                                defaultValue={user.rank} 
                                name="Ranking" 
                                id={`Ranking-${user.id}`} 
                                disabled={btnDisplay?"":"disabled"}>
                                <option key={`option1-${user.id}`} value="BOSS">Administrateur</option>  
                                <option key={`option2-${user.id}`} value="SOLDIER">Utilisateur</option>  
                            </select> 
                            {btnDisplay? 
                            <GiConfirmed key={`validRank-${user.id}`} onClick={async()=>{
                                const modRanking = document.getElementById(`Ranking-${user.id}`).value
                                await requestsAdmin.modify_rank(token,{email:user.email,rank:modRanking})
                                await initDatas.initializeAllUsersInStorage(token,userId,ranking[0])
                                setUsers(JSON.parse( localStorage.getItem('Users')))
                                setBtnDisplay(!btnDisplay)
                            }} />
                            :null} 
                        </span>
                    </div>
                    ))}
            </section>
            <section className="w-100" key="Admin-user-remove">
                <h2 key="remove-h2" className="article-profile">LES UTILISATEURS</h2>

                    {users.map(user => (
                        <div key={`container-user-${user.id}`}>
                    <div className="d-flex justify-content-between users" key={`${(Math.random(9999)+Date.now()).toString()}-answer`} >
                        <span key={`answer-email-${user.id}`} className="d-flex align-items-center w-50">{user.email}</span>
                        <span key={`answer-admin-${user.id}`} className="ranking">
                            
                             {btnDisplay? 
                            <MdDeleteForever key={`validSup-${user.id}`} className="text-danger" onClick={async()=>{
                                if(window.confirm(' !!! Attention !!! \nCette action est irréversible !\nEtes vous sur de vouloir supprimer le compte ?')){
                                    await initDatas.delete_profile_admin(token,{email:user.email})
                                    await initDatas.initializeAllUsersInStorage(token,userId,ranking[0])
                                    await initDatas.initializeGlobalDatas({token:token})
                                    setUsers(JSON.parse( localStorage.getItem('Users')))
                                    setArticles(JSON.parse(localStorage.getItem('all_articles')))
                                    setBtnDisplay(!btnDisplay)
                                }
                            }} />
                            :null} 
                        </span>
                    </div>
                    <hr className="my-1 d-block w-100" key={`hr2-${user.id}`}/>
                    </div>
                    ))}
            </section>
            {/* ARTICLES */}
            <section className="w-100" key="Admin-articles">
                <h2 className="article-profile">LES ARTICLES EN MODERATION</h2>
                <div className="box-cards">
                    {articles.map((article) =>article.valide !== 0 ?<Article key={`${article.id}`} admin={true} article={article} setArticles={setArticles} />:null)}
                </div>
            </section>
            {/* COMMENTS */}
            <section className="w-100" key="Admin-comments">
                <h2 className="article-profile">LES COMMENTAIRES EN MODERATION</h2>
                <div className="head-comment d-flex">
                    <span className="d-block w-25 py-2 px-1">Pseudo</span>
                    <span className="d-block w-50 py-2 px-1">Commentaire</span>
                    <span className="d-block w-25 py-2 px-1">Modérer</span>
                </div>
                <hr key={`hr-33`} className="my-1"/>
                { comments.map((comment) =>comment.valide !== 0 ?
                <div key={`comment-${comment.id}`} className="d-flex">
                    <span className="d-block w-25 py-2 px-1" key={`email-${comment.id}`}>{comment.pseudo}</span>
                    <span className="d-block w-50 py-2 px-1" key={`message-${comment.id}`}>{comment.message}</span>
                    <span className="d-block w-25 text-center pe-3" key={`btn-${comment.id}`}><GiConfirmed onClick={async () => {
                            const req = await requestsAdmin.moderation(token)
                            if(req.message){
                                const val = comment.valide !== 0 ? 0 : 1
                                await requestsAdmin.moderate_comment(token,{commentId:comment.id,valide:val})
                                await initDatas.initializeCommentsInStorage(token)
                                setComments(JSON.parse(localStorage.getItem('comments')).all_comments)
                            }}}/>
                    </span>
                </div>
                :null)}
                {/* ANSWERS */}
                { answers.all_answers.map((answer) =>answer.valide !== 0 ?
                <div key={`answer-${answer.id}`} className="d-flex">
                    <span className="d-block w-25 py-2 px-1" key={`email-${answer.id}`}>{answer.pseudo}</span>
                    <span className="d-block w-50 py-2 px-1" key={`message-${answer.id}`}>{answer.message}</span>
                    <span className="d-block w-25 text-center pe-3" key={`btn-${answer.id}`}><GiConfirmed onClick={async()=>{
                        const req = await requestsAdmin.moderation(token)
                        if(req.message){
                            const val = answer.valide !== 0 ? 0 : 1
                            await requestsAdmin.moderate_answer(token,{answerId:answer.id,valide:val})
                            await initDatas.initializeAnswersInStorage(token)
                            setAnswers(JSON.parse(localStorage.getItem('answers')))
                        }
                    }}/></span>
                </div>:null)}
            </section>
            </div>
        </main>
    </>
    )
}
export default AdminPanel