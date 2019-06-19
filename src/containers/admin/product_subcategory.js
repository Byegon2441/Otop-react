import React, { Component } from "react";
import Header from "../../components/Header";
import Auth,{Url} from '../../components/Util/AuthService'
import withAdmin from '../../components/Util/protectadmin'
import SelectProv from '../../components/Util/SelectProvince'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Selected from '../../components/Util/Selected'
class Product_subcategory extends Component {

	constructor(props){
		super(props);
		this.state = {
            
            name_sub:'',
            detail:'',
            id_type_product:false,
            data:'',
		}
        this.Auth = new Auth();
        this.unhandleChange = this.unhandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    // componentDidMount(){
    //     this.Auth.fetch(`${Url}/api/user/getGeography`, { method: "GET" })
    //     .then(res=>{
            
    //         this.setState({data:res})
            
    //     })
    // }

    // componentWillMount(){
    //     if(!this.Auth.loggedIn()){
    //         this.props.history.replace('/');
    //     }
    // }

    async unhandleChange(name,value){
        
        await this.setState({
            [name]:value
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleFormSubmit(e){

        console.log(this.state)

        let regEng = /^[a-zA-Z]{3,30}$/
        let regThai = /^[ก-๙]{3,30}$/
        let {name_sub,detail,id_type_product} = this.state

        // if(id_type_product&&regThai.test(name_sub)&&regEng.test(detail)){
            
        //     console.log('pass');
            
            
        // // this.Auth.fetch(`${Url}/api/admin/AddDistricts`,{
        // //     method:"POST",
        // //     body:JSON.stringify({
        // //         
        // //         name_sub:this.state.name_sub,
        // //         detail:this.state.detail,
        // //         id_type_product:this.state.id_type_product,
        // //     })
        // // })
        // // .then(res=>{
            
        // //     if(res.result ==="Success"){
                
        // //         alert(`${res.data} ประเภทสินค้าย่อย ${res.dataAdded}`)
        // //     }else{
        // //         console.log(res)
        // //     }
        // // })

        // }else{
        //     console.log(`Failed`);
            
        // }
        
        

    }

  
	render() {
        return <div>
          <Header />
          <div className="row">
			  <div className="col-md-3">
				
			  </div>
              <div className="col-md-6">
              <h1 className="text-center">เพิ่มประเภทสินค้าย่อย</h1>
              
              <Selected datasource={this.state.data} size="FullWidth" fnc={this.handleChange} nameShow="ประเภทสินค้า" name="id_type_product" state={this.state.id_type_product} /> 
                   
                
                <TextField  margin="dense" name="name_sub" label="ชื่อหมวดสินค้าย่อย" type="text" value={this.state.name_sub} onChange={this.handleChange} fullWidth />
                <TextField  margin="dense" name="detail" label="รายละเอียด" type="text" value={this.state.detail} onChange={this.handleChange} fullWidth />
                
                <Button variant="contained" color="primary" fullWidth  onClick={this.handleFormSubmit}>
                    เพิ่มข้อมูล
                </Button>
                
              </div>
              <div className="col-md-3">

              </div>
          </div>
        </div>
  
		
		
	}
}


//export default withAdmin(Product_subcategory);
export default (Product_subcategory);