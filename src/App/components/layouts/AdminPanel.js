import React,{useState} from "react"
import { BiLeftArrowCircle } from "react-icons/bi"
import { DatasContext } from "../../../App"
import initDatas from "../../utils/InitDatas"
import HeaderAdmin from "../header&footer/HeaderAdmin"
import Article from "../article/Article"
import { AiOutlineSetting } from "react-icons/ai"
import {GiConfirmed } from "react-icons/gi"
import requestsAdmin from '../../utils/RequestsAdmin'


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
    const answers = answersState.all_answers
    const [users,setUsers] = useState(usersState)

    // Display Btn of Validation modify user rank
    let [btnDisplay,setBtnDisplay] = useState(false)
    return(
    <>
    <header>
        <HeaderAdmin token={token} />
        <p onClick={ async ()=>{
            await initDatas.initializeGlobalDatas({token:token})
			document.location.href = "/forum"
        }}><BiLeftArrowCircle className='icon-return'/></p>
    </header>
        <main>
            <h1 key="h1-admin-panel" className="article-profile modify">PANNEAU D'ADMINISTRATION</h1>
            {/* USER */}
            <section className="w-100" key="Admin-user">
                <h2 className="article-profile">LES UTILISATEURS</h2>
                    <div className="d-flex p-2 w-100">
                        <span className="w-50">Email</span>
                        <span className="d-flex justify-content-between w-50">Ranking <AiOutlineSetting onClick={()=>{setBtnDisplay(!btnDisplay)}}/></span>
                    </div>
                    <hr className="my-1"/>
                    {users.map(user => (
                    <div className="d-flex justify-content-between users" key={`${(Math.random(999)+Date.now()).toString()}`} >
                        <span key={`email-${user.id}`} className="w-50">{user.email}</span>
                        <span key={`admin-${user.id}`} className="d-flex justify-content-end w-50">
                            <select 
                                key={`Ranking-${user.id}`} 
                                defaultValue={user.rank} 
                                name="Ranking" 
                                id={`Ranking-${user.id}`} 
                                disabled={btnDisplay?"":"disabled"} 
                                onFocus={()=>{
                                    document.getElementById(`validRank-${user.id}`).classList.toggle('hide')
                            }}>
                                <option key={`option1-${user.id}`} value="BOSS">Administrateur</option>  
                                <option key={`option2-${user.id}`} value="SOLDIER">Utilisateur</option>  
                            </select> 
                            <GiConfirmed key={`validRank-${user.id}`} className='hide' onClick={async()=>{
                                const modRanking = document.getElementById(`Ranking-${user.id}`).value
                                await requestsAdmin.modify_rank(token,{email:user.email,rank:modRanking})
                                await initDatas.initializeAllUsersInStorage(token,userId,ranking[0])
                                setUsers(JSON.parse( localStorage.getItem('Users')))
                                document.getElementById(`validRank-${user.id}`).classList.toggle('hide')
                                setBtnDisplay(false)
                            }} />
                        </span>
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
                    <span className="d-block w-25 py-2 px-1">Email</span>
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
                { answers.map((answer) =>answer.valide !== 0 ?
                <div key={`answer-${answer.id}`} className="d-flex">
                    <span className="w-25" key={`email-${answer.id}`}>{answer.pseudo}</span>
                    <span className="w-50" key={`message-${answer.id}`}>{answer.message}</span>
                    <span className="w-25 text-center pe-3" key={`btn-${answer.id}`}><GiConfirmed/></span>
                    <hr className="" key={`hr-${answer.id}`}/>
                </div>:null)}

            </section>

        </main>
    </>
    )
}
export default AdminPanel