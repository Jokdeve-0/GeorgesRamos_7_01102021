import React from "react"
import initDatas from "../../../utils/InitDatas"
import {FaRegThumbsDown} from "react-icons/fa"

const Dislike = ({token,article,userId,setArticles}) => {

    let dislikers = JSON.parse(article.userAgainst)
    let numberOfAgainst= article.voteAgainst
    let like = JSON.parse(article.userFor).includes(userId)?true:false
    let dislike = JSON.parse(article.userAgainst).includes(userId)?true:false

    if(like === true && dislike === false){
        return (<FaRegThumbsDown className={`icon down used`} />)
    }else {
        return (<FaRegThumbsDown className={`icon down`} onClick={async ()=>{
            await initDatas.disliked_article(token,article.id,dislikers,numberOfAgainst,userId)
            setArticles(JSON.parse(localStorage.getItem('all_articles')))
        }} />)
    }
}

export default Dislike