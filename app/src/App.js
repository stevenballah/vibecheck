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
import Explore from "./components/pages/Explore";
import { getUserInfo } from "./components/includes/repository";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  const loginUser = (user) => {
    setCurrentUser(user);
  };
  const logoutUser = () => {
    setCurrentUser(null);
    setUserInfo([]);  //CLEAR THE DATA FROM useState
  };

  

  //ONCE USER IS LOGGED IN GET ALL THE USER INFO FROM DB AND STORE IN USESTATE
  //THIS ALLOW USER INFO TO BE GLOBALLY ACCESSIBLE
  useEffect(() => {
    if (currentUser !== null) {
      const userInfoChanged = async () => {
        const result = await getUserInfo(currentUser);
        setUserInfo(result);
      }
      userInfoChanged();
    }
  }, [currentUser]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <UserContext.Provider
        value={{ currentUser, userInfo, loginUser, logoutUser, setUserInfo }}
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
                  <Route path="/forum/explore">
                    <Explore />
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
