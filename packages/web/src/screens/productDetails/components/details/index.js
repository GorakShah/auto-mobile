import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import Specification from './Specification';
import Overview from './overview';
import Review from './Review';
import Offers from './offers';
import Compare from './Compare';
import Varient from './variants';
import SocialMediaShare from '../../../common/socialMediaShare';
import EnquiryForm from '../EnquiryForm';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enquiryShow: false, tabId: 'Specification', currentProductDetails: null, variantId: null };
  }

  async componentWillMount() {
    const { match, main } = this.props;
    const { proId } = match.params;
    const currentProductDetails = main.initialData.vehicleModel.find((vm) => `${vm.name.replace(/\s/g, '')}-${vm.id}`.toLocaleLowerCase() === proId);
    console.log('Current Product Details', currentProductDetails);
    this.setState({ currentProductDetails, variantId: currentProductDetails.varients[0].id });
  }

  closeEnquiry = () => {
    const { enquiryShow } = this.state;
    this.setState({ enquiryShow: !enquiryShow });
  }

  handleTabChange = (id) => {
    this.setState({ tabId: id });
  }

  changeVariant = (vid) => {
    this.setState({ variantId: vid });
  }

  render() {
    const { tabId, currentProductDetails, enquiryShow, variantId } = this.state;
    console.log('state value in show details page', this.props, variantId);
    return (
      currentProductDetails ? (
        <div className="product-detail">
          <SocialMediaShare url="http://159.89.150.216:3000/" />
          <Overview {...this.props} showEnquiryForm={this.closeEnquiry} currentProductDetails={currentProductDetails} variantId={variantId} />
          <EnquiryForm isOpen={enquiryShow} onClose={this.closeEnquiry} props={{ ...this.props }} currentProductDetails={currentProductDetails} />
          <div className="product-detail-menu">
            <Tabs
              className="product-menu-tabs"
              id="TabsExample"
              onChange={this.handleTabChange}
              selectedTabId={tabId}
            >
              <Tab
                panelClassName="panel-container"
                style={{ fontSize: 15, fontWeight: 'bold', color: 'white', textAlign: 'end' }}
                id="Specification"
                title="Specification"
                panel={<Specification {...this.props} currentProductDetails={currentProductDetails} variantId={variantId} />}
              />
              <Tab
                panelClassName="panel-container"
                style={{ fontSize: 15, fontWeight: 'bold', color: 'white', textAlign: 'end' }}
                id="Compare"
                title="Compare"
                panel={<Compare {...this.props} currentProductDetails={currentProductDetails} variantId={variantId} />}
              />
              <Tab
                panelClassName="panel-container"
                style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}
                id="Review"
                title="Review"
                panel={<Review {...this.props} currentProductDetails={currentProductDetails} variantId={variantId} />}
              />
              <Tab
                panelClassName="panel-container"
                style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}
                id="Offers"
                title="Offers"
                panel={<Offers {...this.props} currentProductDetails={currentProductDetails} variantId={variantId} />}
              />
              <Tab
                panelClassName="panel-container"
                style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}
                id="Varient"
                title="Variant"
                panel={<Varient {...this.props} changeVariant={this.changeVariant} currentProductDetails={currentProductDetails} variantId={variantId} />}
              />
            </Tabs>
          </div>
        </div>
      ) : null
    );
  }
}
export default ProductDetails;
ProductDetails.propTypes = {
  fetchProductDetail: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  main: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchInitialData: PropTypes.func.isRequired,
};
