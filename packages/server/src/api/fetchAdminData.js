import db from '../db';
import { cities } from './budgetRangeProvider';

export default async (record) => {
  console.log('fetch admin data api called');

  const res = await db.execute(async ({findOne, find}) => {
    const vehicleType = await find('ServiceType', { sid: 1 });
    const vehicleBrand = await find('ServiceTypeBrand', { sid: 1 });
    const vehicleBrandProduct = await find('ServiceTypeBrandProductDetails', { sid: 1 });
    const userEnquiry = await find('UserEnquiry');
    const dealerList = await find('Dealer');
    const serviceCenterList = await find('ServiceCenter');
    return { vehicleBrand, vehicleType, vehicleBrandProduct, userEnquiry, cities, dealerList, serviceCenterList };
  });
  return res;
};
