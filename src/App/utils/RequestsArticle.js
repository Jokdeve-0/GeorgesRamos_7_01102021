class RequestsArticle {

    /**
     * Retrieve all articles
     * @param {STRING} token 
     * @returns REPONSE
     */
    all_articles = async (token) => {
        try {
            const req = await fetch(`http://localhost:3000/articles`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ALL ARTICLES } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** 
     * Retrieve one article by ID
     * @param {STRING} token 
     * @returns REPONSE
     */
     one_article = async (token,id) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/${id}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ONE ARTICLE } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /**
     * Retrieve all articles by user
     * @param {STRING} token 
     * @returns REPONSE
     */
    articles_by_user = async (token,id) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/users`, {
                method:"POST",
                body: JSON.stringify({id:id}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ARTICLES BY USER } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /**
     * Retrieve all articles by categories
     * @param {STRING} token 
     * @returns REPONSE
     */
    articles_by_genre = async (token,genre) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/genre/${genre}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ARTICLES BY GENRE } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /**
     * Retrieve all articles by search
     * @param {STRING} token 
     * @param {STRING} search 
     * @returns 
     */
    search_articles = async (token,search) =>{
        try {
            const req = await fetch(`http://localhost:3000/articles/search/${search}`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ARTICLES BY SEARCH } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /**
     * Create article
     * @param {STRING} token 
     * @param {OBJECT} data 
     */
    create_article = async (token,data) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/newArticle`,
                {
                method: "POST",
                body: data,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH CREATE ARTICLE } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    
    /**
     * Delete one article by ID
     * @param {STRING} token
     * @param {*} datas 
     */
    delete_article = async (token,datas) => {
        try {
            await fetch(`http://localhost:3000/articles/delete`, {
                method:"DELETE",
                body:JSON.stringify(datas),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
                
            })
        } catch (e) {
            console.log(`"ERROR => { FETCH DELETE ARTICLE } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Modify a article
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    modify_article = async (token,data) => {
        try {
            const req = await fetch('http://localhost:3000/articles/article-modify',
                {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH MODIFY  ARTICLE } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Like a article
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    liked = async (token,datas) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/like`, {
                method: "PUT",
                body: JSON.stringify(datas),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH LIKED } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Dislike a article
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    disliked = async (token,datas) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/dislike`, {
                method: "PUT",
                body: JSON.stringify(datas),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH DISLIKED } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
}
const requestsArticle = new RequestsArticle()
export default requestsArticle