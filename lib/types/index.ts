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
  job: {
    _id: string;
    status: string;
    createdAt: string;
    address: string;
    inspection: {
      confirmPayment: boolean;
      status: boolean;
    };
    [key: string]: unknown;
  };

  contractor: {
    firstName: string;
    lastName: string;
    [key: string]: unknown;
  };
}

export interface ICustomer {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  [key: string]: unknown;
}

export interface ICustomerData {
  customer: ICustomer;
  jobHistory: IJobHistory[];
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
    phoneNumber: string;
    businessName: string;
    tradeTicket: string;
    postalCode: string;
    city: string;
    website: string;
    yearExpirence: string;
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

export interface IQuestion {
  question: string;
  options: string[];
  answer: string[];
  _id?: string;
}

export interface IEditQuestion {
  question: string;
  options: string[];
  answer: string[];
  questionId?: string;
}

export interface IGetJobsData {
  page: number;
  limit: number;
}

export interface IJob {
  inspection: {
    status: boolean;
    confirmPayment: boolean;
  };
  _id: string;
  address: string;
  status: string;
  createdAt: string;
  [key: string]: unknown;
}
export interface IJobs {
  job: IJob;
  contractor: {
    _id: string;
    firstName: string;
    lastName: string;
    [key: string]: unknown;
  };
  customer: {
    fullName: string;
    phoneNumber: string;
    [key: string]: unknown;
  };
}

export interface IJobsList {
  jobs: IJobs[];
}

export interface IAdminData {
  firstName: string;
  lastName: string;
  image: string;
  isSuperAdmin: boolean;
}

export interface IChangeContractorStatusData {
  contractorId: string;
  status: string;
}

export interface IProfileData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImg: null | string | File;
}
