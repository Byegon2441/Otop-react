import React, { Component } from "react";
import Header from "../../components/Header";
import Auth,{Url} from '../../components/Util/AuthService'
import withAdmin from '../../components/Util/protectadmin'
import SelectProv from '../../components/Util/SelectProvince'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Selected from '../../components/Util/Selected'
class Districts extends Component {

	constructor(props){
		super(props);
		this.state = {
            district_code:'',
            district_name:'',
            district_name_eng:'',
            amphur_id:false,
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
        let {district_code,district_name,district_name_eng,amphur_id} = this.state

        if(district_code&&amphur_id&&regThai.test(district_name)&&regEng.test(district_name_eng)){
            
            console.log('pass');
            
            
        // this.Auth.fetch(`${Url}/api/admin/AddDistricts`,{
        //     method:"POST",
        //     body:JSON.stringify({
        //         district_code:this.state.district_code,
        //         district_name:this.state.district_name,
        //         district_name_eng:this.state.district_name_eng,
        //         amphur_id:this.state.amphur_id,
        //     })
        // })
        // .then(res=>{
            
        //     if(res.result ==="Success"){
                
        //         alert(`${res.data} ชื่อตำบล ${res.dataAdded}`)
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
              <h1 className="text-center">เพิ่มตำบล</h1>
              
              <Selected datasource={this.state.data} size="FullWidth" fnc={this.handleChange} nameShow="อำเภอ" name="amphur_id" state={this.state.amphur_id} /> 
                   
                <TextField  margin="dense" name="district_code" label="รหัสตำบล" type="Number" value={this.state.district_code} onChange={this.handleChange} fullWidth />
                <TextField  margin="dense" name="district_name" label="ชื่อตำบลภาษาไทย" type="text" value={this.state.district_name} onChange={this.handleChange} fullWidth />
                <TextField  margin="dense" name="district_name_eng" label="ชื่อตำบลภาษาอังกฤษ" type="text" value={this.state.district_name_eng} onChange={this.handleChange} fullWidth />
                
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


//export default withAdmin(Districts);
export default (Districts);