class RequestsComment {

    /**
     * Retrieve all comments
     * @param {STRING} token 
     * @returns REPONSE
     */
    all_comments = async (token) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/comments`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ALL COMMENTS } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Create a comment
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    create_comment = async (token,data) =>{
        try {
            const req = await fetch(`http://localhost:3000/articles/newComment`,
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
            console.log(`"ERROR => { FETCH CREATE COMMENT } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
     /** Modify a comment
     * @param {STRING} token 
     * @param {OBJECT} datas 
     * @returns RESPONSE
     */
      modify_comment= async (token, datas) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/modify-comment`, {
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
            console.log(`"ERROR => { FETCH MODIFY COMMENT } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /**
     * Delete a comment with us answers
     * @param {STRING} token
     * @param {*} datas 
     */
     remove_comment = async (token,datas) => {
        try {
            await fetch(`http://localhost:3000/articles/delete-comment`, {
                method:"DELETE",
                body:JSON.stringify(datas),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
                
            })
        } catch (e) {
            console.log(`"ERROR => { FETCH DELETE COMMENT } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
}
const requestsComment = new RequestsComment()
export default requestsComment