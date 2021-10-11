import React, { useState } from "react"
import {NavLink} from 'react-router-dom'
import { BiMessageEdit,BiLeftArrowCircle } from "react-icons/bi"
import {Card,FloatingLabel,Form,Button,Collapse} from 'react-bootstrap'
import categories from "../../../datas/categories"
import initDatas from "../../../utils/InitDatas"
import HeaderModifyArticle from "../../header&footer/HeaderModifyArticle"
import { DatasContext } from "../../../../App"

function ArticleModif() {
    const datas = React.useContext(DatasContext)
    const[articles,setarticles] = useState(datas.articles[0])
    console.log(articles)
    const article = datas.article[0]
    const token = datas.token[0].ACCESS_TOKEN

    const [open, setOpen] = useState(true)

    const [message, setMessage] = useState(article.message)
    const isThereImg = article.image === "" ? false : true

   
  return (<>
    <header>
        <HeaderModifyArticle token={token} />
        <NavLink aria-label="Lien vers votre profile" to="/account" onClick={async (e) => {
                    e.preventDefault()
                    await initDatas.initializeGlobalDatas({token:token})
			        document.location.href = "/forum"
                }}><BiLeftArrowCircle className='icon-return'/></NavLink>
        
    </header>
    <main>
        <div id="container-forum">
            <Card className="p-2 border my-2 formArticle">
                <Card.Body className="p-0 mb-1 d-flex justify-content-between align-items-center">
                    <Card.Title className="m-0 text-dark">Envie de modifier votre article ?</Card.Title>
                    <Button variant="light" aria-label="ouvrir le formulaire" onClick={() => setOpen(!open)} aria-controls="Postez un message" aria-expanded={open}>
                        <BiMessageEdit/>
                    </Button>
                </Card.Body>
                <Collapse in={open}>
                    <form onSubmit={ async (e)=>{ e.preventDefault(); await initDatas.modify_article(token,article.id); setarticles(JSON.parse(localStorage.getItem('all_articles'))) } } name="edit profile form">
                        <div className="d-flex flex-wrap justify-content-center align-items-center border rounded p-1">
                            {isThereImg? <img className="mb-3" src={article.image} alt={article.message} width="100" />: null}
                            <FloatingLabel controlId="genre" className="mb-3 w-75" label="Catégories">
                                <Form.Select name="genre" defaultValue={article.genre} aria-label="Sélectionnez la catégorie">
                                    <option>Sélectionnez une catégorie</option>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="message" className="w-100" label="Ecrivez votre message...">
                                <Form.Control
                                as="textarea"
                                name="message"
                                placeholder="Ecrivez votre message..."
                                defaultValue={message}
                                onChange={
                                    ()=>{
                                        setMessage(document.getElementById('message').value)
                                    }
                                }
                                />
                            </FloatingLabel>
                        </div>
                        <button className="btn-form" type="submit"  aria-label="">Postez votre message</button>
                    </form>
                </Collapse>
            </Card>
        </div>
    </main>
    </>);
}

export default ArticleModif;