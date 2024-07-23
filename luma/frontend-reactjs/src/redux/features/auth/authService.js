import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "users/register", userData);
  return response.data;
};



// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "users/login", userData);
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + "users/logout");
  return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "users/loginStatus");
  return response.data;
};

// Get user profile
const getUser = async () => {
  const response = await axios.get(API_URL + "users/getUser");
  return response.data;
};

// Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "users/updateUser", userData);
  return response.data;
};



// Get getCreditCardPurchases
const getCreditCardPurchases = async () => {
  const response = await axios.get(API_URL + "loan/getEmployeeCardDetails");

  return response.data;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(API_URL + "users/getUsers");

  return response.data;
};
// Upgrade User
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + "users/upgradeUser", userData);

  return response.data.message;
};

// Apply loan
const applyloanUser = async (applyloanData) => {
  const response = await axios.post(API_URL + "loan/apply-loan", applyloanData);
  return response.data;
};
// Upadate loan loan
const approveLoans = async (loanupdatedata) => {
 // console.log("loanupdatedata ",loanupdatedata)
  const response = await axios.post(API_URL + "loan/update-loan", loanupdatedata);
  return response.data;
};
// get loan

const getLoans = async () => {
  const response = await axios.get(API_URL + "loan/getLoans");

  return response.data;
};
// get loan_d

const getLoans_d = async () => {
  //const response = await axios.get(API_URL + "loan/getLoans_d");
let ids =window.location.href.split('view-item-emp-details/')[1]
const response = await axios.get(API_URL + "loan/loanEmpDeails/"+ids);
  return response.data;
};

// get loan

const getDetailLoans = async (id) => {
  let ids =window.location.href.split('view-purchase-emp-details/')[1]
const response = await axios.get(API_URL + "loan/loanEmpDeails/"+ids);

  return response.data.message;
};


const authService = {
  register,
  applyloanUser,
  approveLoans,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  getCreditCardPurchases,
 getUsers,
  upgradeUser,
  getLoans,
  getLoans_d,
  getDetailLoans

};

export default authService;
