import React from "react"
import { BrowserRouter, Switch,Route} from "react-router-dom"
// COMPONENTS
import Footer from "./header&footer/Footer"
import Home from './layouts/Home'
import Signup from './layouts/Signup'
import Login from './layouts/Login'
import Forum from "./layouts/Forum"
import Account from "./layouts/Account"
import ArticleModif from "./article/CRUD/ArticleModif"
import { DatasContext } from "../../App"
import AdminPanel from "./layouts/AdminPanel"

const BrowserRoute = () => {

    /*# IS CONNECTED ? #*/
    const datas= React.useContext(DatasContext)
    let isConnected = datas.token[0] !== null ? true : false

    return (<>
        <BrowserRouter>
                <Switch>

                    {/* ADMINPANEL */}
                    <Route key="route-admin" path="/Admin-panel" render={(props)=> <AdminPanel  {...props} />} />

                    {/* ACCOUNT */}
                    <Route key="route-account" path="/account" render={(props)=> <Account {...props} />} />

                    {/* MODIFY PROFILE */}
                    <Route key="route-modif" path="/modified" render={(props)=> <Account {...props} />} />

                    {/* MODIFY ARTICLE */}
                    <Route key="route-article" path="/article-modified" render={(props)=> <ArticleModif {...props} />} />

                    {/* TENDANCES */}
                    <Route key="route-tendance" path="/tendance" render={(props)=> <Forum {...props}/>} />

                    {/* POPULARS */}
                    <Route key="route-popular" path="/popular" render={(props)=> <Forum {...props}/>}  />

                    {/* SEARCH */}
                    <Route key="route-search" path="/search" render={(props)=> <Forum {...props}/>} />

                    {/* LOGIN */}
                    <Route key="route-login" path="/login"  render={(props)=> <Login {...props} />} /> 

                    {/* SIGNUP */}
                    <Route key="route-signup" path="/signup"  render={(props)=> <Signup {...props} />} /> 

                    {/* FORUM */}
                    <Route key="route-forum" path="/forum" render={(props)=> <Forum {...props}/>} />

                    {/* HOME || FORUM if token is valid */}
                    {!isConnected ?
                    <Route key="route-home" path="/" render={(props)=> <Home {...props} />} />
                    :
                    <Route key="route-home-connect" path="/" render={(props)=> <Forum {...props}/>}/>
                    }

                </Switch>
                <footer><Footer/></footer>
        </BrowserRouter>
    </>)
}
export default BrowserRoute