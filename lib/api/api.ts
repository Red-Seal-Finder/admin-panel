import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { setCookie } from "cookies-next";
import {
  IContractorPostData,
  ICustomers,
  IForgotPasswordData,
  ILoginData,
  INewQuestion,
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
    return { success: true, message }; // Return both success status and message
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message }; // Return both failure status and message
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" }; // Return network error
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" }; // Return other error
    }
  }
};

export const signup = async (data: ISignupData) => {
  try {
    const response: AxiosResponse = await api.post("/admin_signup", data);
    // Handle successful response
    const responseData = response.data;
    toast.success(responseData.message + ", OTP has been sent", {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message: responseData.message };
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: message };
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
      // Handle other types of errors
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return { success: false };
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
    return { success: true };
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return { success: false };
    }
  }
};

export const forgotPassword = async (data: IForgotPasswordData) => {
  try {
    const response: AxiosResponse = await api.post(
      "/admin_forgot_password",
      data
    );
    // Handle successful response
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message: responseData.message };
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return { success: false };
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
    return { success: true, message: responseData.message };
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: message };
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return { success: false };
    }
  }
};

export const getCustomerDetail = async () => {
  try {
    const response: AxiosResponse = await api.get("/admin_get_customer_detail");

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
      "/admin_get_contractor_detail",
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

export const getSubAdmins = async () => {
  try {
    const response: AxiosResponse = await api.get(
      "/super_admin_get_list_of_admin"
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

export const validateSubAdmin = async (data: { subAdminId: string }) => {
  try {
    const response: AxiosResponse = await api.post(
      "/super_admin_validate_other_admin",
      data
    );
    // Handle successful response
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true };
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return { success: false };
    }
  }
};
export const validateAContractorDocument = async (data: {
  contractorDocsId: string;
}) => {
  try {
    const response: AxiosResponse = await api.post(
      "admin_validate_contractor_document",
      data
    );
    // Handle successful response
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true };
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
      return { success: false };
    }
  }
};

export const getSkills = async () => {
  try {
    const response: AxiosResponse = await api.get("/admin_get_skill");
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
export const getAllQuestions = async () => {
  try {
    const response: AxiosResponse = await api.get("/admin_get_all_question");
    console.log(response.data);
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

export const addNewSkill = async (data: { name: string }) => {
  try {
    const response: AxiosResponse = await api.post("/admin_add_skill", data);
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message }; // Return both success status and message
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message }; // Return both failure status and message
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" }; // Return network error
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" }; // Return other error
    }
  }
};
export const addQuestions = async (data: INewQuestion) => {
  try {
    const response: AxiosResponse = await api.post("/admin_add_question", data);
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message }; // Return both success status and message
  } catch (error) {
    // Handle error response
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message }; // Return both failure status and message
      } else if (error.request) {
        // Handle network-related error (no response received)
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" }; // Return network error
      }
    } else {
      // Handle other types of errors
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" }; // Return other error
    }
  }
};
