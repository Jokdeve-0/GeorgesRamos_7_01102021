import popAlertServer from './PopAlertServer'
import validations from "./Validations"
import requestsUser from './RequestsUser'
import requestsArticle from './RequestsArticle'
import requestsComment from './RequestsComment'
import requestsAnswer from './RequestsAnswer'

class InitDatas {

    constructor(){
        this.globalDatas = ["ACCESS_TOKEN","User","all_articles",
        "Profile","genre","search","article","Users","articlesProfile",
        "comments","answers"]
    }
    /*##################################################################*/
    /*                 INITIALIZATION & STORE DATAS
    /*##################################################################*/
    /** Initialization of all data for the application
     * @param {OBJECT} user {email,pseudo,password}
     */
     initializeDatasInStorage = async (user) => {
        //  Login => Get an object containing a token and a user id
        const loginDatas = await this.initializeLoginDataInStorage(user)
        if(loginDatas !== undefined){
            // Profile => Store the profile and the user id in the localStorage
            await this.initializeProfileDataInStorage(loginDatas.token,loginDatas.userId)
            if(loginDatas.rank === "BOSS"){
                // all_users => Store all users in localStorage
                await this.initializeAllUsersInStorage(loginDatas.token,loginDatas.userId,loginDatas.rank)
            }else{
                // all_users => Store all users in localStorage
                await this.initializeAllUsersInStorage(loginDatas.token,loginDatas.userId)
            }
            // Global datas => Stores all data from articles, comments and answers in the localStorage
            await this.initializeGlobalDatas(loginDatas)
            // [ - EXIT - ] Redirect to the forum
            document.location.href = "/forum"
        }
    }
    /** Login => Initializes and stores connection data
     * @param {OBJECT} user {email,pseudo,password}
     * @returns {OBJECT} {token,userId}
     */
     initializeLoginDataInStorage = async (user)=>{
        // Send form to login
        const login = await requestsUser.login(user)
        const ACCESS_TOKEN = login.token ? {"ACCESS_TOKEN": login.token} : false
        // [ - EXIT - ] If error display error message
        if (!ACCESS_TOKEN) {
            popAlertServer.login()
        } else {
            // Store user data in localStorage
            localStorage.setItem('ACCESS_TOKEN', JSON.stringify(ACCESS_TOKEN))
            localStorage.setItem('User', JSON.stringify(login.userId))
            return {token:ACCESS_TOKEN.ACCESS_TOKEN,userId:login.userId,rank:login.rank}
        }
    }
    /** Profile datas => Stores all data from Profile
     * @param {STRING} token 
     * @param {NUMBER} userId 
     */
     initializeProfileDataInStorage = async (token,userId) => {
        // Retrieve infos of current user
        const profile = await requestsUser.one_profile(token,userId)
        if (profile.user) {
            const current_profile = profile.user[0]
            // Store infos of the current user in localStorage
            localStorage.setItem('Profile', JSON.stringify(current_profile))
        }
   }
    /** Global datas => Stores all data from articles, comments and answers in the localStorage
     * @param {OBJECT} loginDatas {token,userId}
     */
    initializeGlobalDatas = async (loginDatas) =>{
        await this.initializeAllArticlesInStorage(loginDatas.token)
        await this.initializeCommentsInStorage(loginDatas.token)
        await this.initializeAnswersInStorage(loginDatas.token)
    }
    /** Articles datas => Stores all data from articles
     * @param {STRING} token 
     */
    initializeAllArticlesInStorage = async (token)=>{
        // Retrieve all articles
        const articles = await requestsArticle.all_articles(token)
        // Stores all articles in localStorage
        if (articles.all_articles) {
            localStorage.setItem('all_articles', JSON.stringify(articles.all_articles))
        }
    }
    /** Comments datas => Stores all data from Comments
     * @param {STRING} token 
     */
    initializeCommentsInStorage = async (token) => {
        // Retrieve all comments
        const all_comments = await requestsComment.all_comments(token)
        // Stores all comments in localStorage
        localStorage.setItem('comments',JSON.stringify(all_comments))
    }
    /** Answers datas => Stores all data from Answers
     * @param {STRING} token 
     */
    initializeAnswersInStorage = async (token) => {
        // Retrieve all answers
        const all_answers = await requestsAnswer.all_answers(token)
        // Stores all answers in localStorage
        localStorage.setItem('answers',JSON.stringify(all_answers))
    }
    /** Users datas => Stores all data from users
     * @param {STRING} token 
     */
    initializeAllUsersInStorage = async (token,userId,rank = "SOLDIER") => {
        // Retrieve all users
        const all_users = await requestsUser.all_profiles(token,userId)
        const infosUsersInStore = []
        if(rank === "BOSS"){
            // Retrieve user id & user pseudo
            all_users.users.map(user => (
                infosUsersInStore.push({id:user.id,email:user.email,pseudo:user.pseudo,rank:user.rank})
            ))
        }else{
            all_users.users.map(user => (
                infosUsersInStore.push({id:user.id,pseudo:user.pseudo})
            ))
            

        }
        // Store all users infos in localStorage
        localStorage.setItem('Users',JSON.stringify(infosUsersInStore))
    }
    /*##################################################################*/
    /*                          DATA RECOVERY
    /*##################################################################*/
    /** Retrieve a current token
     * @returns {STRING} {token}
     */
    IsConnect(){
        const IsToken = localStorage.getItem('ACCESS_TOKEN') ? JSON.parse(localStorage.getItem('ACCESS_TOKEN')) : false
        return IsToken !== false ? IsToken.ACCESS_TOKEN : IsToken
    }
    // CONNECTED 0,USERS 1,USERID 2,PROFILE 3,ARTICLES 4,COMMENTS 5,ANSWERS 6,ARTICLE 7 ###################################
    getArrayDataGlobal(){
          // Check if the user has a valid connection ( Redirect the document.location to login or forum )
    const CONNECTED = this.IsConnect()
    const USERS = localStorage.getItem('Users') ? JSON.parse(localStorage.getItem('Users')) : []
    const USERID = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : false
    const PROFILE = localStorage.getItem('Profile') ? JSON.parse(localStorage.getItem('Profile')) : []
    const ARTICLES = localStorage.getItem('all_articles') ? this.set_articles(CONNECTED) : []
    const COMMENTS = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : []
    const ANSWERS = localStorage.getItem('answers') ? JSON.parse(localStorage.getItem('answers')) : []
    const ARTICLE = localStorage.getItem('article') ? JSON.parse(localStorage.getItem('article')) : []
    return [CONNECTED,USERS,USERID,PROFILE,ARTICLES,COMMENTS,ANSWERS,ARTICLE]
    
    }

