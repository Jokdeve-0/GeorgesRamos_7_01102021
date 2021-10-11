import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import BrowserRoute from "./App/components/BrowserRoute"

const DatasContext = React.createContext({})

const App = () => {

const token = useState(JSON.parse(localStorage.getItem('ACCESS_TOKEN')))
const profile = useState(JSON.parse(localStorage.getItem('Profile')))
const ranking = useState(profile[0]?profile[0].rank:"")
const users = useState(JSON.parse(localStorage.getItem('Users')))
const articles = useState(JSON.parse(localStorage.getItem('all_articles')))
const comments = useState( localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [])
const answers = useState( localStorage.getItem('answers') ? JSON.parse(localStorage.getItem('answers')) : [] )
const article = useState( localStorage.getItem('article') ? JSON.parse(localStorage.getItem('article')) : [] )

    return (
    <DatasContext.Provider value={{token,profile,users,articles,comments,answers,article,ranking}} >
        <BrowserRoute />
    </DatasContext.Provider>)
} 
export default App 
export {DatasContext}