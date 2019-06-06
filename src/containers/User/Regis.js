import React, { Component } from "react";
import Header from "../../components/Header";
import { DropdownButton,MenuItem } from 'react-bootstrap';
import Auth,{Url} from '../../components/Util/AuthService'
import Regis from '../../components/User/Reigster'

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {

			datasource:""
		}
		this.Auth = new Auth();
	}

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.history.replace('/');
        }
    }

	render() {
        return <div>
          <Header />
          <div className="row">
			  <div className="col-md-3">
				
			  </div>
              <div className="col-md-6">
                <Regis/>
              </div>
              <div className="col-md-3">

              </div>
          </div>
        </div>
  
		
		
	}
}


export default Home;
