import React from "react"
import Button from 'react-bootstrap/Button'
import initDatas from "../../utils/InitDatas"
import { TiArrowSyncOutline,TiThumbsUp,TiGroupOutline } from "react-icons/ti";
import {BsShieldLock} from "react-icons/bs";
import { DatasContext } from "../../../App";
import requestsAdmin from "../../utils/RequestsAdmin";

const Menu = ({token,profile}) => {

	const datas = React.useContext(DatasContext)

	return(
		<div id="menu-forum">
			<Button className="d-flex justify-content-center align-items-center" variant="outline-danger" onClick={ async ()=>{
			await initDatas.initializeGlobalDatas({token:token})
			document.location.href = "/forum"
			}} aria-label="Actualisé la page" ><TiArrowSyncOutline/><small>Actualité</small></Button>
			<Button className="ms-3 d-flex justify-content-center align-items-center" variant="outline-danger" 
				onClick={()=>{document.location.href="/popular"}} aria-label="afficher les articles les plus populaire" ><TiGroupOutline/><small>Populaire</small></Button>
			<Button className="ms-3 d-flex justify-content-center align-items-center" variant="outline-danger" 
				onClick={()=>{document.location.href="/tendance"}} aria-label="afficher les articles les plus tendance" ><TiThumbsUp/><small>Tendances</small></Button>

			{datas.ranking[0] === "BOSS"? 
				<Button className="ms-3 d-flex justify-content-center align-items-center" variant="outline-danger" 
				onClick={async()=>{
					const req = await requestsAdmin.moderation(token)
                    if(req.message){
                        document.location.href='/Admin-panel'
					}
				 }} aria-label="Acceder aux parametres d'administration" ><BsShieldLock/><small>Admin Panel</small></Button>
			:
				null
			}
		</div>
	)
}
export default Menu