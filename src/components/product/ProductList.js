import React, { Component } from "react";
import ProductItem from "./ProductItem";

class ProductList extends Component {


    showProducts() {
        return this.props.products && this.props.products.map(product => (
            <ProductItem key={product.id} product={product} onView={this.props.onView}  onDelProduct={this.props.onDelProduct} onEditProduct={this.props.onEditProduct}/>
        )) //ถ้า return แบบ array นี่แล้วไปแสดงผลบนหน้าจอ เรียกว่า list โดยต้องมี key ที่ไม่ว้ำกัน

    }

    render() {
        return (
            <div className="row">
                {this.showProducts()}

            </div>
        );
    }
}

export default ProductList;