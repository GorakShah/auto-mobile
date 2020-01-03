import React from 'react';
import { Button } from '@blueprintjs/core';
import { ENDPOINT } from '../../../../../config';
import productDetailsObj from '../productDetailsObj';
import KeySpecification from './KeySpecification';
import OverView from './Overview';

export default (props) => {
  const { main, showEnquiryForm } = props;
  const { currentCarDetail } = main;
  return (
    <div className="keyspecification-overview">
      <div className="detail-image-compare">
        <div className="detail-image">
          <img src={`${ENDPOINT}/images/${currentCarDetail.image}`} alt={currentCarDetail.name} />
        </div>
        <KeySpecification obj={productDetailsObj.keySpecifications} showEnquiryForm={showEnquiryForm} />
      </div>
      <div style={{ height: 1, width: '100%', background: '#f1f1f1' }} />
      <OverView {...props} />
      <div style={{ height: 1, width: '100%', background: '#f1f1f1' }} />
    </div>
  );
};
