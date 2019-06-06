import React, { Component } from 'react'
import AuthService from './AuthService';
import Protected from '../../containers/error/ProtectRoute'

export default function withAdmin(AuthComponent){
    const Auth = new AuthService();
    return class AuthWrapped extends React.Component{
        constructor(){
            super();
            this.state ={
                user:null,
                role:false
            }
        }

        componentWillMount(){
            if(!Auth.loggedIn()){
                
            }else{
                try{
                    const profile = Auth.getProfile()
                    const Roleadmin = Auth.isadmin()
                    this.setState({
                        user:profile,
                        role:Roleadmin
                    })
                }catch(err){
                    Auth.logout();
                }
            }
        }
        render() {

            if (this.state.user) {
                if(this.state.role){
                    return (
                    
                        <AuthComponent history={this.props.history} user={this.state.user} />
                    )
                }else{
                    return <Protected />
                }
                
            }
            else {
                return <Protected />
            }
        }
    }
    
    
}