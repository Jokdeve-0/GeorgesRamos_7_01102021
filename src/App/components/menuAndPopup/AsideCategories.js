import { NavLink } from "react-router-dom"
import initDatas from "../../utils/InitDatas"
import categories from "../../datas/categories"

const AsideCategories = () => {
    const GLOBAL_DATAS = initDatas.getArrayDataGlobal()
    const TOKEN = GLOBAL_DATAS[0]
    return(<>
        <p>CATÉGORIES</p>
        <nav className="d-flex flex-column">
            <NavLink className="NavCat" aria-label="" to="/popular" >Populaire</NavLink>
            <NavLink className="NavCat" aria-label="" to="/tendance" >Tendance</NavLink>
            <nav className="d-flex flex-column">
                {categories.map(cat => (
                    <a key={`${cat}-${(Date.now()).toString()}`} href="/genre" className="NavCat" aria-label={`Lien vers le genre ${cat}`} onClick={
                        async (e)=>{
                            initDatas.search_genre(e,TOKEN,cat)
                        }
                    }  >{cat}</a>
                ))}
            </nav>
        </nav>
    </>)
}
export default AsideCategories