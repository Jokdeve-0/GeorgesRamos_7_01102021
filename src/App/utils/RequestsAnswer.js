class RequestsAnswer {

    /**
     * Retrieve all answers
     * @param {STRING} token 
     * @returns REPONSE
     */
    all_answers = async (token) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/answers`, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ALL ANSWERS } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Create a answer
     * @param {STRING} token 
     * @param {OBJECT} data  
     * @returns REPONSE
     */
    create_answer = async (token,data) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/newanswer`,
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
            console.log(`"ERROR => { FETCH CREATE ANSWER } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
     /** Modify a answer
     * @param {STRING} token 
     * @param {OBJECT} datas 
     * @returns RESPONSE
     */
      modify_answer= async (token, datas) => {
        try {
            const req = await fetch(`http://localhost:3000/articles/modify-answer`, {
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
            console.log(`"ERROR => { FETCH MODIFY ANSWER } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /**
     * Delete a  answer
     * @param {STRING} token
     * @param {*} datas 
     */
     remove_answer = async (token,datas) => {
        try {
            await fetch(`http://localhost:3000/articles/delete-answer`, {
                method:"DELETE",
                body:JSON.stringify(datas),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                }

            })
        } catch (e) {
            console.log(`"ERROR => { FETCH DELETE ANSWER } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
}
const requestsAnswer = new RequestsAnswer()
export default requestsAnswer