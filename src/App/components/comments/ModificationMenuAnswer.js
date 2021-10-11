import { BsThreeDotsVertical } from "react-icons/bs"
import {Dropdown} from 'react-bootstrap'
import initDatas from "../../utils/InitDatas"
import requestsAdmin from "../../utils/RequestsAdmin"
import requestsAnswer from "../../utils/RequestsAnswer"

const ModificationMenuAnswer = ({token,profile,article,admin,answer,inputId,btnId,messageId,setAnswers}) => {

    return(
        <Dropdown className="">
            <Dropdown.Toggle variant="outline-light" aria-label="modifier l'article" className="d-flex justify-content-center align-items-center text-dark rounded-pill" id={`dropdown-basic${article.id}`}>
                <BsThreeDotsVertical/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {profile.id === answer.creatorId ? <>
                    <Dropdown.Item onClick={ async ()=>{
                        document.getElementById(inputId).classList.toggle('hide')
                        document.getElementById(btnId).classList.toggle('hide')
                        document.getElementById(messageId).classList.toggle('hide')
                    } }> Modifier</Dropdown.Item></>:null
                   }
                   {profile.id === answer.creatorId && profile.rank === "BOSS"?<hr/>:null }

                {profile.rank === "BOSS"?
                <>
                
                <Dropdown.Item onClick={async () => {
                    const req = await requestsAdmin.moderation(token)
                    if(req.message){
                        const val = answer.valide !== 0 ? 0 : 1
                        await requestsAdmin.moderate_answer(token,{answerId:answer.id,valide:val})
                        await initDatas.initializeAnswersInStorage(token)
                        setAnswers(JSON.parse(localStorage.getItem('answers')))
                    }
                }}> Modérer</Dropdown.Item><hr />
                <Dropdown.Item onClick={ async ()=>{
                    const req = await requestsAdmin.moderation(token)
                    if(req.message){
                        await requestsAnswer.remove_answer(token,{answerId:answer.id})
                        await initDatas.initializeAnswersInStorage(token)
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
export default ModificationMenuAnswer