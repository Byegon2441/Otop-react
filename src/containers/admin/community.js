import React, { Component } from "react";
import Header from "../../components/Header";
import Auth,{Url} from '../../components/Util/AuthService'
import withAdmin from '../../components/Util/protectadmin'
import SelectProv from '../../components/Util/SelectProvince'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
            H_Aumper:false,
            H_province:false,
            H_tumbon:false,
            name_community:''
		}
        this.Auth = new Auth();
        this.unhandleChange = this.unhandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

        let reg = /^[a-zA-Z0-9ก-๙]{5,30}$/
        let {H_province,H_Aumper,H_tumbon,name_community} = this.state

        if(H_province&&H_Aumper&&H_tumbon&&reg.test(name_community)){
            
            this.Auth.fetch(`${Url}/api/admin/AddCommunity`,{
                method:"POST",
                body:JSON.stringify({
                    H_tumbon:H_tumbon,
                    name_community:name_community
                })
            })
            .then(res=>{
                if(res.result ==="Success"){
                    this.setState({name_community:''})
                    alert(`${res.data} ชื่อชุมชน ${res.dataAdded}`)
                }else{
                    alert(res.data)
                }
            })
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
              <h1 className="text-center">เพิ่มชุมชน</h1>
                <SelectProv size="FullWidth" handle={this.unhandleChange} />
                <TextField  margin="dense" name="name_community" label="ชื่อชุมชน" type="text" value={this.state.name_community} onChange={this.handleChange} fullWidth />
                
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
