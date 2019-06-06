import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import Auth,{Url} from "../../Util/AuthService";
import PickerDate from '../../Util/PickerDate'
import Selected from '../../Util/Selected'
import Button from "@material-ui/core/Button";
import SelectProv from '../../Util/SelectProvince'
import withAuth from '../../Util/protect'

class Group extends Component {

  constructor(props){
    super(props);
    this.state = {
      brand_name:'',
      date:'',
      date_recive:'',
      id_type:'',
      id_commu:'',

      id_regishome:'',
      number_home:'',
      Moo_Home:'',
      H_tumbon:'',

      datasource:'',
      datasource1:'',
    }
    this.unhandleChange = this.unhandleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.Auth = new Auth()
  }
  componentDidMount(){
    this.Auth.fetch(`${Url}/api/user/getCommunity`,{method:"GET"})
    .then(res =>{
      this.setState({datasource:res})
      this.Auth.fetch(`${Url}/api/user/getTypeproducer`,{method:"GET"})
      .then(res=>{
        this.setState({datasource1:res})
      })
    })
  }

//   componentWillMount(){
//     if(!this.Auth.loggedIn()){
//         this.props.history.replace('/');
//     }
// }

  async unhandleChange(namez, value) {
    console.log(namez + '+|+' + value)
    let st = namez

    this.setState({
      [st]: value
    })

    
  }
  async handleChange(e) {
    console.log(e.target.value + '|' + e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
  }

  handleSubmit(){
    let {brand_name,date,date_recive,id_type,id_commu,number_home,Moo_Home,H_tumbon,id_regishome} = this.state
    this.Auth.fetch(`${Url}/api/user/registerProducer`,{
      method:"POST",
      body:JSON.stringify({
        brand_name:brand_name,
        date:date,
        date_recive:date_recive,
        id_type:id_type,
        id_commu:id_commu,
        number_home:number_home,
        Moo_Home:Moo_Home,
        H_tumbon:H_tumbon,
        id_regishome:id_regishome
      })
    }).then(res=>{
      alert(res.data)
    })
    
  }

  render() {
    return (
      <div>
        <TextField margin="dense" name="brand_name" label="ชื่อผู้ผลิต" value={this.state.brand_name} onChange={this.handleChange} fullWidth />
          <div className="row text-center">
            <div className="col-md-6">
            <PickerDate handleChange={this.handleChange} nameShow="วันที่ยื่นจดทะเบียน" name="date"/>
            <Selected datasource={this.state.datasource} size="FullWidth" fnc={this.handleChange} nameShow="ชุมชน" name="id_commu" state={this.state.id_commu} /> 
            </div>
            <div className="col-md-6">
            <PickerDate handleChange={this.handleChange} nameShow="วันที่ได้รับการขึ้นทะเบียน" name="date_recive"/>
            <Selected datasource={this.state.datasource1} size="FullWidth" fnc={this.handleChange} nameShow="ประเภทผู้ผลิต" name="id_type" state={this.state.id_type} /> 
            </div>
          </div>
          <TextField margin="dense" name="id_regishome" label="เลขทะเบียนบ้าน"  value={this.state.id_regishome} onChange={this.handleChange} fullWidth />
          <TextField margin="dense" name="number_home" label="บ้านเลขที่" value={this.state.number_home} onChange={this.handleChange} fullWidth />
          <TextField margin="dense" name="Moo_Home" label="หมู่ที่" value={this.state.Moo_Home} onChange={this.handleChange} fullWidth />

          <SelectProv size="FullWidth" handle={this.unhandleChange} />

        <Button onClick={this.handleSubmit} variant="contained" className="col text-center mt-2" >
          เพิ่มกลุ่มการค้า
        </Button>
      </div>
    )
  }
}
export default withAuth(Group)
