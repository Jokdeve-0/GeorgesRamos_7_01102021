import React from 'react'
import {InputGroup,FormControl,Button} from 'react-bootstrap'
import {GiConfirmed } from "react-icons/gi"
import { FaRegPaperPlane } from "react-icons/fa"
import initDatas from "../../utils/InitDatas"
import ModificationMenuComment from "./ModificationMenuComment"
import { DatasContext } from '../../../App'
import ModificationMenuAnswer from './ModificationMenuAnswer'
import requestsComment from '../../utils/RequestsComment'
import requestsAnswer from '../../utils/RequestsAnswer'
import validations from '../../utils/Validations'

const Comment = ({token,article,userId,pseudo,profile,admin}) => {

    const datas = React.useContext(DatasContext)
    const [comments,setComments] = datas.comments
    const [answers,setAnswers] = datas.answers
    if(comments.error){
        initDatas.cleanStore()
        comments.all_comments = []    
    }

    return (
        comments.all_comments.map( (comment) => (
            comment.articleId === article.id ? 
            <div key={comment.id} className="border rounded p-1 cont-comment">
                <div className="mb-0 d-flex p-1">
                    <p className="mb-0 d-flex justify-content-center align-items-centrer profiler rounded-pill p-1 avatPseudo">
                        {/* <span className="avatar"></span> */}
                        <span className="text-center px-1">{comment.pseudo}</span> 
                    </p> 
                    {comment.creatorId === userId || profile.rank === "BOSS"?
                        <ModificationMenuComment token={token} profile={profile} admin={admin} article={article} comment={comment} inputId={`comment-${comment.id}`} btnId={`btn-${comment.id}`} messageId={`message-${comment.id}`} setComments={setComments}/>
                    :null}
                </div>
                <div className="body-comment my-0 px-2 ">

                    <div className={`d-flex align-items-center justify-content-start flex-wrap`}>
                        <input type="text" className="hide" id={`comment-${comment.id}`} defaultValue={comment.message}/>
                        <GiConfirmed id={`btn-${comment.id}`} className="icon-valid h5 hide" onClick={ async () => {
                            const notValid = validations.validations_comment(`comment-${comment.id}`)
                            if(notValid !== false ){
                                await requestsComment.modify_comment(token,{commentId:comment.id,message:document.getElementById(`comment-${comment.id}`).value,dates:`Modifié le ${initDatas.FormatDate()}`})
                                document.getElementById(`comment-${comment.id}`).classList.toggle('hide')
                                document.getElementById(`btn-${comment.id}`).classList.toggle('hide')
                                document.getElementById(`message-${comment.id}`).classList.toggle('hide')
                                await initDatas.initializeCommentsInStorage(token)
                                setComments(JSON.parse(localStorage.getItem('comments')))
                            }
                        }}/>
                        <p id={`message-${comment.id}`} className="my-0 border p-2 bg-light comment">{comment.valide === 0 ? comment.message:"Ce commentaire à été banni !"}</p>
                    </div>

                    <span className="dates">{comment.dates}</span>
                    
                    {answers.all_answers.map((answer) => ( answer.commentId === comment.id ?
                        <div key={(answer.commentId+Math.random(99999)).toString()} className="box-recomment">
                            <div className={`head-recomment mb-0 d-flex ${comment.creatorId === answer.creatorId ?"justify-content-start":"justify-content-end"} align-items-centrer p-1`}>
                                <p className={`mb-0 d-flex justify-content-center align-items-centrer profiler rounded-pill p-1 avatPseudo answers`}>
                                    {/* <span className="avatar"></span> */}
                                    <span className="text-center px-1">{answer.pseudo}</span>
                                </p>
                                {answer.creatorId === userId || profile.rank === "BOSS"?
                                    <ModificationMenuAnswer token={token} profile={profile} article={article} admin={admin} answer={answer} setAnswers={setAnswers} inputId={`answer-${answer.id}`} btnId={`btnA-${answer.id}`} messageId={`messageA-${answer.id}`}/>
                                :null}
                            </div>
                            <div className="body-recomment my-0 px-2 answer">

                                <div className={`d-flex ${comment.creatorId === answer.creatorId ?"justify-content-start":"justify-content-end"} flex-wrap`}>
                                    <input type="text" className="hide" id={`answer-${answer.id}`} defaultValue={answer.message}/>
                                    <GiConfirmed id={`btnA-${answer.id}`} className="icon-valid h5 hide" onClick={ async () => {
                                        const notValid = validations.validations_comment(`answer-${answer.id}`)
                                        if(notValid !== false ){
                                            await requestsAnswer.modify_answer(token,{answerId:answer.id,message:document.getElementById(`answer-${answer.id}`).value,dates:`Modifié le ${initDatas.FormatDate()}`})
                                            await initDatas.initializeAnswersInStorage(token)
                                            document.getElementById(`messageA-${answer.id}`).classList.toggle('hide')
                                            document.getElementById(`btnA-${answer.id}`).classList.toggle('hide')
                                            document.getElementById(`answer-${answer.id}`).classList.toggle('hide')
                                            setAnswers(JSON.parse(localStorage.getItem('answers')))
                                        }
                                    }}/>
                                    <p id={`messageA-${answer.id}`} className="mb-0 border p-2 bg-light answer">{answer.valide === 0 ? answer.message:"Ce commentaire à été banni !"}</p>
                                </div>
                            </div>
                            <p className={`dates ${comment.creatorId === answer.creatorId ?"text-start":"text-end"} mb-2`}>{answer.dates}</p>
                        </div>
                    :null))}

                </div>
                <form name={`comment-form${comment.id}`}
                    onSubmit={async (e)=>{ 
                        e.preventDefault()
                        await initDatas.send_answer(token,`articleId_${article.id}_commentId_${comment.id}`,comment.id,pseudo,userId,article) 
                        setAnswers(JSON.parse(localStorage.getItem('answers')))
                    }
                }>
                    <InputGroup className="mb-3">
                        <FormControl
                            className="input-comment"
                            placeholder="Écrivez votre réponse ..."
                            aria-label="Écrivez votre réponse ..."
                            id={`articleId_${article.id}_commentId_${comment.id}`}
                            name={`articleId_${article.id}_commentId_${comment.id}`}
                        />
                        <Button variant="outline-secondary" aria-label="poster votre commentaire" type="submit">
                            <FaRegPaperPlane/>
                        </Button>
                    </InputGroup>
                </form>
            </div>
        :null))
    )
}


export default Comment