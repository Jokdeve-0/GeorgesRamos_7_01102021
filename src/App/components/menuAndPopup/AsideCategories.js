import { NavLink } from "react-router-dom"
import initDatas from "../../utils/InitDatas"
import categories from "../../datas/categories"

const AsideCategories = ({token}) => {
    return(<>
        <h2>CATÉGORIES</h2>
        <nav className="d-flex flex-column" aria-label="menu des categories">
            <NavLink className="NavCat" aria-label="" to="/popular" >Populaire</NavLink>
            <NavLink className="NavCat" aria-label="" to="/tendance" >Tendance</NavLink>
            <nav className="d-flex flex-column">
                {categories.map(cat => (
                    <a key={`${cat}-${(Date.now()).toString()}`} href="/genre" className="NavCat" aria-label={`Lien vers le genre ${cat}`} onClick={
                        async (e)=>{
                            initDatas.search_genre(e,token,cat)
                        }
                    }  >{cat}</a>
                ))}
            </nav>
        </nav>
    </>)
}
export default AsideCategories