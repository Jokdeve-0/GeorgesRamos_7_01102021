import React from "react"
import {Card} from 'react-bootstrap'
import { DatasContext } from "../../../App"
import CardArticle from "./CardArticle"
import CardComment from "./CardComment"

const Article = ({article,setArticles,admin}) => {

    const datas = React.useContext(DatasContext)
    const token = datas.token[0].ACCESS_TOKEN
    const profile = datas.profile[0]
    

    let isThereImg = article.image === "" ? false : true
    let classCSS = "card-img-top"

    if(!admin){
        if(article.valide === 1){
            article.image = "./css/img/moderate.JPG"
            article.message = "Cette article ne respecte pas les règles du forum, veuillez contact l'administrateur afin de corriger votre erreur ..."
            classCSS = "card-img-top w-50 m-auto"
            isThereImg = true
        }
    }
    

    return (
        <Card className="bg-light">

            {isThereImg ? <img alt={`${article.message}-${article.id}`} className={classCSS} src={article.image}  /> : null }

            <CardArticle token={token} article={article} profile={profile} setArticles={setArticles} admin={admin} />
        
        {article.valide !== 0 ? 
            null:
            <CardComment article={article} token={token}  setArticles={setArticles} userId={profile.id} profile={profile} admin={admin}/>
        }

        </Card>
    )
}
export default Article