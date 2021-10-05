import api from "../../api/api";
const USERS_KEY = "users";

//INITIALISES USERS IF LOCALSTORAGE IS EMPTY
function initUsers() {
  if (localStorage.getItem(USERS_KEY) !== null) return;

}

// //GETS USERS FROM LOCALSTORAGE
// function getUsers() {
//   initUsers();
//   return JSON.parse(localStorage.getItem(USERS_KEY));
// }

// //SETS USERS IN LOCALSTORAGE
// function setUsers(users) {
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// }

//API CALL TO GET ALL USERS IN THE DB
const getAllUsers = async () => {
  const res = await api.get("/all");
  return res.data;
}

//API CALL TO GET THE USER DETAILS BASED ON EMAIL
async function getUserInfo(email) {
  const res = await api.get(`/user/${email}`);
  return res.data;
};

//ADD USER TO DB
async function createNewUser(fields) {
  const request = {
    user_id: generateUID(),
    firstname: fields.firstname,
    lastname: fields.lastname,
    email: fields.email,
    password: fields.password,
    account_created: new Date(),
    profile_pic_url: ""
  }

  const response = await api.post("/signup", request);

  return response.data;
}

//CHECKS IF THE EMAIL IS ALREADY REGISTERED
async function isEmailRegistered(email) {
  const request = { email: email };
  const response = await api.post("/checkEmail", request);
  console.log(response.data);
  if (response.data) {
    return true;
  } else {
    return false;
  }
}

//FUNCTION TO VERIFY USER AND PASSWORD
async function verifyUser(email, password) {
  const request = {
    email: email,
    password: password
  }
  const response = await api.post("/login", request);
  const user = response.data;
  return user;
}

//API CALL TO UPLOAD PROFILE PIC
async function uploadProfilePic(url, user_id) {
  const value = { profile_pic_url: url };
  const res = await api.put(`/uploadProfilePic/${user_id}`, value);
  console.log(res.data);
};

//REMOVES A USER FROM LOCALSTORAGE
function removeUser(email) {

}

//UPDATE THE NAME OF USER
function updateName(email, newFirstname, newLastname) {

}

//UPDATE THE EMAIL OF USER
function updateEmail(email, newEmail) {

}

//CHANGES PASSWORD
function changePassword(email, newPass) {

}

//GENERATE A USER ID
function generateUID() {
  var length = 10;
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

export {
  initUsers,
  getAllUsers,
  createNewUser,
  isEmailRegistered,
  verifyUser,
  getUserInfo,
  removeUser,
  updateName,
  updateEmail,
  changePassword,
  uploadProfilePic
};
