import React from 'react';
import Collapsible from 'react-collapsible';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import { AiOutlineClose } from 'react-icons/ai';
import { GoCheck } from 'react-icons/go';
import productDetailsObj from './productDetailsObj';
import bikeDetailsObj from './bikeDetailsObj';

const arrSchema = {
  overview: 'CarVarientOverview',
  keySpecifications: 'CarVarientKeySpecification',
  'Engine and Transmission': 'CarVarientEngineTransmission',
  'Fuel & Performance': 'CarVarientFuelPerformance',
  'Suspension, Steering & Brakes': 'CarVarientSuspensionSteeringBreak',
  'Dimensions & Capacity': 'CarVarientDimentionCapacity',
  keyFeatures: 'CarVarientKeyFeatures',
  'Comfort & Convenience': 'CarVarientComfortConvenience',
  Interior: 'CarVarientInterior',
  Exterior: 'CarVarientExterior',
  Safety: 'CarVarientSafty',
  'Entertainment & Communication': 'CarVarientEntertainmentCommunication',
};

const arrBike = {
  overview: 'BikeVarientOverview',
  keySpecifications: 'BikeVarientKeySpecification',
  keyFeatures: 'BikeVarientKeyFeaturs',
  'Engine and Transmission': 'BikeVarientEngineTransmission',
  'Features and Safety': 'BikeVarientFeatursSafety',
  'Mileage and Performance': 'BikeVarientMileagePerformance',
  'Chassis and Suspension': 'BikeVarientChassisSuspension',
  'Dimensions and Capacity': 'BikeVarientDimensionCapacity',
  Electricals: 'BikeVarientElectricals',
  'Tyres and Brakes': 'BikeVarientTyresBrakes',
};

const triggerElement = (label) => {
  return (
    <div className="specification-collapse-element">
      <span>{label}</span>
      <Icon icon="chevron-down" iconSize={15} color="black" />
    </div>
  );
};

const containerElementFeaturesWithYesNo = (key, value) => {
  if (key === 'Connectivity') {
    return (
      <div className="container-element">
        <span style={{ color: '#9a9a9a', padding: 5 }}>{key}</span>
        <span style={{ padding: 5 }}>{value}</span>
      </div>
    );
  }
  return (
    <div className="container-element">
      <span style={{ color: '#9a9a9a' }}>{key}</span>
      {value ? <GoCheck color="green" size={20} /> : <AiOutlineClose color="red" size={20} /> }
    </div>
  );
};

const containerElementWithvalue = (key, value) => {
  return (
    <div className="container-element">
      <span style={{ color: '#9a9a9a', padding: 5 }}>{key}</span>
      <span style={{ padding: 5 }}>{value}</span>
    </div>
  );
};

const collapseContent = (obj, label, keyFeatures) => {
  const { labels } = obj;
  // console.log('obj in collapse container', obj, labels);
  return (
    <div className="specification-collapse-container">
      {(label === 'Key Features' || label === 'Interior' || label === 'Exterior' || label === 'Comfort & Convenience' || label === 'Safety' || label === 'Entertainment & Communication')
        ? Object.values(labels).map((l, idx) => containerElementFeaturesWithYesNo(l, keyFeatures[Object.keys(labels)[idx]]))
        : Object.values(labels).map((l, idx) => containerElementWithvalue(l, keyFeatures[Object.keys(labels)[idx]]))}
    </div>
  );
};

const collapseHandler = (lable, obj, keyFeatures, expandAll) => {
  return (
    <Collapsible onClose={() => console.log('Collapse close', lable)} onOpen={() => console.log('collapse open', lable)} open={expandAll} trigger={triggerElement(lable)} transitionTime={200}>
      {collapseContent(obj, lable, keyFeatures)}
    </Collapsible>
  );
};

class Specification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapseId: 0 };
  }

  collapseOpenHandler = (id) => {
    this.setState({ collapseId: id });
  }

  render() {
    console.log('project detials in Onj in specification', this.props);
    const { collapseId } = this.state;
    const { main, currentProductDetails, variantId, expandAll } = this.props;
    const { stypeId } = currentProductDetails;
    const allCarDetails = {};
    const allBikeDetails = {};

    if (parseInt(stypeId, 10) === 1) {
      Object.keys(arrSchema).forEach((k) => {
        allCarDetails[k] = main.initialData[arrSchema[k]].find((d) => d.varientId === variantId);
      });
    }

    if (parseInt(stypeId, 10) === 2) {
      Object.keys(arrBike).forEach((k) => {
        allBikeDetails[k] = main.initialData[arrBike[k]].find((d) => d.varientId === variantId);
      });
    }
    console.log('all Bike details', allBikeDetails);

    return (
      <div className="specification">
        { parseInt(stypeId, 10) === 1 && collapseHandler('Key Features', productDetailsObj.keyFeatures, allCarDetails.keyFeatures, expandAll)}
        { parseInt(stypeId, 10) === 1 && collapseHandler('Key Specification', productDetailsObj.keySpecifications, allCarDetails.keySpecifications, expandAll)}
        { parseInt(stypeId, 10) === 1 && Object.keys(productDetailsObj.specifications).map((k, idx) => collapseHandler(k, productDetailsObj.specifications[k], allCarDetails[k], expandAll))}
        { parseInt(stypeId, 10) === 2 && collapseHandler('Key Features', bikeDetailsObj.keyFeatures, allBikeDetails.keyFeatures, expandAll)}
        { parseInt(stypeId, 10) === 2 && collapseHandler('Key Specification', bikeDetailsObj.keySpecifications, allBikeDetails.keySpecifications, expandAll)}
        { parseInt(stypeId, 10) === 2 && Object.keys(bikeDetailsObj.specifications).map((k, idx) => collapseHandler(k, bikeDetailsObj.specifications[k], allBikeDetails[k], expandAll))}
      </div>
    );
  }
}
export default Specification;
Specification.propTypes = {
  main: PropTypes.objectOf(PropTypes.any).isRequired,
  currentProductDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  variantId: PropTypes.objectOf(PropTypes.any).isRequired,
};
