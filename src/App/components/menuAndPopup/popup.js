import React from 'react'
import { useState } from 'react'
import {Toast} from 'react-bootstrap'

const Popup= ({message,modifyPseudo,setModifyPseudo,modifyEmail,setModifyEmail,modifyPass,setModifyPass}) => {

    const [showA, setShowA] = useState(true)
    const toggleShowA = () => setShowA(!showA)
    return (
        <Toast id="popup" className="w-100 bg-success" show={showA} onClose={toggleShowA} onClick={()=>{
            if(modifyPseudo !== false &&  modifyPseudo !== undefined ) setModifyPseudo(!modifyPseudo)
            if(modifyEmail !== false && modifyEmail !== undefined ) setModifyEmail(!modifyEmail)
            if(modifyPass !== false && modifyPass !== undefined ) setModifyPass(!modifyPass)
        }}>
        <Toast.Header >
            <strong className="me-auto text-danger">{message}</strong>
        </Toast.Header>
        </Toast>
    )
}
export default Popup
