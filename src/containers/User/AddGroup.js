import React, { Component } from 'react'
import AddedGroup from '../../components/User/Group/Group'
import Header from "../../components/Header";
export class AddGroup extends Component {
    constructor(props){
        super(props);
        
    }



  render() {
    return <div>
    <Header />
    <div className="row">
        <div className="col-md-3">
          
        </div>
        <div className="col-md-6">
         <AddedGroup/>
        </div>
        <div className="col-md-3">

        </div>
    </div>
  </div>
  }
}

export default AddGroup
