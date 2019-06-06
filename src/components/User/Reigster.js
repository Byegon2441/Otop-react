import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AuthService,{Url} from '../Util/AuthService'
import PickerDate from '../Util/PickerDate'
import Radiobtn  from '../Util/Radiobtn'
import axios from 'axios';

class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Username: '',
            Password: '',
            id_card:'',
            Firstname:'',
            Lastname:'',
            nameTitle:'',
            sex:'',
            date:'',

            datasource: '',
            datasource1: '',

            status:false,
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }
    async componentDidMount(){
        this.Auth.fetch(`${Url}/api/user/getnametitle`,{method:"GET"})
        .then(res=>{
            this.setState({datasource:res})
            this.Auth.fetch(`${Url}/api/user/getSex`,{method:"GET"})
            .then(res1=>{
                this.setState({datasource1:res1})
            })
        })
    }
    
    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.history.replace('/');
        }
    }

    async handleChange(e){
         console.log(e.target.value + '|' + e.target.name)
        await this.setState({
            [e.target.name]:e.target.value
        })
        await console.log(this.state);
        
    }

    handleFormSubmit(e){
        e.preventDefault();
       
            this.Auth.register(this.state.id_card,this.state.Username,this.state.Password,this.state.Firstname,this.state.Lastname,
                this.state.nameTitle,this.state.sex,this.state.date)
            .then(res=>{
                alert(res.data);
                if(res.result=='Success'){
                    this.setState({
                        Username: '',
                        Password: '',
                        id_card:'',
                        Firstname:'',
                        Lastname:'',
                        nameTitle:'',
                        sex:'',
                        date:'',
                    })
                }
            })
            .catch(err=>{
                alert(err.data);
               
            }) 
        }
        
    

    render() {
        return <div>
            <h1 className="text-center">สมัครสมาชิก</h1>
                          
                    <TextField autoFocus margin="dense" name="Username" label="Username" type="text" value={this.state.Username} onChange={this.handleChange} fullWidth />
                    <TextField margin="dense" name="Password" label="Password" type="Password" value={this.state.Password} onChange={this.handleChange} fullWidth />

                    <TextField  margin="dense" name="id_card" label="รหัสบัตรประชาชน"   value={this.state.id_card} onChange={this.handleChange} fullWidth />
                    <PickerDate handleChange={this.handleChange} nameShow="วันเกิด" name="date"/>
                    <Radiobtn data={this.state.datasource} onChange={this.handleChange} name="คำนำหน้าชื่อ" myState={this.state.nameTitle} nameVal="nameTitle"/>

                    <TextField  margin="dense" name="Firstname" label="ชื่อ"  value={this.state.Firstname} onChange={this.handleChange} fullWidth />
                    <TextField  margin="dense" name="Lastname" label="นามสกุล"  value={this.state.Lastname} onChange={this.handleChange} fullWidth />
                    
                    <Radiobtn data={this.state.datasource1} onChange={this.handleChange} name="เพศ" myState={this.state.sex} nameVal="sex"/>
                    <Button variant="contained" color="primary" fullWidth  onClick={this.handleFormSubmit}>
                        สมัครสมาชิก
                    </Button>
                                
          </div>;
    }
   
    
}
export default Register