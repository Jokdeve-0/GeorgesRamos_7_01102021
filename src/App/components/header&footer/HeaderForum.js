import { NavLink } from 'react-router-dom'
import {Button,Navbar,Nav,Form,FormControl} from 'react-bootstrap'
import Menu from "../menuAndPopup/Menu"
import logo from '../../../css/img/icon-left-font-monochrome-white.png'
import initDatas from '../../utils/InitDatas'

const HeaderForum = ({token,profile}) => {
    return(<>
    <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#"><img src={logo} alt="Logo de Groupomania, leader en grande distribution" onClick={()=>{document.location.href='/'}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto my-2 my-lg-0 text-light"  navbarScroll >
                <NavLink className="btn-hover profile mb-1" aria-label="Lien vers votre profile" to="/account"></NavLink>
                <NavLink className="btn-hover logout mb-1" aria-label="Lien de déconnexion" to="/" onClick={()=>{initDatas.cleanStore()}}></NavLink>
            </Nav>
            <Form className="d-flex">
                <FormControl
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                />
                <Button variant="outline-danger" type="button" onClick={async()=>{
                    await initDatas.search(token,document.getElementById('search').value)
                }}>Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
    <Menu token={token} profile={profile}/>
    </>)
}
export default HeaderForum