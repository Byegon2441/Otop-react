import decode from 'jwt-decode'

export const Url = "http://10.1.239.9:5000";

export default class AuthService{
    constructor(domain){
        this.domain = domain || Url;
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    register(id_card,Username,Password,Firstname,Lastname,nameTitle,sex,date){
        return this.fetch(`${this.domain}/api/user/register`,{
            method:'POST',
            body:JSON.stringify({
                id_card:id_card,
                Username:Username,
                Password:Password,
                Firstname:Firstname,
                Lastname:Lastname,
                nameTitle:nameTitle,
                sex:sex,
                date:date,
            })
            }).then(res=>{
                return Promise.resolve(res);
            })
    }

    login(username,password){
        
        return this.fetch(`${this.domain}/api/user/login`,{
            method:'POST',
            body:JSON.stringify({
                Username:username,
                Password:password
            })
            }).then(res=>{
                return Promise.resolve(res);
            })
    }

    fetch(url,options){
        const headers ={
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
        if(this.loggedIn()){
            headers['x-access-token']=`${this.getToken()}`
        }
        return fetch( url,{
            headers,
            ...options
        })
        .then(response=>response.json())
    }

    getToken(){
        return localStorage.getItem('id_token')
    }
    setToken(idToken){
        return localStorage.setItem('id_token',idToken);
    }
    loggedIn(){
        const token=this.getToken();
        return !!token && this.isTokenExpired(token)
    }
    setRole(role){
        return localStorage.setItem('role',role)
    }
    getRole(){
        return localStorage.getItem('role')
    }

    isTokenExpired(token){
        try{
            const decoded = decode(token);
            
            if(Date.now()/1000 > decoded.exp){
                return false;
            }else{
                return true
            }
        }catch(e){
            return false;
        }
    }
    logout(){
        localStorage.removeItem('id_token');
        localStorage.removeItem('role');        
    }
    getProfile(){
        return decode(this.getToken())
    }

    _checkStatus(response){
        if(response.status>=200 && response<300){
            return response
        }else{
            let error = new Error(response);
            error.response = response;
            throw error
        }
    }
    
    isadmin(){
        const token=this.getToken();
        try{
            let decoded = decode(token)
            return decoded.role===2
        }catch(error){
            return false
        }
        
        
        // console.log(`HI Rank ${decoded.role===2}`);
        
    }


}