class RequestsAdmin {
    
    /** Access user admin
     * @param {STRING} token 
     * @returns RESPONSE
     */
    moderation = async (token)=>{
        try {
            const req = await fetch(`http://localhost:3000/articles/article-moderate`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH MODERATE } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Moderate a article
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    moderate_article = async (token,data) => {
        try {
            const req = await fetch('http://localhost:3000/articles/article-banned',
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
    
    /** Modify a rank
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    modify_rank = async (token,data) => {
        try {
            const req = await fetch('http://localhost:3000/auth/rank',
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
            console.log(`"ERROR => { FETCH MODIFY  RANK } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Moderate a comment
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    moderate_comment = async (token,data) => {
        try {
            const req = await fetch('http://localhost:3000/articles/comment-banned',
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
            console.log(`"ERROR => { FETCH MODERATE COMMENT } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Moderate a answer
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    moderate_answer = async (token,data) => {
        try {
            const req = await fetch('http://localhost:3000/articles/answer-banned',
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
            console.log(`"ERROR => { FETCH MODERATE ANSWER } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Delete a user
     * @param {STRING} token 
     * @param {OBJECT} email  
     * @returns REPONSE
     */
     remove_profile = async (token, email) => {
        try {
            const req = await fetch(`http://localhost:3000/auth/byeByAdmin`, {
                method: "DELETE",
                body: JSON.stringify(email),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH DELETE USER } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    
    /** Modify user password
     * @param {STRING} token 
     * @param {OBJECT} datas 
     * @returns RESPONSE
     */
}
const requestsAdmin = new RequestsAdmin()
export default requestsAdmin