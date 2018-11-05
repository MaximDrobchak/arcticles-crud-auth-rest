import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import "typeface-roboto";
import AuthAdminContext from "./Auth/AuthAdminContext";
import withTheme from "./styles/withTheme";
import Navigation from "./conteiners/Navigation";
import * as routes from "./constants";

import AddTask from "./conteiners/AddTask";
import Home from "./conteiners/Home";
import { SignIn } from "./components/SignIn";

// indicator SignIn Form
const Indicator = () => (
  <CircularProgress
    style={{ color: "red", margin: 2 }}
    thickness={40}
    size={150}
  />
);

SignIn.propTypes = {
  loginValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
  onAuthorization: PropTypes.func.isRequired
};

/***
 * This component handle authorization for secure session.
 *
 *  @private { App }
 *	@var authAdmin flag autorization admin
 *	@var login value data login
 *	@var password value data password
 *	@var {open} state control form Sign In
 *	@var {isLoading} state indicator
 *
 *
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      authAdmin: false,
      login: "",
      password: "",
      open: false,
      isLoading: false
    };
  }

  /**Method control autorization */
  onAuthorization = () => {
    this.setState({ isLoading: true });
    const { login, password } = this.state;

    console.log(login);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (login.toLocaleLowerCase() === "admin" && password === "123") {
          resolve(
            this.setState({
              authAdmin: true,
              open: false,
              isLoading: false
            })
          );
        } else {
          reject(
            this.setState({
              authAdmin: false,
              login: "",
              password: "",
              error: "Incorrect login or password",
              isLoading: false
            })
          );
        }
      }, 3500);
      if (this.state.authAdmin);
    });
  };

  /**Method listener input valu  */
  onDataChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**open modal form sign in */
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  /**close modal form sign in */
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <Router>
        <div>
          <Navigation
            /** transmits props form trough child content panel navigation */
            setRender={
              <SignIn
                isLoading={this.state.isLoading ? <Indicator /> : null}
                loginValue={this.state.login} // value login
                passwordValue={this.state.password} // value password
                children={<h1 style={{ color: "red" }}>{this.state.error}</h1>} // state error
                open={this.state.open} // state open modal
                handleClickOpen={this.handleClickOpen} // listener button open form SignIn
                handleClose={this.handleClose} // listener button close form SignIn
                onDataChange={this.onDataChange} // listener input value
                onAuthorization={this.onAuthorization} // submit data
              />
            }
          />

          {/** context transfer for HOMEPAGE */}
          <AuthAdminContext.Provider value={this.state.authAdmin}>
            <Route exect path={routes.HOME} component={Home} />
          </AuthAdminContext.Provider>

          <Route exect path={routes.ADD_TASK} component={AddTask} />
        </div>
      </Router>
    );
  }
}

export default withTheme(App);
