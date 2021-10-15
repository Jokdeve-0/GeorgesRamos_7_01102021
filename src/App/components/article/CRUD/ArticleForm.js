import React, { useState } from "react"
import {Card,FloatingLabel,Form,Button,Collapse} from 'react-bootstrap'
import { TiImageOutline,TiMessages } from "react-icons/ti";
import categories from "../../../datas/categories"
import initDatas from "../../../utils/InitDatas"

function ArticleForm({setArticles,profile,token}) {

    const [open, setOpen] = useState(false)

    const [fileData, setFileData] = useState("")
    const file_change_handler = (e) => {
        setFileData(e.target.files[0]);
    };
  return (
    <section className="p-2 border formArticle">
        <Card.Body className="p-0 mb-1 d-flex justify-content-between align-items-center">
        <h2 className="h5">Envie de partager ?</h2>
            <Button variant="light" aria-label="ouvrir le formulaire" onClick={() => setOpen(!open)} aria-controls="Postez un message" aria-expanded={open}>
                <TiMessages/>
            </Button>
        </Card.Body>
        <Collapse in={open}>
            <form onSubmit={async (e)=>{ 
                e.preventDefault()
                const req = await initDatas.create_article(fileData,profile,token)
                if(req !== false){setOpen(!open)}
                setArticles(JSON.parse(localStorage.getItem('all_articles')))
                } } name="profile-form">
                <div className="form-message">
                    <FloatingLabel controlId="message" label="Ecrivez votre message...">
                        <Form.Control
                        as="textarea"
                        name="message"
                        placeholder="Ecrivez votre message..."
                        />
                    </FloatingLabel>
                    <div className="form_file">
                        <label className="d-flex" aria-label="Telecharger une image" htmlFor="image"><TiImageOutline/></label>
                        <input type="file" id="image" name="image" onChange={file_change_handler} />
                    </div>
                    <FloatingLabel controlId="genre" label="Catégories">
                        <Form.Select name="genre" aria-label="Sélectionnez la catégorie">
                            <option>Sélectionnez une catégorie</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </div>
                <button className="btn-form" type="submit"  aria-label="Enregistrer votre article">Postez votre message</button>
            </form>
        </Collapse>
    </section>
    );
}

export default ArticleForm;