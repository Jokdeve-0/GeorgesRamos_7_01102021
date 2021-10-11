import React from "react"
import {Card} from 'react-bootstrap'
import img from '../../../css/img/home.png'
import popAlertServer from "../../utils/PopAlertServer"
import HeaderHome from "../header&footer/HeadHome"
import Popup from "../menuAndPopup/popup"


const Home = ()=>{
    // Display of popup user delete
    const popup = popAlertServer.user_removed()
    return (<>


    <header>
        <HeaderHome/>
    </header>

    {/* POPUP */ popup.delUser? <Popup message={popup.message} loca={popup.docLocation} />:null}

    <main className="box-top desk">
        <section className="container-fluid Home" id="home-app">
            <div className="box-right col-12 col-lg-5 m-auto">
                <Card className="text-center m-auto">
                    <Card.Header><h1>Le réseau Groupomania</h1></Card.Header>
                    <Card.Body>
                        <Card.Title><h2>Vous souhaite la bienvenue !</h2></Card.Title>
                        <hr/>
                        <Card.Text>
                            Un salon dédié à la rencontre entre collègues et collaborateurs.<br />
                            Partagez et discutez sur vos loisirs et sujets qui vous intéressent.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="top-left col-12 col-lg-4 m-auto">
                <img src={img} alt="Logo de Groupomania" className="rounded-circle" />
            </div>
        </section>
    </main>
    </>)
}
export default Home