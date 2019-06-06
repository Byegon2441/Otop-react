import React, { Component } from 'react'
import ProductAdd from '../../components/product/ProductAdd'
import Header from '../../components/Header'
class Product extends Component {
  render() {
    return (
      < div > < Header/> 
      <div className="row">
      
      <div className="col-md-3">
        
      </div>
      <div className="col-md-6">
      <ProductAdd/>
        </div>
        <div className="col-md-3">
        
        </div>
      
      </div>
      </div>
    )
  }
}
export default Product;