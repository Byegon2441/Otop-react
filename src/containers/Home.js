import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DropdownButton,MenuItem } from 'react-bootstrap';
import Auth,{Url} from '../components/Util/AuthService'
import ProductList from '../components/product/ProductList'

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {

			datasource:""
		}
		this.Auth = new Auth();
	}

	componentDidMount() {
		this.Auth.fetch(`${Url}/api/user/getProduct`,{method:"GET"})
		.then(res=>{
			this.setState({datasource:res})
		})	
	}

	ViewDetail(product){
		this.props.history.push('product/edit/' + product.id);
	}

	render() {
		if(this.state.datasource!=null){
			return (
        <div>
          <Header />
          <div>
			  <div>
				<ProductList products={this.state.datasource} onView={this.ViewDetail}/>
			  </div>
          </div>
          <Footer company="Atw" email="atw29771@gmail.com" />
        </div>
      );
		}
		
	}
}


export default Home;
