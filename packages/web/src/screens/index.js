import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import ProductDetails from './productDetails';
import SearchProducts from './searchProducts';
import BrandDetails from './brand-details';
import SellVehicle from './sell-vehicle';
import UsedVehicallDetails from './usedVehicleDetails';
import Compare from './compare';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/details/:proId" component={ProductDetails} />
          <Route path="/search/:buttonType/:searchType/:typeId/:tempId" component={SearchProducts} />
          <Route path="/brand/:stypeId/:sbId" component={BrandDetails} />
          <Route path="/sell-vehicle" component={SellVehicle} />
          <Route path="/used-vehicle/details/:usedVehicleId" component={UsedVehicallDetails} />
          <Route exact path="/compare/:typeId" component={Compare} />
          <Route exact path="/compare/:typeId/:pId1/:pId2" component={Compare} />
          <Route exact path="/compare/:typeId/:pId1/:pId2/pId3" component={Compare} />
          <Route exact path="/compare/:typeId/:pId1/:pId2/:pId3/:pId4" component={Compare} />
        </div>
      </Router>
    );
  }
}
export default index;
