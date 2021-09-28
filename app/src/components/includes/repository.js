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

function getUsers() {
  api.get("/all").then(res => {
    console.log(res.data);
  })
}

function createNewUser(user_id, firstname, lastname, email, password) {
  api.post("/new", {user_id: user_id, firstname: firstname, lastname: lastname, email: email, password: password})
  .then(res => {console.log(res.data)});
}

// //SETS USERS IN LOCALSTORAGE
// function setUsers(users) {
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// }

//CHECKS IF THE EMAIL IS ALREADY REGISTERED IN THE LOCAL STORAGE
function isEmailRegistered(email) {

}

//RETURNS ALL USER DETAILS BASED ON THE USER
const getUserInfo = async (email) => {
  const res = await api.get(`/user/${email}`)
  return res.data;
};

//FUNCTION TO VERIFY USER AND PASSWORD
const verifyUser = async (email, password) => {
  const user = await getUserInfo(email);
  if(user[0]) {
    if (user[0].password === password) {
      //IF PASSWORD MATCHES RETURN TRUE
      return true;
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
  getUsers,
  createNewUser,
  isEmailRegistered,
  verifyUser,
  getUserInfo,
  removeUser,
  updateName,
  updateEmail,
  changePassword,
};
