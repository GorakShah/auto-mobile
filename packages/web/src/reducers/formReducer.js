import { UPDATE_FORM_VALUE } from '../actions/types';

const initialFormState = {
  login: {
    userName: '', password: '', error: null, success: null, loading: null,
  },
  multiSearch: {
    searchType: 'budget', buttonType: 'new', typeId: null, brandId: null, productId: null, error: null, success: null, loading: null,
  },
  addEnquiry: {
    name: '', email: '', phoneno: '', address: '', message: '', error: null, success: null, loading: null,
  },
  addBrand: {
    stypeId: null, brandName: null, image: null, sid: 1, loading: null, error: null, success: null,
  },
  sendEmail: {
    email: null, message: null, success: null, error: null, loading: null,
  },
  addProduct: {
    sid: 1,
    stypeId: null,
    sbId: null,
    userId: null,
    name: null,
    image: null,
    price: null,
    displacement: null,
    power: null,
    torque: null,
    markNew: null,
    markPopular: null,
    offer: null,
    fueltankCapacity: null,
    tyre: null,
    groundClearance: null,
    battery: null,
    availableColor: null,
    error: null,
    loading: null,
    success: null,
    bodyType: null,
    fuelType: null,
    mileage: null,
  },
  addDealer: {
    province: null, type: null, sId: 1, name: null, phoneNo: null, description: null, latitude: null, city: null, logitude: null, loading: null, error: null, success: null,
  },
  addServiceCenter: {
    province: null, type: null, sId: 1, name: null, phoneNo: null, description: null, latitude: null, city: null, logitude: null, loading: null, error: null, success: null,
  },
  sellVehicle: {
    stypeId: null, sbId: null, vehicleName: null, kmsDriven: null, ownerShip: null, city: null, expectedPrice: null, ownerName: null, ownerEmail: null, ownerPhoneNo: null, image1: null, image2: null, image3: null, image4: null, image5: null, loading: null, success: null, error: null,
  },
  dealerEnquiry: {
    name: '', email: '', phoneno: '', address: '', message: '', dealerId: null, error: null, success: null, loading: null,
  },
  serviceCenterEnquiry: {
    name: '', email: '', phoneno: '', address: '', message: '', error: null, success: null, loading: null,
  },
};

export default (state = initialFormState, action) => {
  switch (action.type) {
    case UPDATE_FORM_VALUE:
      return {
        ...state,
        [action.payload.schema]: {
          ...state[action.payload.schema], ...action.payload.data,
        },
      };
    default:
      return state;
  }
};
