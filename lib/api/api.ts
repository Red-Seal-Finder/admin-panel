import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import {
  IContractorPostData,
  ICustomers,
  IForgotPasswordData,
  ILoginData,
  IResetPasswordData,
  ISignupData,
  IVerifyEmailData,
} from "../types";
import { toast } from "react-toastify";

// Create an instance of axios with baseURL
const api: AxiosInstance = axios.create({
  baseURL: "https://stingray-app-3vrw8.ondigitalocean.app/admin",
});

// Interceptor to handle request errors
api.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., adding authentication tokens)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Interceptor to handle response errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here before it's returned
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export const login = async (data: ILoginData) => {
  try {
    const response: AxiosResponse = await api.post("/admin_signin", data);
    // Handle successful response
    localStorage.setItem("token", response?.data.Token);
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return message;
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return "error";
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return "network_error";
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      return "error";
    }
  }
};

export const signup = async (data: ISignupData) => {
  try {
    const response: AxiosResponse = await api.post("/admin_signup", data);
    // Handle successful response
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return responseData.admin;
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return null;
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return null;
      }
    } else {
      // Handle other types of errors
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return null;
    }
  }
};

export const verifyEmail = async (data: IVerifyEmailData) => {
  try {
    const response: AxiosResponse = await api.post(
      "/admin_email_verification",
      data
    );
    // Handle successful response
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return responseData;
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return null;
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return null;
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return null;
    }
  }
};

export const forgotPassword = async (data: IForgotPasswordData) => {
  try {
    const response: AxiosResponse = await api.post(
      "admin_forgot_password",
      data
    );
    // Handle successful response
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return responseData;
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return null;
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return null;
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return null;
    }
  }
};

export const resetPassword = async (data: IResetPasswordData) => {
  try {
    const response: AxiosResponse = await api.post(
      "/admin_reset_password",
      data
    );
    // Handle successful response
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return responseData;
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return null;
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return null;
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return null;
    }
  }
};

export const getCustomerDetail = async () => {
  try {
    const response: AxiosResponse = await api.get("admin_get_customer_detail");
    return response.data;
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server (if available)
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
      // Handle other types of errors
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }
};

export const getContactorDetail = async (data: IContractorPostData) => {
  try {
    const response: AxiosResponse = await api.get(
      "admin_get_contractor_detail",
      { params: data }
    );
    return response.data;
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server (if available)
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
      // Handle other types of errors
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }
};
