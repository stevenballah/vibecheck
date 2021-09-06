const USERS_KEY = "users";

//INITIALISES USERS IF LOCALSTORAGE IS EMPTY
function initUsers() {
  if (localStorage.getItem(USERS_KEY) !== null) return;

  setUsers({});
}

//GETS USERS FROM LOCALSTORAGE
function getUsers() {
  initUsers();
  return JSON.parse(localStorage.getItem(USERS_KEY));
}

//SETS USERS IN LOCALSTORAGE
function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

//CHECKS IF THE EMAIL IS ALREADY REGISTERED IN THE LOCAL STORAGE
function isEmailRegistered(email) {
  const users = getUsers();
  if (users[email]) {
    return true;
  }
  return false;
}

//FUNCTION TO VERIFY USER AND PASSWORD
function verifyUser(email, password) {
  const users = getUsers();
  //IF EMAIL EXISTS CHECK EMAIL AND PASS IN LOCAL STORAGE
  if (isEmailRegistered(email)) {
    const user = users[email];
    if (email === user["email"] && password === user["password"]) {
      return true;
    }
  }
  return false;
}

//RETURNS ALL USER DETAILS BASED ON THE USER
function getUserInfo(user) {
  const users = getUsers();
  return users[user];
}

//REMOVES A USER FROM LOCALSTORAGE
function removeUser(email) {
  const users = getUsers();
  delete users[email];
  setUsers(users);
}

//UPDATE THE NAME OF USER
function updateName(email, newFirstname, newLastname) {
  const users = getUsers();
  const user = users[email];
  user.firstname = newFirstname;
  user.lastname = newLastname;
  users[email] = user;
  setUsers(users);
}

//UPDATE THE EMAIL OF USER
function updateEmail(email, newEmail) {
  const users = getUsers();
  const user = users[email];
  user.email = newEmail;
  delete users[email];
  users[newEmail] = user;
  setUsers(users);
}

//CHANGES PASSWORD
function changePassword(email, newPass) {
  const users = getUsers();
  const user = users[email];
  user.password = newPass;
  user.password2 = newPass;
  users[email] = user;
  setUsers(users);
}

export {
  initUsers,
  getUsers,
  setUsers,
  isEmailRegistered,
  verifyUser,
  getUserInfo,
  removeUser,
  updateName,
  updateEmail,
  changePassword,
};
