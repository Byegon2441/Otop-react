import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import Login from './User/FormAuth'
import Register from './User/Reigster'
import AuthService from './Util/AuthService'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import TestDrop from './Util/Dropdown'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      date: new Date(), 
      dropdownOpen: false
    };
    this.Auth = new AuthService();
    this.toggle = this.toggle.bind(this);
    
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // this.state = {date : new Date()};
    this.setState({ date: new Date() });
  }


  render() {
    const options= [
        {
          name: 'เพิ่มกลุ่มการค้า',
          Link: '/AddGroup',
        },
        {
          name: 'เพิ่มสมาชิกกลุ่ม',
          Link: '/AddPerson',
        },
        {
          name: 'เพิ่มสินค้า',
          Link: '/AddProduct',
        },
      ]
      const options1= [
        {
          name: 'เพิ่มชุมชน',
          Link: '/AddCommunity',
        },
        {
          name: 'เพิ่มจังหวัด',
          Link: '/AddProvince',
        },
      ]
    
    return <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 text-left">
            <h1 className="text-success">
             Test
            </h1>
          </div>
          <div className="col-md-6 text-right">
            <h5 className="text-muted mt-2">
              {this.state.date.toLocaleTimeString()}
            </h5>
            <ul className="list-inline">
              <li className="list-inline-item title">
                <Link className="text-success" to="">
                  หน้าหลัก
                </Link>
              </li>
              
              {
                this.Auth.isadmin()&&this.Auth.loggedIn() ? 
                <ui>
              <li className="list-inline-item title">|</li>
              <li className="list-inline-item title text-success"   >
              <TestDrop name="GM Command"  datasource={options1}/>
              </li>
              </ui>
              :
              <ui>

              </ui>
              }
              
              {this.Auth.loggedIn() ? 
              <ui>
              <li className="list-inline-item title">|</li>
              <li className="list-inline-item title">
            <TestDrop name="กลุ่ม"  datasource={options}/>
              </li>
              <li className="list-inline-item title">|</li>
              <li className="list-inline-item title">
                <Link className="text-success" to="/myproduct" >
                  จัดการสินค้า
                </Link>
              </li>
              <li className="list-inline-item title">|</li>
              <li className="list-inline-item title">
                <Link className="text-success" to="/" onClick={()=>this.Auth.logout()}>
                  ออกจากระบบ
                </Link>
              </li>
              </ui>
              : 
              <ui>
              <li className="list-inline-item title">|</li>
              <li className="list-inline-item title text-success"   >
              <Link className="text-success" to="/register">
                สมัครสมาชิก
                </Link>
              </li>
            <li className="list-inline-item title">|</li>
            <li className="list-inline-item title text-success"  >
            <Link className="text-success" to="#">
              <Login name={'เข้าสู่ระบบ'} history={"/"}/>
              </Link>
            </li>
            </ui>
              
              }
              
              
            </ul>
          </div>
        </div>
        <hr />
      </div>;
  }
}

export default Header;
