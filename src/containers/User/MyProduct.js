import React, { Component } from "react";
import Header from "../../components/Header";
import { DropdownButton,MenuItem } from 'react-bootstrap';
import Auth,{Url} from '../../components/Util/AuthService'
import ProductList from '../../components/product/ProductList'
import ConfirmUtil from "../../components/Util/Confirm"
import withAuth from '../../components/Util/protect'
class Home extends Component {

	constructor(props){
		super(props);
		this.state = {

			datasource:""
		}
        this.Auth = new Auth();
        this.delProduct = this.delProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
	}

	componentDidMount() {
		this.Auth.fetch(`${Url}/api/user/getMyProduct`,{method:"GET"})
		.then(res=>{
			console.log(res);
			
			this.setState({datasource:res})
		})	
	}

    delProduct(product){
			this.Auth.fetch(`${Url}/api/user/delProduct/${product.id}`,{method:"POST"})
			.then(res=>{
				console.log(res)
				this.Auth.fetch(`${Url}/api/user/getMyProduct`,{method:"GET"})
				.then(res=>{
					this.setState({datasource:res})
				})	
			})
    }

    editProduct(product){
        this.props.history.push('./myproduct/edit/'+product.id);
    }

	render() {
		if(this.state.datasource!=null){
			return (
        <div>
          <Header />
          <div>
			  <div>
					<ProductList products={this.state.datasource} onView={this.ViewDetail} onDelProduct={this.delProduct} onEditProduct={this.editProduct}/>
			  </div>
          </div>
        </div>
      );
		}else{
			return <div className="text-center">
				<h1>ไม่พบข้อมูลสินค้าของผู้ใช้</h1>
			</div>
		}
		
	}
}


export default withAuth(Home);
