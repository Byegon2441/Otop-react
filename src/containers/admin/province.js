import React, { Component } from "react";
import Header from "../../components/Header";
import Auth,{Url} from '../../components/Util/AuthService'
import withAdmin from '../../components/Util/protectadmin'
import SelectProv from '../../components/Util/SelectProvince'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Selected from '../../components/Util/Selected'
class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
            province_code:'',
            province_name:'',
            province_name_eng:'',
            geo_id:false,
            dataGeo:'',
		}
        this.Auth = new Auth();
        this.unhandleChange = this.unhandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    componentDidMount(){
        this.Auth.fetch(`${Url}/api/user/getGeography`, { method: "GET" })
        .then(res=>{
            
            this.setState({dataGeo:res})
            
        })
    }

    componentWillMount(){
        if(!this.Auth.loggedIn()){
            this.props.history.replace('/');
        }
    }

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
        let {province_code,province_name,province_name_eng,geo_id} = this.state

        if(province_code&&geo_id&&regThai.test(province_name)&&regEng.test(province_name_eng)){
            
            console.log('pass');
            
            
        // this.Auth.fetch(`${Url}/api/admin/AddProvince`,{
        //     method:"POST",
        //     body:JSON.stringify({
        //         province_code:province_code,
        //         province_name:this.state.province_name,
        //         province_name_eng:this.state.province_name_eng,
        //         geo_id:this.state.geo_id,
        //     })
        // })
        // .then(res=>{
            
        //     if(res.result ==="Success"){
                
        //         alert(`${res.data} ชื่อจังหวัด ${res.dataAdded}`)
        //     }else{
        //         console.log(res)
        //     }
        // })

        }else{
            console.log(`Failed`);
            
        }
        
        

    }

  
	render() {
        return <div>
          <Header />
          <div className="row">
			  <div className="col-md-3">
				
			  </div>
              <div className="col-md-6">
              <h1 className="text-center">-เพิ่มจังหวัด-</h1>
              
              <Selected datasource={this.state.dataGeo} size="FullWidth" fnc={this.handleChange} nameShow="ภูมิภาค" name="geo_id" state={this.state.geo_id} /> 
                   
                <TextField  margin="dense" name="province_code" label="รหัสจังหวัด" type="Number" value={this.state.province_code} onChange={this.handleChange} fullWidth />
                <TextField  margin="dense" name="province_name" label="ชื่อจังหวัดภาษาไทย" type="text" value={this.state.province_name} onChange={this.handleChange} fullWidth />
                <TextField  margin="dense" name="province_name_eng" label="ชื่อจังหวัดภาษาอังกฤษ" type="text" value={this.state.province_name_eng} onChange={this.handleChange} fullWidth />
                
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


export default withAdmin(Home);
