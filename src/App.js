import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './containers/Home'
import Register from './containers/User/Regis'
import NotFound from "./containers/error/NotFound";
import Group from "./containers/User/AddGroup"
import Product from "./containers/User/Product"
import MyProduct from "./containers/User/MyProduct"
import EditProduct from "./containers/User/EditProduct"
import Community from './containers/admin/community';
import ProductView from './containers/User/ProductView'
import Province from './containers/admin/province';
class App extends Component {

  renderRouter() {
		return <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/AddGroup" component={Group}/>
        <Route exact path="/AddProduct" component={Product}/>
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/MyProduct" component={MyProduct}/>
        <Route exact path="/MyProduct/edit/:id" component={EditProduct}/>
        <Route exact path="/product/view/:id" component={ProductView}/>

        <Route exact path="/AddCommunity" component={Community}/>
        
        <Route exact path="/AddProvince" component={Province}/>
        <Route component={NotFound} />
      </Switch>;
	}
  render() {
    return <BrowserRouter>{this.renderRouter()}</BrowserRouter>;
  }
}

export default App;
