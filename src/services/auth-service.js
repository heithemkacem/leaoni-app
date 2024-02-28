import { HttpService } from "./htttp.service";

async function login(payload) {
  try {
    const loginEndpoint = "login";
    return await HttpService.post(loginEndpoint, payload);
  } catch (error) {
    // Handle the error, e.g., log it or return an error response.
    console.error("Error during login:", error);
    throw error; // Rethrow the error to propagate it to the caller.
  }
}

async function register(credentials) {
  try {
    const registerEndpoint = "register";
    return await HttpService.post(registerEndpoint, credentials);
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

async function logout() {
  try {
    const logoutEndpoint = "logout";
    return await HttpService.post(logoutEndpoint);
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

async function forgotPassword(payload) {
  try {
    const forgotPasswordEndpoint = "password-forgot";
    return await HttpService.post(forgotPasswordEndpoint, payload);
  } catch (error) {
    console.error("Error during password reset request:", error);
    throw error;
  }
}

async function resetPassword(credentials) {
  try {
    const resetPasswordEndpoint = "password-reset";
    return await HttpService.post(resetPasswordEndpoint, credentials);
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
}

async function getProfile() {
  try {
    const getProfileEndpoint = "me";
    return await HttpService.get(getProfileEndpoint);
  } catch (error) {
    console.error("Error while fetching user profile:", error);
    throw error;
  }
}

async function updateProfile(newInfo) {
  try {
    const updateProfileEndpoint = "me";
    return await HttpService.patch(updateProfileEndpoint, newInfo);
  } catch (error) {
    console.error("Error while updating user profile:", error);
    throw error;
  }
}

export default {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
};
