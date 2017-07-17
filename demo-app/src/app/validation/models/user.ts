import { Province } from './province';

export abstract class User {
  activitySector: string;
  address: string;
  address2: string;
  city: string;
  firstName: string;
  gender: string;
  jobDescription: string;
  jobPrivate: boolean;
  jobTitle: string;
  jobType: string;
  lastName: string;
  phoneNumbers: Array<string>;
  postalCode: string;
  province: Province;
}
