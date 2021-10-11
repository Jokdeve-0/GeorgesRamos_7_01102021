import React,{useState} from "react"
import initDatas from "../../utils/InitDatas"
import Article from "../article/Article"
import ArticleForm from "../article/CRUD/ArticleForm"
import AsideCategories from "../menuAndPopup/AsideCategories"
import AsideUsers from "../menuAndPopup/AsideUsers"

import { DatasContext } from "../../../App"
import HeaderForum from "../header&footer/HeaderForum"

const Forum = (props) => {
    const datas = React.useContext(DatasContext)
    // const token = datas.token ? datas.token[0].ACCESS_TOKEN : null
    let token = ""
    let articlesState = []
    let users = []
    console.log(localStorage.getItem('genre'))

    if(localStorage.getItem('ACCESS_TOKEN') === null ){
        document.location.href='/'
    }else{
        token = datas.token[0].ACCESS_TOKEN
        articlesState = initDatas.set_articles(datas.token[0].ACCESS_TOKEN)
        users = datas.users[0]
    }
    if(articlesState === null){initDatas.cleanStore()}

    let [articles,setArticles] = useState(articlesState)
    const profile = datas.profile[0]

    return (<>

        <header>
            <HeaderForum token={token} profile={profile}/>
        </header>

        <main className="box-top desk">
            <div id="container-forum">
                <ArticleForm setArticles={setArticles} profile={profile} token={token} />

                <div className="d-flex justify-content-between align-items-start w-100">
                    <div className="d-none d-md-block col-md-3 col-lg-2" id="aside-menu">

                    <AsideCategories />

                    <AsideUsers token={token} users={users} />

                    </div>

                    <div className="col-12 col-md-9 col-lg-10 box-cards">
                        {articles === null || articles.length === 0 ? 
                            <div className="text-center">Il y a aucun article de publié</div>
                        :
                            articles.map((article) =><Article key={`${article.id}`} article={article} setArticles={setArticles} />)
                        }
                    </div>
            </div>
            </div>
        </main>
    </>)
} 

export default Forum