import { Province } from './province';

export abstract class User {
  address: string;
  address2: string;
  city: string;
  firstName: string;
  gender: string;
  lastName: string;
  postalCode: string;
  province: Province;
}