    /*##################################################################*/
    /*                 REFRESH, RE-INITIALIZATION & CLEAN DATAS
    /*##################################################################*/
    /** Refresh all articles from updated articles
     * @param {STRING} token 
     */
     refresh_articles = async (token,url = '/') => {
        // Retrieves new data from updated articles
        const articles = await requestsArticle.all_articles(token)
        // Re store articles and delete old ones
        if (articles.all_articles) {
            localStorage.setItem('all_articles', JSON.stringify(articles.all_articles))
            localStorage.removeItem('genre')
            localStorage.removeItem('search')
            localStorage.removeItem('article')
        } else {
            // [ - EXIT - ] If error clean the store & redirect to login page
            this.cleanStore()
        }
    }
    /** Clean the store of all datas ( Logout )
     */
    cleanStore(){
        this.globalDatas.map(data=>localStorage.removeItem(data))
        document.location.href = "/login"
    }
    /**Retrieves the articles according to the parameter in the url
     * @param {STRING} token 
     */
    set_articles(token){

        var articles = []
        // All articles
        const anyArticles = JSON.parse(localStorage.getItem('all_articles'))
        if(anyArticles !== null || anyArticles !== undefined) {
            articles = anyArticles
        }else{
            // [ - EXIT - ] If there is no data to store, redirects to the login page
            document.location.href='/login'
        }
        // BY SEARCH
        if(document.location.href.includes('search')){
            articles = localStorage.getItem('search') !== "undefined" ? JSON.parse(localStorage.getItem('search')):null
        }
        // BY POPULAR
        if(document.location.href.includes('popular')){
            articles = this.call_popular(articles)
        }
        // BY TENDANCE
        if(document.location.href.includes('tendance')){
            articles = this.call_tendance(articles)
        }
        // BY CATEGORIES
        if(document.location.href.includes('genre')){
            articles = localStorage.getItem('genre') !== "undefined" ? JSON.parse(localStorage.getItem('genre')):null
        }
        // BY USER
        if(document.location.href.includes('articlesProfile')){
            articles = localStorage.getItem('articlesProfile') !== "undefined" ? JSON.parse(localStorage.getItem('articlesProfile')):null
        }
        console.log(articles)
        console.log(typeof(articles))

        return articles
    }
    /*##################################################################*/
    /*                   HANDLING FUNCTIONS
    /*##################################################################*/
    connect = async () => {
        //  Check the form data
        const user = validations.validation_login()
        // Save global connection data in localStorage
        if(!user){
            return false
        }else{
            await this.initializeDatasInStorage(user)
        }
    }
    search = async (token,search) =>{
        const req = await requestsArticle.search_articles(token,search)
        localStorage.setItem('search',JSON.stringify(req.search))
        document.location.href='/search'
    }
    search_genre = async (e,TOKEN,cat) => {
        e.preventDefault()
        const array_genre = await requestsArticle.articles_by_genre(TOKEN,cat)
        localStorage.setItem('genre',JSON.stringify(array_genre.genre))
        document.location.href='/genre'
    }
    /** Retrieve and format the current date & time
     * @returns {STRING} (dd/mm/yy à hh:mm)
     */
    FormatDate(){
        var dateOriginal = new Date()
        var dateStr = dateOriginal.toLocaleString()
        var date = dateStr.split(' ')[0].substring(0,dateStr.split(' ')[0].length-1)
        var time =  dateStr.split(' ')[1].substring(0,dateStr.split(' ')[1].length-3)
        return `${date} à ${time}`
    }
    /** Retrieve all articles in order of most like
     * @param {OBJECT} popular 
     * @returns {OBJECT} sort
     */
    call_popular = (popular)=> {
        popular.sort(function compare(a, b) {
            if (a.voteFor < b.voteFor) 
                return -1
            if (a.voteFor > b.voteFor) 
                return 1
            return 0
        })
        return popular.reverse()
    }
    /** Retrieve all articles in the order of the most votes
     * @param {OBJECT} tendance 
     * @returns {OBJECT} sort
     */
    call_tendance = (tendance)=> {
        tendance.sort(function compare(a, b) {
            if (a.voteFor+a.voteAgainst < b.voteFor+b.voteAgainst)
               return -1
            if (a.voteFor+a.voteAgainst > b.voteFor+b.voteAgainst )
               return 1
            return 0
          })
          return tendance.reverse()
    }
    create_article = async (fileData,PROFILE,TOKEN)=>{
        if(validations.validation_article()){
            
            const data = new FormData();
            data.append("image", fileData);
            data.append("pseudo",PROFILE.pseudo)
            data.append("message", document.getElementById('message').value);
            data.append("genre", document.getElementById('genre').value);
            data.append("dates", this.FormatDate())
            const req = await requestsArticle.create_article(TOKEN,data)
            if(req.error){
                return {error:req.error}
            }
            document.getElementById('message').value=""
            await this.refresh_articles(TOKEN)
            return true
        }
        return false
    }
    call_article = async (TOKEN,id) => {
        const req = await requestsArticle.one_article(TOKEN,id)
        localStorage.setItem('article',JSON.stringify(req.article[0]))
        document.location.href='/article-modified'
    }
    modify_article = async (token,id) => {
        var smsNotOk = validations.validation_article()
        if(smsNotOk){
            const data = {
                message:document.getElementById('message').value,
                genre:document.getElementById('genre').value,
                articleId:id
            }
            const req = await requestsArticle.modify_article(token,data)
            if(req.error){
                return {error:req.error}
            }
            await initDatas.refresh_articles(token)
            document.location.href='/forum'
        }
    }
    delete_article = async (TOKEN,article) => {
        await requestsArticle.delete_article(TOKEN,article)
        await this.refresh_articles(TOKEN,'/forum')
    }
    /** Modify the pseudo
     * @param {STRING} token
     * @param {OBJECT} users
     */
    change_pseudo = async (token, users) => {
        // Check the form data
        const user = validations.validations_pseudo()
        if(user){
            // Rebuild the form data
            const datas = {
                id: users,
                pseudo: user.pseudo
            }
            // Send the form
            const userMod = await requestsUser.modify_pseudo(token, datas)
            if (userMod.error) {
                // If error display error message
                popAlertServer.change_pseudo()
                return false
            }
            // Retrieve infos of current user
            const RetrieveUser = await requestsUser.one_profile(token, users)
            if (!RetrieveUser.error) {
                const cur_user = RetrieveUser.user[0]
                // Save infos of the current user in localStorage
                localStorage.setItem('Profile', JSON.stringify({
                    id: cur_user.id,
                    pseudo: cur_user.pseudo,
                    email: cur_user.email
                }))
            }
            return userMod
        }
        return false
    }
    /** Modify the email
     * @param {STRING} token
     * @param {OBJECT} users
     */
    change_email = async (token, users) => {
        // Check the form data
        const user = validations.validations_email()
        if(user){
            // Rebuild the form data
            const datas = {
                id: users.id,
                email: users.email,
                Nemail: user.email
            }
            // Send the form
            const userMod = await requestsUser.modify_email(token, datas)
            if (userMod.error) {
                // If error display error message
                popAlertServer.change_email()
                return false
            }
            // Retrieve infos of current user
            const RetrieveUser = await requestsUser.one_profile(token, users.id)
            if (!RetrieveUser.error) {
                const cur_user = RetrieveUser.user[0]
                // Save infos of the current user in localStorage
                localStorage.setItem('Profile', JSON.stringify({
                    id: cur_user.id,
                    pseudo: cur_user.pseudo,
                    email: cur_user.email
                }))
            }
            return userMod
        }
        return false
    }
    /** Delete a user's account
     * @param {STRING} token 
     * @param {OBJECT} email 
     */
    delete_profile = async (token, email) => {
        //  Suppress error message
        validations.remove_validations_errors()
        // send data for deletion
        const userRemoved = await requestsUser.remove_profile(token, email)
        if (userRemoved.error) {
            // create element for error message
            const p = document.createElement("p")
            p.setAttribute("id", "error-email")
            p.innerHTML = userRemoved.error.includes('Invalid') ? `${userRemoved.error}` : `🛑  L'utilisateur n'existe pas ! 🛑  <br/> ${userRemoved.error}`
            // Display error message
            document.getElementById('user-profile').before(p)
        } else {
            // Delete all global connection data
            this.cleanStore()
            document.location.href = '/bye'
        }
    }
    send_comment= async (token,userId,pseudo,articleId,inputId)=>{

        var smsOk = validations.validations_comment(inputId)
        if(smsOk.comment){
            const data = {pseudo:pseudo, articleId:articleId, comment:document.getElementById(inputId).value, creatorId:userId,dates:this.FormatDate()}
            const req = await requestsComment.create_comment(token,data)
            if(req.error){
                return {error:req.error}
            }
            document.getElementById(inputId).value =""
            await this.initializeGlobalDatas({token:token})
        }
    }
    calculComments = (comments,article,answers) => {
        let commentArray = []
        comments.map(comment => comment.articleId === article.id ? commentArray.push(comment):null)
        answers.map(answer => answer.articleId === article.id ? commentArray.push(answer):null )
        return commentArray
    }
    send_answer = async (TOKEN,inputId,commentId,pseudo,creatorId,article) => {

        var smsOk = validations.validations_comment(inputId)
        if(smsOk.comment){
            const data = {commentId:commentId,articleId:article.id,creatorId:creatorId,pseudo:pseudo,message:document.getElementById(inputId).value,dates:this.FormatDate(),userId:creatorId}
            const req = await requestsAnswer.create_answer(TOKEN,data)
            if(req.error){
                return {error:req.error}
            }
            document.getElementById(inputId).value =""
            await this.initializeGlobalDatas({token:TOKEN})
        }
    }
    liked_article = async (token,articleId,likers,numberOfFor,userId)=>{
        let container = likers,message ="",newNumberOfFor = 0
        if(!likers.includes(userId)){
            container.push(userId)
            newNumberOfFor = numberOfFor + 1
            message = '✅ You liked the article ✅'
        }else{
            container.splice(container.indexOf(userId),1)
            newNumberOfFor = numberOfFor -1
            message = '✅ You have removed your liking from the article ✅'
        }
        const datas = {articleId:articleId,userFor:JSON.stringify(container),voteFor:newNumberOfFor,message:message}
        await requestsArticle.liked(token,datas)
        await this.refresh_articles(token)
    }
    disliked_article = async (token,articleId,dislikers,numberOfAgainst,userId)=>{
        let container = dislikers,message ="",newNumberOfAgainst = 0
        if(!dislikers.includes(userId)){
            container.push(userId)
            newNumberOfAgainst = numberOfAgainst + 1
            message = '✅ You disliked the article ✅'
        }else{
            container.splice(container.indexOf(userId),1)
            newNumberOfAgainst = numberOfAgainst -1
            message = '✅ You have removed your disliking from the article ✅'
        }
        const datas = {articleId:articleId,userAgainst:JSON.stringify(container),voteAgainst:newNumberOfAgainst,message:message}
        await requestsArticle.disliked(token,datas)
        await initDatas.refresh_articles(token)
    }
    change_password=async(token,userId)=>{
        var oldPass = validations.validations_password()
        var newPass = validations.validations_confPassword()
        if(oldPass.password && newPass.confPassword){
            const data = {oldPassword:document.getElementById('Password').value,newPassword:document.getElementById('confPassword').value,userId:userId}
            const req = await requestsUser.modify_pass(token,data)
            if(req.error){
                return {error:req.error}
            }
            document.getElementById('Password').value =""
            document.getElementById('confPassword').value =""
            return req
        }
    }
}
const initDatas = new InitDatas()
export default initDatas