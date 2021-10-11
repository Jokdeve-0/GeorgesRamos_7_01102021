import React from 'react'
import {Card,ListGroup,ListGroupItem} from 'react-bootstrap'
import { MdCameraEnhance } from "react-icons/md"
import { FaPencilAlt } from "react-icons/fa"
import { MdDeleteForever,MdHighlightOff } from "react-icons/md"
import {GiConfirmed } from "react-icons/gi"
import initDatas from '../../utils/InitDatas'
import { useState } from 'react'
import validations from '../../utils/Validations'
import {DatasContext} from '../../../App'
import Popup from "../menuAndPopup/popup"


const Profile = ({setArticles}) => {  

    const datas = React.useContext(DatasContext)
    let token =""
    let profileState = []
    if(localStorage.getItem('ACCESS_TOKEN') === null){
        document.location.href='/'
    }else{
        token = datas.token[0].ACCESS_TOKEN
        profileState = datas.profile[0]
    }

    let [usernameEditing, setUsernameEditing] = useState(false)
    let [userEmailEditing, setUserEmailEditing] = useState(false)
    let [userPassEditing, setUserPassEditing] = useState(false)
    let [btnValidName, setBtnValidName] = useState(false)
    let [btnValidemail, setbtnValidemail] = useState(false)
    let [btnValidPass, setbtnValidPass] = useState(false)
    let [hideName, setHideName] = useState(false)
    let [hideEmail, setHideEmail] = useState(false)
    let [hidePass, setHidePass] = useState(false)

    const [profile,setProfile]=useState(profileState)

    const actionEmail = async () => {
        const req = await initDatas.change_email(token,profile)
        if(req.message){
            setProfile(JSON.parse(localStorage.getItem('Profile')))
            setUserEmailEditing(false)
            setbtnValidemail(false)
            setbtnValidPass(false)
            setHideEmail(false)
            setModifyEmail(!modifyEmail)
        }
    }
    const actionPseudo = async () => {
        const req = await initDatas.change_pseudo(token,profile.id)
        if(req.message){
            setProfile(JSON.parse(localStorage.getItem('Profile')))
            await initDatas.initializeGlobalDatas({token:token})
            setArticles(JSON.parse(localStorage.getItem('all_articles')))
            setUsernameEditing(false)
            setBtnValidName(false)
            setbtnValidPass(false)
            setHideName(false)
            setModifyPseudo(!modifyPseudo)
        }
    }
    const actionPassword = async () => {
        const req = await initDatas.change_password(token,profile.id)
        if(req.message){
            setProfile(JSON.parse(localStorage.getItem('Profile')))
            setUserPassEditing(false)
            setBtnValidName(false)
            setbtnValidemail(false)
            setbtnValidPass(false)
            setHidePass(false)
            setModifyPass(!modifyPass)
        }
    }

    const [modifyPseudo,setModifyPseudo] = useState(false)
    const [modifyEmail,setModifyEmail] = useState(false)
    const [modifyPass,setModifyPass] = useState(false)

    return(
        <Card className="card-profile" id="user-profile">
            <Card.Img variant="top" src="./css/img/profile.jpeg" />
            <p className="mod-img" aria-label="Modifier votre photo de profile"><MdCameraEnhance/></p>
            <ListGroup className="list-group-flush">
            {/* POPUP */ modifyPseudo? <Popup message={'Votre pseudo a été modifié !'} setModifyPseudo={setModifyPseudo} modifyPseudo={modifyPseudo}  />:null}
                <ListGroupItem className="mt-3">
                        <label aria-label="Entrez votre nom d'utilisateur" id="label-pseudo" htmlFor="Name"><strong className="w-100">Nom d'utilisateur " {profile.pseudo} "</strong>
                        {usernameEditing ?<input type="text" id="Pseudo" placeholder="votre nouveau pseudo" />:<></>}
                        </label>
                        {btnValidName?
                            <span className="spanIcon">
                                <GiConfirmed className="icon-confirme"  onClick={async()=>await actionPseudo()}/>
                            </span>:<></>
                        }
                        {hideName ?  
                            <span>
                                <MdHighlightOff className="icon-pen text-danger notvalid"  onClick={()=>{
                                    validations.remove_validations_errors()
                                    setUsernameEditing(!usernameEditing)
                                    setBtnValidName(!btnValidName)
                                    setHideName(!hideName)
                                }}/>
                            </span>
                            :
                            <FaPencilAlt className="icon-pen openPseudo" onClick={()=>{
                                setUsernameEditing(!usernameEditing)
                                setBtnValidName(!btnValidName)
                                setHideName(!hideName)
                            }} />
                        }
                </ListGroupItem>
                {/* POPUP */ modifyEmail? <Popup message={'Votre email a été modifié !'} setModifyEmail={setModifyEmail} modifyEmail={modifyEmail} />:null}
                <ListGroupItem>
                    <div className="w-100">
                        <label aria-label="Entrez votre adresse email" id="label-email" htmlFor="Email"><strong className="w-100">Email " {profile.email} "</strong>
                            {userEmailEditing?<input type="email" id="Email" placeholder="votre nouvelle email"/>:<></>}
                        </label>
                        {btnValidemail?
                            <span className="spanIcon">
                                <GiConfirmed className="icon-confirme"  onClick={async()=>window.confirm('! ATTENTION ! En modifiant votre email, celui-ci deviendra votre email de connexion\nEtes vous sur de vouloir modifier votre email ?') ? await actionEmail():null}/>
                            </span>:<></>}
                        {hideEmail?
                            <MdHighlightOff className="icon-pen text-danger notvalid" onClick={()=>{
                                validations.remove_validations_errors()
                                setUserEmailEditing(!userEmailEditing)
                                setbtnValidemail(!btnValidemail)
                                setHideEmail(!hideEmail)
                            }}/>
                            :
                            <FaPencilAlt className="icon-pen openEmail" onClick={()=>{
                                setUserEmailEditing(!userEmailEditing)
                                setbtnValidemail(!btnValidemail)
                                setHideEmail(!hideEmail)
                            }}/>
                        }
                    </div>
                </ListGroupItem>
                {/* POPUP */ modifyPass? <Popup message={'Votre mot de passe a été modifié !'} setModifyPass={setModifyPass} modifyPass={modifyPass} />:null}
                <ListGroupItem >
                <div className="w-100">
                            <p className="m-0"><strong className="w-100">Modifier votre mot de passe</strong></p>
                            {userPassEditing?
                            <>
                            <label aria-label="Entrez votre ancien mot de passe" id="label-pass" htmlFor="Password"><strong className="w-100 my-1">Ancien mot de passe</strong>
                                <input type="password" id="Password" placeholder="Ancien********"/>
                            </label>
                            <label aria-label="Entrez votre nouveau mot de passe" htmlFor="confPassword"><strong className="w-100 my-1">Nouveau mot de passe</strong>
                                <input type="password" id="confPassword" placeholder="Nouveau********"/>
                            </label>
                            </>
                            :<></>}
                        
                        {btnValidPass?
                            <span className="spanIcon">
                                <GiConfirmed className="icon-confirme"  onClick={async()=> actionPassword(token,profile.id,)}/>
                            </span>:<></>}
                        {hidePass?
                            <MdHighlightOff className="icon-pen text-danger notvalid" onClick={()=>{
                                validations.remove_validations_errors()
                                setUserPassEditing(!userPassEditing)
                                setbtnValidPass(!btnValidPass)
                                setHidePass(!hidePass)
                            }}/>
                            :
                            <FaPencilAlt className="icon-pen openPass" onClick={()=>{
                                setUserPassEditing(!userPassEditing)
                                setbtnValidPass(!btnValidPass)
                                setHidePass(!hidePass)
                            }}/>
                        }
                    </div>
                </ListGroupItem>

                <ListGroupItem className="d-flex justify-content-between mb-3" >
                   <strong>Supprimer votre compte</strong>
                    <MdDeleteForever className="icon-delete" onClick={async () => {
                    if(window.confirm(' !!! Attention !!! \nCette action est irréversible !\nEtes vous sur de vouloir supprimer votre compte ?')){
                        await initDatas.delete_profile(token,{email:profile.email})
                    }
                }}/>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}
export default Profile

