import React, { Component } from "react";
import Header from "../../components/Header";
import Auth,{Url} from '../../components/Util/AuthService'
import withAdmin from '../../components/Util/protectadmin'
import SelectProv from '../../components/Util/SelectProvince'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Selected from '../../components/Util/Selected'
class Amphures extends Component {

	constructor(props){
		super(props);
		this.state = {
            amphur_code:'',
            amphur_name:'',
            amphur_name_eng:'',
            province_id:false,
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
        let {amphur_code,amphur_name,amphur_name_eng,province_id} = this.state

        if(amphur_code&&province_id&&regThai.test(amphur_name)&&regEng.test(amphur_name_eng)){
            
            console.log('pass');
            
            
        // this.Auth.fetch(`${Url}/api/admin/AddProvince`,{
        //     method:"POST",
        //     body:JSON.stringify({
        //         amphur_code:this.state.amphur_code,
        //         amphur_name:this.state.amphur_name,
        //         amphur_name_eng:this.state.amphur_name_eng,
        //         province_id:this.state.province_id,
        //     })
        // })
        // .then(res=>{
            
        //     if(res.result ==="Success"){
                
        //         alert(`${res.data} ชื่ออำเภอ ${res.dataAdded}`)
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
              <h1 className="text-center">เพิ่มอำเภอ</h1>
              
              <Selected datasource={this.state.data} size="FullWidth" fnc={this.handleChange} nameShow="จังหวัด" name="province_id" state={this.state.province_id} /> 
                   
                <TextField  margin="dense" name="amphur_code" label="รหัสอำเภอ" type="Number" value={this.state.amphur_code} onChange={this.handleChange} fullWidth />
                <TextField  margin="dense" name="amphur_name" label="ชื่อจอำเภอภาษาไทย" type="text" value={this.state.amphur_name} onChange={this.handleChange} fullWidth />
                <TextField  margin="dense" name="amphur_name_eng" label="ชื่อจอำเภอภาษาอังกฤษ" type="text" value={this.state.amphur_name_eng} onChange={this.handleChange} fullWidth />
                
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


//export default withAdmin(Amphures);
export default (Amphures);