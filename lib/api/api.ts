import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { setCookie } from "cookies-next";
import {
  IContractorPostData,
  ICustomers,
  IForgotPasswordData,
  ILoginData,
  IQuestion,
  IEditQuestion,
  IResetPasswordData,
  ISignupData,
  IVerifyEmailData,
  IGetJobsData,
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
    console.log(response);
    localStorage.setItem("token", response?.data.Token);
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" };
      }
    } else {
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" };
    }
  }
};

export const signup = async (data: ISignupData) => {
  try {
    const response: AxiosResponse = await api.post("/admin_signup", data);
    console.log(response);
    const responseData = response.data;
    toast.success(responseData.message + ", OTP has been sent", {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message: responseData.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
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
    console.log(response);
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
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
    console.log(response);
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message: responseData.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
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
    console.log(response);
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message: responseData.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
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
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server (if available)
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  }
};

export const getOverviewDetail = async () => {
  try {
    const response: AxiosResponse = await api.get("/app_detail");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server (if available)
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
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
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server (if available)
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
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
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server (if available)
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
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
    console.log(response);
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
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
    console.log(response);
    const responseData = response.data;
    toast.success(responseData.message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false };
      }
    } else {
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
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server (if available)
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
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
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server (if available)
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_LEFT,
        });
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } else {
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
    return { success: true, message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" };
      }
    } else {
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" };
    }
  }
};

export const addQuestions = async (data: IQuestion) => {
  try {
    const response: AxiosResponse = await api.post("/admin_add_question", data);
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" };
      }
    } else {
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" };
    }
  }
};

export const editQuestions = async (data: IEditQuestion) => {
  try {
    const response: AxiosResponse = await api.post(
      "/admin_edit_question",
      data
    );
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" };
      }
    } else {
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" };
    }
  }
};

export const deleteQuestions = async (data: { questionId: string }) => {
  try {
    const response: AxiosResponse = await api.post(
      "/admin_delete_question",
      data
    );
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        console.log(error.response);
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" };
      }
    } else {
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" };
    }
  }
};

export const getTotalJobs = async () => {
  try {
    const response: AxiosResponse = await api.get("admin_get_total_job");
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, response: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        console.log(error.response);
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" };
      }
    } else {
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" };
    }
  }
};

export const getJobs = async (data: IGetJobsData) => {
  try {
    const response: AxiosResponse = await api.get("/admin_get_jobs_detail", {
      params: data,
    });
    const message = response.data.message;
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    return { success: true, response: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle error with response from the server
        console.log(error.response);
        const message = error.response.data.message;
        toast.error(message, {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message };
      } else if (error.request) {
        toast.error("Network error. Please check your connection.", {
          position: toast.POSITION.TOP_LEFT,
        });
        return { success: false, message: "network_error" };
      }
    } else {
      console.error("Non-Axios error:", error);
      return { success: false, message: "error" };
    }
  }
};
