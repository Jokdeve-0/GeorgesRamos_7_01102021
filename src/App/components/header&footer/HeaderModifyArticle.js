import {Navbar,Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../../../css/img/icon-left-font-monochrome-white.png'
import initDatas from '../../utils/InitDatas'

const HeaderModifyArticle = ({token}) => {
    return(
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="#"><img src={logo} alt="Logo de Groupomania, leader en grande distribution" onClick={()=>{document.location.href='/'}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="mr-auto my-2 my-lg-0 text-light"  navbarScroll >
                <NavLink className="btn-hover forum mb-1" aria-label="Lien vers la page des articles"  to='/forum'  onClick={async () => {
                    await initDatas.initializeGlobalDatas({token:token})
                }}></NavLink>
                    <NavLink className="btn-hover logout mb-1" aria-label="Lien de déconnexion" to="/" onClick={()=>{initDatas.cleanStore()}}></NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default HeaderModifyArticle