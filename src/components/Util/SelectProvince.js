import React, { Component } from 'react'
import Auth,{Url} from '../Util/AuthService'
import SelectJS from '../Util/Selected'

export default class SelectProvince extends Component {
  
    // กลับมาแก้ให้ Dynamic ด้วย
    constructor(props){
        super(props);
        this.state = {
            dataProvince:'',
            dataSubDistancts:'',
            dataDIstancts:'',
            status:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.Auth = new Auth();
    }
    componentDidMount(){
        this.Auth.fetch(`${Url}/api/user/getProvice`, { method: "GET" })
        .then(res=>{
            
            this.setState({dataProvince:res})
        })
    }

    async handleChange(e) {
        console.log(e.target.value + '|' + e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name == 'H_province') {
            await this.setState({ status: false, H_Aumper: '', H_tumbon: "" })
            this.fetchDis();
        } else if (e.target.name == "H_Aumper") {
            await this.setState({ status: false, H_tumbon: "" });
            this.fetchDis1();
        }
        this.props.handle(e.target.name, e.target.value)
    }


    fetchDis() {
        if (this.state.H_province != "" && this.state.status == false) {
            let url = `${Url}/api/user/getDistricts/${this.state.H_province}`;
            this.Auth.fetch(url, { method: "GET" })
                .then(res => {
                    this.setState({ datasource1: res, status: true })
                })
        }
    }
    fetchDis1() {
        if (this.state.H_Aumper != "" && this.state.status == false) {
            let url = `${Url}/api/user/getSubDistricts/${this.state.H_Aumper}`;
            this.Auth.fetch(url, { method: "GET" }).then(res => {
                this.setState({ datasource2: res, status: true });
            });
        }
    }

    SpendSource() {
        if (this.state.datasource1) {
            return <SelectJS nameShow={"อำเภอ"} datasource={this.state.datasource1}
                name="H_Aumper" state={this.state.H_Aumper} fnc={this.handleChange} size={this.props.size} />
        }

    }
    SpendSource1() {
        if (this.state.datasource2) {
            return <SelectJS nameShow={"ตำบล"}datasource={this.state.datasource2} name="H_tumbon" state={this.state.H_tumbon} fnc={this.handleChange} size={this.props.size}  />;
        }
    }



    render() {
    return <div>
        {
            
        }
        {this.state.dataProvince ? <SelectJS nameShow={"จังหวัด"} 
        datasource={this.state.dataProvince} name="H_province" state={this.state.H_province} 
        fnc={this.handleChange} size={this.props.size} /> : ""}
        {this.SpendSource()}
        {this.SpendSource1()}
      </div>;
  }
}
