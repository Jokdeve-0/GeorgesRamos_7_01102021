class RequestsUser {

    /** 
     * Send a request for a connection
     * @param {OBJECT} form {email,password}
     * @returns RESPONSE
     */
     login = async (form) => {
        try {
            const res = await fetch(`http://localhost:3000/auth/login`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            return res.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH LOGIN } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /**
     * Saves the user in the database
     * @param {OBJECT} form {email,pseudo,password}
     * @returns RESPONSE
     */
    signup = async (form) => {
        try {
            const res = await fetch(`http://localhost:3000/auth/signup`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            return res.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH SIGNUP } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** 
     * Retrieves data from a user by ID
     * @param {STRING} token 
     * @param {OBJECT} id 
     * @returns RESPONSE
     */
    one_profile = async (token, id) => {
        try {
            const req = await fetch(`http://localhost:3000/auth/user/`, {
                method: "POST",
                body: JSON.stringify({id:id}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ONE PROFILE } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** 
     * Retrieves data from all users
     * @param {STRING} token
     * @returns RESPONSE
     */
    all_profiles = async (token,userId) => {
        try {
            const req = await fetch(`http://localhost:3000/auth/users/`, {
                method: "POST",
                body: JSON.stringify({userId:userId}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            return req.json()
        } catch (e) {
            console.log(`"ERROR => { FETCH ALL PROFILES } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    
     /** Modify user pseudo
     * @param {STRING} token 
     * @param {OBJECT} datas 
     * @returns RESPONSE
     */
    modify_pseudo = async (token, datas) => {
        try {
            const req = await fetch(`http://localhost:3000/auth/pseudo-modify`, {
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
            console.log(`"ERROR => { FETCH MODIFY PSEUDO } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
    /** Modify user email
     * @param {STRING} token 
     * @param {OBJECT} datas 
     * @returns RESPONSE
     */
    modify_email = async (token, datas) => {
        try {
            const req = await fetch(`http://localhost:3000/auth/email-modify`, {
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
            console.log(`"ERROR => { FETCH MODIFY EMAIL } \nERROR-RECOVER : ${e}`)
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
            const req = await fetch(`http://localhost:3000/auth/bye`, {
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
     modify_pass = async (token, datas) => {
        try {
            const req = await fetch(`http://localhost:3000/auth/pass-modify`, {
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
            console.log(`"ERROR => { FETCH MODIFY PASSWORD } \nERROR-RECOVER : ${e}`)
            return false
        }
    }
}
const requestsUser = new RequestsUser()
export default requestsUser