export interface User {
  id: string;
  fullName: string;
  token: string;
  name?: string;
  email?: string;
  gender?: string;
  dob?: {
    day: string;
    month: string;
    year: string;
  };
  companyAddress?: string;
  homeAddress?: string;
}
