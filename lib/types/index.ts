export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IVerifyEmailData {
  email: string;
  otp: string;
}

export interface IForgotPasswordData {
  email: string;
}

export interface IResetPasswordData {
  email: string;
  password: string;
  otp: string;
}

export interface ICustomerData {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: unknown;
}

export interface ISubAdmin {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  superAdmin: boolean;
  validation: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: unknown;
}

export interface ICustomers {
  customers: ICustomerData[];
}

export interface ISubAdmins {
  admins: ISubAdmin[];
}

export interface IContractorPostData {
  page: number;
  limit: number;
}
