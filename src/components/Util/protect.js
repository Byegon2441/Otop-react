import React, { Component } from 'react'
import AuthService from './AuthService';
import Protected from '../../containers/error/ProtectRoute'

export default function withAuth(AuthComponent){
    const Auth = new AuthService();
    return class AuthWrapped extends React.Component{
        constructor(){
            super();
            this.state ={
                user:null
            }
        }

        componentWillMount(){
            if(!Auth.loggedIn()){
                
            }else{
                try{
                    const profile = Auth.getProfile
                    this.setState({
                        user:profile
                    })
                }catch(err){
                    Auth.logout();
                }
            }
        }
        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user}  />
                )
            }
            else {
                return <Protected/>
            }
        }
    }
    
    
}