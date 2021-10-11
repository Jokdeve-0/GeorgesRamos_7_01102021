import initDatas from "../../../utils/InitDatas"
import {FaRegThumbsUp} from "react-icons/fa"

const Like = ({token,article,userId,setArticles}) => {

    let likers= JSON.parse(article.userFor)
    let numberOfFor = article.voteFor
    let like = JSON.parse(article.userFor).includes(userId)?true:false
    let dislike = JSON.parse(article.userAgainst).includes(userId)?true:false

        if(like === false && dislike === true){
            return (<FaRegThumbsUp className={`icon up used`} />)
        }else{
            return (<FaRegThumbsUp className={`icon up`} onClick={async ()=>{
                await initDatas.liked_article(token,article.id,likers,numberOfFor,userId)
                setArticles(JSON.parse(localStorage.getItem('all_articles')))
            }} />)
        }
}

export default Like