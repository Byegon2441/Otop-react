import React, { Component } from 'react'
import ProductEdit from '../../components/product/ProductEdit'
import Header from '../../components/Header'
import Auth,{Url} from '../../components/Util/AuthService'
import withAuthParam from '../../components/Util/protectParams'

class EditProduct extends Component {

    constructor(props){
        super(props);
        this.state= {
            datasource:""
        }
        this.Auth = new Auth();
        console.log(this.props.PassParams.id)
    }

   async componentDidMount(){
       await this.Auth.fetch(`${Url}/api/user/getProduct/${this.props.PassParams.id}`,{method:"GET"})
		.then(async res=>{
            console.log(res.length);
            
			await this.setState({datasource:res[0]})
		})	
    }

  render() {
      
    return (
      < div > < Header/> 
      <div className="row">
      
      <div className="col-md-3">
        
      </div>
      <div className="col-md-6">
        <ProductEdit data={this.state.datasource}/>
        </div>
        <div className="col-md-3">
        
        </div>
      
      </div>
      </div>
    )
  }
}
export default withAuthParam(EditProduct);