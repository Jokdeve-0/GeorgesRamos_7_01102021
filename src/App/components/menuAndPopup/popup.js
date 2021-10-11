import React from 'react'
import { useState } from 'react'
import {Toast} from 'react-bootstrap'

const Popup= ({message,setModifyUser,modifyUser,modifyEmail,setModifyEmail,modifyPass,setModifyPass}) => {
    const [showA, setShowA] = useState(true)
    const toggleShowA = () => setShowA(!showA)
    return (
        <Toast id="popup" className="w-100 bg-success" show={showA} onClose={toggleShowA} onClick={()=>{
            let closeUser = !setModifyUser ? null :  setModifyUser(!modifyUser)
            let closeEmail = !setModifyEmail ? null :  setModifyEmail(!modifyEmail)
            let closePass = !setModifyPass ? null :  setModifyPass(!modifyPass)
            console.log(closeUser,closePass,closeEmail)
        }}>
        <Toast.Header >
            <strong className="me-auto text-danger">{message}</strong>
        </Toast.Header>
        </Toast>
    )
}
export default Popup
