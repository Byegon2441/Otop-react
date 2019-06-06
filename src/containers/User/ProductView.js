import React, { Component } from 'react'
import Auth,{Url} from '../../components/Util/AuthService'
import ProductList from '../../components/product/ProductList'
import ProductDetail from '../../components/product/ProductDetail'
import Dialog from '../../components/Util/DialogDetail'
import Header from '../../components/Header'
class Product extends Component {

    constructor(props){
        super(props);
        this.state={
            datasource:''
        }
        this.Auth = new Auth();
    }

   async componentDidMount(){
       await this.Auth.fetch(`${Url}/api/user/getProduct/${this.props.match.params.id}`,{method:"GET"})
		.then(async res=>{
            console.log(res);
            
			await this.setState({datasource:res})
		})	
    }

  render() {
    if(this.state.datasource!=null){
        return (
    <div>
      <Header />
      <div className="col-md-6 text-center">
      <ProductList products={this.state.datasource}/>
      <Dialog/>
      </div>
      
    </div>
  );
    }
  }
}
export default Product;