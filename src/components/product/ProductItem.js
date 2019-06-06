import React, { Component } from "react";
import {Url} from "../Util/AuthService"
import { withRouter } from "react-router-dom";
import ConfirmUtil from "../Util/Confirm"
import DialogDetail from '../Util/DialogDetail'
class ProductItem extends Component {

    constructor(props) {
        super(props);
    }

    doSomething(productName) {
        console.log(productName);
    }

    render() {
         const { id, name, pic } = this.props.product;
       
        return (
            <div className="col-md-2 text-center">
                <img className="img-fluid imgimg-thumbnail"
                    style={{
                        }}
                 src={`${Url}/uploads/${pic}`} height={150} with={150}/>
                <h5 className="mt-2">{name}</h5>
                {/* <p className="title text-right" >{unitPrice} THB</p> */}
                
                {
                    this.props.onView &&
                    // <button className="btn btn-block btn-secondary title" onClick={() => (this.props.history.push('product/view/' + id))}> ดูรายละเอียด </button>
                    <DialogDetail keyid={id}/>

                }

                {this.props.onAddOrder &&
                    <button className="btn btn-block btn-secondary title" onClick={() => this.props.onAddOrder(this.props.product)}> ซื้อ </button>
                }

                {(this.props.onDelProduct || this.props.onEditProduct) &&
                    <button className="btn  btn-info col-5 title" onClick={() => this.props.onEditProduct(this.props.product)} > แก้ไข </button>
                }

                {(this.props.onDelProduct || this.props.onEditProduct) &&

                    <button className="btn  btn-danger col-5 float-right title" onClick={ () => {if(window.confirm('ต้องการจะลบสินค้าชิ้นนี้ใช่หรือไม่ ?')){this.props.onDelProduct(this.props.product)}  }} > ลบ </button>
                    // () => {if(window.confirm('Delete the item?')){this.removeToCollection(key, e)};}}
                    //onClick={() => }
                }
                <hr />

            </div>
        )
    }
}

export default withRouter(ProductItem);