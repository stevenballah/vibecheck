import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./components/includes/Nav";
import Footer from "./components/includes/Footer";
import Home from "./components/pages/Home";
import Forum from "./components/pages/Forum";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Settings from "./components/pages/Settings";
import UserContext from "./components/includes/UserContext";
import NewPost from "./components/pages/NewPost";
import ReplyPost from "./components/pages/ReplyPost";
import DisplayPosts from "./components/pages/DisplayPosts";
import EditPost from "./components/pages/EditPost";
import { getUserInfo } from "./components/includes/repository";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const loginUser = (user) => {
    setCurrentUser(user);
    setUserLoggedIn(true);
  };
  const logoutUser = () => {
    setCurrentUser(null);
    setUserInfo([]);  //CLEAR THE DATA FROM useState
    setUserLoggedIn(false);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      const retrieveUserInfo = async () => {
        try {
          const response = await getUserInfo(currentUser);
          const result = await response;
          setUserInfo(...result, result[0]);
        } catch (error) {
          console.log(error);
        }
      };
      retrieveUserInfo();
    }
  }, [isUserLoggedIn, currentUser]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <UserContext.Provider
        value={{ currentUser, userInfo, loginUser, logoutUser }}
      >
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/forum">
              <div className="container">
                <div className="position-relative min-vh-100 overflow-hidden p-3 p-md-5 m-md-3">
                  <Forum />
                  <Route exact path="/forum/posts">
                    <DisplayPosts />
                  </Route>
                  <Route exact path="/forum/new-post">
                    <NewPost />
                  </Route>
                  <Route exact path="/forum/edit-post/:id">
                    <EditPost />
                  </Route>
                  <Route path="/forum/posts/:id">
                    <ReplyPost />
                  </Route>
                </div>
              </div>
            </Route>

            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="*">
              <h1>404 Error : Page Not Found</h1>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
