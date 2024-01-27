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

export interface IJobHistory {
  job:{
    _id:string;
    status: string;
    createdAt: string;
    address:string;
    inspection:{
    confirmPayment: boolean;
    status: boolean;
    }
    [key: string]: unknown;},
  
    contractor:{
    firstName: string;
    lastName: string;
    [key: string]: unknown;
  }
}

export interface ICustomerData {
  customer:{_id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: unknown;},
  jobHistory:IJobHistory[]
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

export interface IContractorsDetails {
  availability: string;
  contractorProfile: {
    _id: string;
    email: string;
    firstName: string;
    dateOfBirth: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    location: string;
    profileImage: string;
    documentVerification: boolean;
    [key: string]: unknown;
  };
  document: {
    skill: string;
    [key: string]: unknown;
  };
}

export interface IContractors {
  artisans: IContractorsDetails[];
}

export interface ISkill {
  name: string;
  _id: string;
  [key: string]: unknown;
}

export interface ISkills {
  skills: ISkill[];
}
