import React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import {Dropdown} from 'react-bootstrap'
import initDatas from "../../utils/InitDatas"
import requestsAdmin from "../../utils/RequestsAdmin"
import requestsComment from "../../utils/RequestsComment"
import { DatasContext } from "../../../App"
const ModificationMenuComment = ({token,profile,article,comment,inputId,btnId,messageId,setComments}) => {
    const datas = React.useContext(DatasContext)
    const setAnswers = datas.answers[1]
    return(
        <Dropdown className="">
            <Dropdown.Toggle variant="outline-light" aria-label="modifier l'article" className="d-flex justify-content-center align-items-center text-dark rounded-pill" id={`dropdown-basic${article.id}`}>
                <BsThreeDotsVertical/>
            </Dropdown.Toggle>
            <Dropdown.Menu>

                {profile.id === comment.creatorId ? <>
                    <Dropdown.Item onClick={ ()=>{
                        document.getElementById(inputId).classList.toggle('hide')
                        document.getElementById(btnId).classList.toggle('hide')
                        document.getElementById(messageId).classList.toggle('hide')
                    } }> Modifier</Dropdown.Item></>:null
                   }

                {profile.id === comment.creatorId && profile.rank === "BOSS"?<hr/>:null }

                {profile.rank === "BOSS"?
                <>
                <Dropdown.Item onClick={async () => {
                    const req = await requestsAdmin.moderation(token)
                    if(req.message){
                        const val = comment.valide !== 0 ? 0 : 1
                        await requestsAdmin.moderate_comment(token,{commentId:comment.id,valide:val})
                        await initDatas.initializeCommentsInStorage(token)
                        setComments(JSON.parse(localStorage.getItem('comments')))
                    }
                }}> Modérer</Dropdown.Item><hr />
                <Dropdown.Item onClick={ async ()=>{ 
                    const req = await requestsAdmin.moderation(token)
                    if(req.message){
                        await requestsComment.remove_comment(token,{commentId:comment.id})
                        await initDatas.initializeGlobalDatas({token:token})
                        setComments(JSON.parse(localStorage.getItem('comments')))
                        setAnswers(JSON.parse(localStorage.getItem('answers')))
                    }
                    }}>Supprimer</Dropdown.Item> 
                
                </>
            :
            null
            }
                
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default ModificationMenuComment