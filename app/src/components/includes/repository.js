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


//API CALL TO GET ALL USERS IN THE DB
const getAllUsers = async () => {
  const res = await api.get("/all");
  return res.data;
}

function createNewUser(user_id, firstname, lastname, email, password) {
  // api.post("/new", {user_id: user_id, firstname: firstname, lastname: lastname, email: email, password: password})
  // .then(res => {console.log(res.data)});
}

// //SETS USERS IN LOCALSTORAGE
// function setUsers(users) {
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// }

//CHECKS IF THE EMAIL IS ALREADY REGISTERED IN THE LOCAL STORAGE
function isEmailRegistered(email) {

}

//API CALL TO GET THE USER DETAILS BASED ON EMAIL
async function getUserInfo(email) {
  const res = await api.get(`/user/${email}`);
  return res.data;
};

//FUNCTION TO VERIFY USER AND PASSWORD
async function verifyUser(email, password) {
  const user = await getUserInfo(email);
  if(user[0]) {
    if (user[0].password === password) {
      //IF PASSWORD MATCHES RETURN TRUE
      return true;
    } else {
      return false;
    }
  }
}


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
};
