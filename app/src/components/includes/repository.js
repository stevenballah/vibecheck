import api from "../../api/api";

//API CALL TO GET ALL USERS IN THE DB
const getAllUsers = async () => {
  const res = await api.get("/users/all");
  return res.data;
}

//API CALL TO GET THE USER DETAILS BASED ON EMAIL
async function getUserInfo(email) {
  const res = await api.get(`/users/user/${email}`);
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
    profile_pic_url: null
  }

  const response = await api.post("/users/signup", request);

  return response.data;
}

//CHECKS IF THE EMAIL IS ALREADY REGISTERED
async function isEmailRegistered(email) {
  const request = { email: email };
  const response = await api.post("/users/checkEmail", request);
  
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
  const response = await api.post("/users/login", request);
  const user = response.data;
  return user;
}

//API CALL TO UPLOAD PROFILE PIC
async function uploadProfilePic(url, user_id) {
  const value = { profile_pic_url: url };
  await api.put(`/users/uploadProfilePic/${user_id}`, value);
};

//REMOVES A USER FROM LOCALSTORAGE
async function removeUser(user_id) {
  await api.delete(`/users/delete/${user_id}`);
}

//UPDATE THE NAME OF USER
async function updateName(user_id, newFirstname, newLastname) {
  const value = { firstname: newFirstname, lastname: newLastname };
  await api.put(`/users/edit/name/${user_id}`, value);
}

//UPDATE THE EMAIL OF USER
async function updateEmail(user_id, newEmail) {
  const value = { email: newEmail };
  await api.put(`/users/edit/email/${user_id}`, value);
}

//CHANGES PASSWORD
async function changePassword(user_id, newPass, oldpassword) {
  const value = { user_id: user_id, password: newPass, oldpassword: oldpassword };
  const res = await api.put(`/users/edit/password/${user_id}`, value);
  return res.data;
}

//API CALL TO GET ALL POSTS IN THE DB
async function getAllPosts() {
  const res = await api.get("/posts/all");
  return res.data;
}

//API CALL TO GET ALL POSTS IN THE DB
async function getPost(post_id) {
  const res = await api.get(`/posts/get/${post_id}`);
  return res.data;
}

//ADD POST TO DB
async function createNewPost(fields) {
  const request = {
    post_id: generatePostID(),
    user_id: fields.user_id,
    title: fields.title,
    message: fields.message,
    image_url: fields.image_url,
    timestamp: new Date()
  }

  const response = await api.post("/posts/new", request);

  return response.data;
}

//REMOVE POST
async function removePost(post_id) {
  await api.delete(`/posts/delete/${post_id}`);
}

//EDIT POST
async function editPost(fields, post_id) {
  const request = {
    title: fields.title,
    message: fields.message,
    timestamp: new Date()
  }
  const response = await api.put(`/posts/edit/${post_id}`, request);
  return response.data;
}

//ADD LIKE TO DB
async function addLikeToDB(post_id, user_id) {
  const request = {
    post_id: post_id,
    user_id: user_id,
    timestamp: new Date()
  }

  const response = await api.post("/post_like/new", request);
  return response.data;
}

//REMOVE LIKE FROM DB
async function removeLikeFromDB(post_id, user_id) {
  await api.delete(`/post_like/delete/${post_id}/${user_id}`);
}

async function getUserLikes(user_id) {
  const response = await api.get(`/post_likes/all/${user_id}`);
  return response.data;
}

//ADD DISLIKE TO DB
async function addDislikeToDB(fields) {
  const request = {
    post_id: fields.post_id,
    user_id: fields.user_id,
    timestamp: new Date()
  }

  const response = await api.post("/post_dislike/new", request);
  return response.data;
}

//REMOVE DISLIKE FROM DB
async function removeDislikeFromDB(post_id, user_id) {
  await api.delete(`/post_dislike/delete/${post_id}/${user_id}`);
}

//FOLLOW USER
async function followUser(fields) {
  const request = {
    following_id: fields.following_id,
    user_id: fields.user_id,
    timestamp: new Date()
  }

  const response = await api.post("/follow", request);
  return response.data;
}

//UNFOLLOW USER
async function unfollowUser(fields) {
  const request = {
    following_id: fields.following_id,
    user_id: fields.user_id
  }

  await api.post("/unfollow", request);
}

//GET ALL USERS WHO THE USER IS FOLLOWING
async function getUsersFollowing(user_id) {
  const response = await api.get(`/following/all/${user_id}`);
  return response.data;
}

//GET ALL USERS FOLLOWERS
async function getUserFollowers(user_id) {
  const response = await api.get(`/followers/all/${user_id}`);
  return response.data;
}

//ADD REPLY TO DB
async function createNewReply(fields) {
  const request = {
    reply_id: generatePostID(),
    post_id: fields.post_id,
    user_id: fields.user_id,
    message: fields.message,
    timestamp: new Date()
  }

  await api.post("/replies/new", request);
}

//API CALL TO GET THE REPLIES TO A POST
async function getReplies(post_id) {
  const res = await api.get(`/replies/${post_id}`);
  return res.data;
};

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

//GENERATES A 16 BIT ID TO USE FOR THE POST
function generatePostID() {
  var length = 16;
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

export {
  getAllUsers,
  createNewUser,
  isEmailRegistered,
  verifyUser,
  getUserInfo,
  removeUser,
  updateName,
  updateEmail,
  changePassword,
  uploadProfilePic,
  getAllPosts,
  createNewPost,
  createNewReply,
  getReplies,
  removePost,
  editPost,
  getPost,
  addLikeToDB,
  removeLikeFromDB,
  addDislikeToDB,
  removeDislikeFromDB,
  followUser,
  unfollowUser,
  getUsersFollowing,
  getUserFollowers,
  getUserLikes,
};
