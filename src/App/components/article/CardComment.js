import React,{useState} from "react";
import initDatas from "../../utils/InitDatas";
import Comment from '../comments/Comment'
import {Card,InputGroup,FormControl,Button,Collapse} from 'react-bootstrap'
import {FaRegPaperPlane,FaRegEye} from "react-icons/fa"
import { DatasContext } from "../../../App";

const CardComment = ({article,token,setArticles,userId,profile,admin}) => {
    const datas = React.useContext(DatasContext)
    const [comments,setComments] = datas.comments
    const answers = datas.answers[0]
    const pseudo = datas.profile[0].pseudo
    const inputId = `input-comment${article.id}`
    const nameForm = `comment-form${article.id}`
    let countComment = 0
    if(!comments.error){
        countComment = initDatas.calculComments(comments.all_comments,article,answers.all_answers)
    }else{
        initDatas.cleanStore()
    }
    const [open, setOpen] = useState(false);
    return(
        <Card.Body className="card-comment">
            
            <form onSubmit={ async (e)=>{ 
                e.preventDefault() 
                await initDatas.send_comment(token,userId,pseudo,article.id,inputId)
                setArticles(JSON.parse(localStorage.getItem('all_articles')))
                setComments(JSON.parse(localStorage.getItem('comments')))
                
            }} name={nameForm}>
                <InputGroup className="my-3">
                    <span className="w-100">Laisser un commentaire ?</span>
                    <FormControl
                        className="input-comment"
                        placeholder="Écrivez un commentaire ..."
                        aria-label="Écrivez un commentaire"
                        id={inputId}
                        name={inputId}
                        onClick={() => setOpen(!open)}
                    />
                    <Button variant="outline-secondary" aria-label="poster votre commentaire" type="submit">
                        <FaRegPaperPlane/>
                    </Button>
                </InputGroup>
            </form>
            <div className="d-flex justify-content-end align-items-center openComment"  onClick={() => setOpen(!open)}>
                <small id={`counterComments-${article.id}`} className="counter">{countComment.length} Commentaires</small>
                <FaRegEye className="mx-2" aria-controls="Ouvrir les commentaires" aria-expanded={open} />
            </div>
            <Collapse in={open}>
                <div><Comment key={article.image}  token={token} article={article} setArticles={setArticles} userId={userId} pseudo={pseudo}  profile={profile} admin={admin} /></div>
            </Collapse>
        </Card.Body>
    )
}
export default CardComment