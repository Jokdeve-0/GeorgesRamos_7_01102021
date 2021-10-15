import React,{useState} from "react"
import Profile from "../account/Profile"
import Article from "../article/Article"
import HeaderAccount from '../header&footer/HeaderAccount'
import {DatasContext} from '../../../App'

const Account = () => {

    const datas = React.useContext(DatasContext)
    let token = ""
    let profile = []
    let userId = 0
    let articlesState = []

    if(localStorage.getItem('ACCESS_TOKEN') === null){
        document.location.href='/'
    }else{
        token = datas.token[0].ACCESS_TOKEN
        profile = datas.profile[0]
        userId = profile.id
        articlesState = datas.articles[0]
    }

    let [articles,setArticles] = useState(articlesState)


    return (<>
        <header>
            <HeaderAccount token={token}/>
        </header>
        <main className="box-top desk">
            <h1 className="text-center h1Profile">Votre Profile</h1>
            <Profile setArticles={setArticles} />
            <h2 className="w-100 text-center"><span className="article-profile h4">Vos Publications</span></h2>
            <div className="col-11 col-sm-8 col-md-8 col-lg-6 col-xxl-5 mt-3 box-profile">
                {articles.map((article) => article.creatorId === userId ?<Article key={`${article.id}-${(Date.now()).toString()}`} article={article} setArticles={setArticles}/> : null )}
            </div>
        </main>
    </>)
} 

export default Account