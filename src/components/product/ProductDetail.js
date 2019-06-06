import React, { Component } from "react";
import {Url} from "../Util/AuthService"
import { withRouter } from "react-router-dom";

class ProductDetail extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        //  const { id, name, pic } = this.props.product;
       
        return (
            <div className="text-center">
                รายละเอียด
                <hr />

            </div>
        )
    }
}

export default withRouter(ProductDetail);