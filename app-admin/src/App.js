import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/includes/Nav";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row position-relative min-vh-100 overflow-hidden">
          <div className="col-md-4 col-lg-2 bg-dark">
            <Nav />
          </div>

          <div className="col ml-md-auto px-2 bg-dark shadow-lg">
            <Switch>
              <Route exact path="/">
                <Redirect from="/" to="Dashboard" />
              </Route>
              <Route exact path="/Dashboard">
                <Dashboard />
              </Route>

            </Switch>
          </div>

        </div>
      </div>
      
    </Router>
  );
}

export default App;
