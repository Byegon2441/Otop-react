import React, { Component } from 'react'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Auth, { Url } from "../../components/Util/AuthService";
import withAuth from '../../components/Util/protect'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Selected from "../../components/Util/Selected"
import axios from 'axios'

import Upload from '../../components/Util/Upload'


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Type: "",
      Trader: "",
      Package: "",

      files: null,
      datasource: "",
      datasource1:"",
      id_product:"",

      name: "",
      detail:'',
      amount:'',
      SubType:'',

      idproduct:'',
      oldpic:''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeing = this.onChangeing.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.getSubType = this.getSubType.bind(this);
    this.Auth = new Auth();
  }

  async componentDidMount(){
    // let res = await axios.get(`${Url}/api/user/getProducerGroup`, { headers: {"x-access-token":`${ this.Auth.getToken}`}});
 
    this.Auth.fetch(`${Url}/api/user/getProducerGroup`, {
      method: 'GET'
    })
      .then(res => {
        if(res.result!="Fail"){

          this.setState({ datasource: res });
          this.Auth.fetch(`${Url}/api/user/getTypeProduct`, {
            method: 'GET'
          })
          .then(async resp=>{
            if(res.result!="Fail"){
              const {detail,id,id_producer,id_sub_product,id_type_product,id_unit_product,name,pic} = this.props.data
              console.log(this.props.data);
              
              await this.setState({
                datasource1: resp,
                detail:detail,
                idproduct:id,
                Trader:id_producer,
                name:name,
                Type:id_type_product,
                SubType:id_sub_product,
                amount:id_unit_product,
                oldpic:pic
              });
              
              this.getSubType()
              console.log(this.state);
              console.log(this.props.data);
              
              
            }else{
              console.log(res.data)
            }
          })
        }else{
          console.log(res.data)
        }
      })  
  }

  
  async handleChange(e) {
    console.log(e.target.value + '|' + e.target.name)
    await this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state);
    // if(e.target.name==="Type"){
    //   this.getSubType();
    // }
  }

  async onChangeing(e){
    await this.setState({
      Type: e.target.value,
      SubType:""
    }); 
    await this.getSubType();
  }


  handleSubmit = async e => {
    e.preventDefault(); // <-- missing this
    // console.log(this.state)
    // let formData = new FormData()
    // // for (let i = 0; i < this.state.files.length; i++) {
    // //   formData.append("file", this.state.files[i])
    // // }
    // formData.append("trader",this.state.Trader)
    // formData.append("name", this.state.name)
    // formData.append("detail", this.state.detail)
    // formData.append("id_sub", this.state.SubType)
    // formData.append("unit", this.state.amount)
    //     let token = await this.Auth.getToken()
    //     const response = await axios.post(`${Url}/api/user/edit`, formData,
    //       { headers: { "x-access-token": `${token}` } });
    //     if(response.data.result=="Success") {
    //       alert("เพิ่มข้อมูลสำเร็จ")
    //   }else{
    //     alert('Error')
    //     console.log(response);
        
    //   }
    // // // })
    this.Auth.fetch(`${Url}/api/user/editProduct`,{
      method:"POST",
      body:JSON.stringify({
        trader:this.state.Trader,
        name: this.state.name,
        detail: this.state.detail,
        id_sub: this.state.SubType,
        unit: this.state.amount,
        idproduct:this.state.idproduct
      })
    }).then(res=>{
      alert(res.data)
    })
  }

  handleFileChange = (data) => {
    this.setState({ files: data });
  };

  getSubType(){
    
      this.Auth.fetch(`${Url}/api/user/getSubTypeProduct/${this.state.Type}`,{method:"GET"})
      .then(async res=>{
        if (res.result != "Fail") {
          await this.setState({ datasource2: res });
        } else {
          console.log(res.data)
        }
      })
  }

  render() {
    
    return <div>
                <div>
                  {/* <Selected datasource={this.state.datasource} size="FullWidth" fnc={this.handleChange} nameShow="กลุ่มการค้า" name="Trader" state={this.state.Trader}  />  */}
                  {/* <TextField type="text" margin="dense" name="Trader" label="กลุ่มการค้า" value={this.state.Trader} onChange={this.handleChange} fullWidth InputProps={{
          readOnly: true,
        }} /> */}

                  <TextField type="text" margin="dense" name="name" label="ชื่อสินค้า" value={this.state.name} onChange={this.handleChange} fullWidth />
                  <TextField type="text" margin="dense" name="detail" label="รายละเอียด" value={this.state.detail} onChange={this.handleChange} fullWidth />

                  <Selected datasource={this.state.datasource1} size="FullWidth" fnc={this.onChangeing} nameShow="ประเภทสินค้า" name="Type" state={this.state.Type} /> 
                  {
                    this.state.datasource2 ?
                    <Selected
                      datasource={this.state.datasource2}
                      size="FullWidth"
                      fnc={this.handleChange}
                      nameShow="ประเภทสินค้าย่อย"
                      name="SubType"
                      state={this.state.SubType}
                    />:
                    <div></div>
                  }
                  <TextField type="number"  margin="dense" name="amount" label="จำนวนสินค้า" value={this.state.amount} onChange={this.handleChange} fullWidth />
                </div>
                <br />
                {/* <text className="font-weight-light">เพิ่มรูปภาพสินค้าเพียง 1 รูป</text>
                <Upload handleFile={this.handleFileChange} name="files" maximum="1" /> */}
                  <Button onClick={this.handleSubmit} variant="contained" className="col text-center">
                    แก้ไขสินค้า
                  </Button>
      </div>;
  }
}

export default Product
