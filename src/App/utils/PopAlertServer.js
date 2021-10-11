import validations from "./Validations"

class PopAlertServer {

    register(register){
        validations.remove_validations_errors()
        const elm_Pseudo = document.getElementById('Pseudo')
        const p1 = document.createElement("p")
        p1.setAttribute("id","error-rgister")
        if(register.error === '⚠️ Already existing user! ⚠️' ){
            this.change_email()
        }else if(register.error === '⚠️ Already existing Pseudo! ⚠️' ){
            this.change_pseudo()
        }else {
            p1.innerHTML = "❌ Erreur du serveur ❌"
            elm_Pseudo.before(p1)
        }
    }

    login(){
        const p = document.createElement("p")
        p.setAttribute("id", "error-email")
        p.innerHTML = 'Identifiants incorrects'
        document.getElementById('Email').before(p)
    }

    change_email(){
        const p = document.createElement("p")
        p.setAttribute("id", "error-email")
        p.innerHTML = `L'email est déjà utilisé !`
        document.getElementById('Email').before(p)
    }
    
    change_pseudo(){
        const p = document.createElement("p")
        p.setAttribute("id", "error-pseudo")
        p.innerHTML = `Le pseudo est déjà utilisé !`
        document.getElementById('Pseudo').before(p)
    }

    user_removed(){
        return {
            delUser:document.location.href.includes('/bye')?true:false,
            message:"Votre compte est bien supprimé ... !",
            docLocation:''
        }
    }
}
const popAlertServer = new PopAlertServer()
export default popAlertServer