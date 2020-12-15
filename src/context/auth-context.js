import React from "react";
import authService from "./../lib/auth-service";

const { Consumer, Provider } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    email: null,
    messageLogin: "",
    messageSignup: "",
  };

  componentDidMount() {
    authService
      .me()
      .then((email) =>
        this.setState({ isLoggedIn: true, email: email, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedIn: false, email: null, isLoading: false })
      );
  }

  signup = (
    firstName,
    lastName,
    address,
    country,
    CP,
    city,
    state,
    phoneNumber,
    gender,
    birthDateDay,
    birthDateMonth,
    birthDateYear,
    email,
    password
  ) => {
    authService
      .signup(
        firstName,
        lastName,
        address,
        country,
        CP,
        city,
        state,
        phoneNumber,
        gender,
        birthDateDay,
        birthDateMonth,
        birthDateYear,
        email,
        password
      )
      .then((email) => this.setState({ isLoggedIn: true, email }))
      .catch((err) => {
        const messageSignup = err.response.data.message;
        this.setState({ isLoggedIn: false, email: null, messageSignup });
      });
  };

  login = (email, password) => {
    authService
      .login(email, password)
      .then((email) => this.setState({ isLoggedIn: true, email }))
      .catch((err) => {
        const messageLogin = err.response.data.message;
        this.setState({ isLoggedIn: false, email: null, messageLogin });
      });
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedIn: false, email: null }))
      .catch((err) => console.log(err));
  };

  editProfile = (
    firstName,
    lastName,
    address,
    country,
    CP,
    city,
    state,
    phoneNumber,
    gender,
    birthDateDay,
    birthDateMonth,
    birthDateYear,
    email,
    password
  ) => {
    authService
      .editProfile(
        firstName,
        lastName,
        address,
        country,
        CP,
        city,
        state,
        phoneNumber,
        gender,
        birthDateDay,
        birthDateMonth,
        birthDateYear,
        email,
        password
      )
      .then((email) => console.log("Updated profile"))
      .catch((err) => {
        console.log("Errorin updating profile");
      });
  };

  render() {
    const {
      isLoggedIn,
      isLoading,
      email,
      messageLogin,
      messageSignup,
    } = this.state;
    const { signup, login, logout } = this;
    if (isLoading) return <p>Loading</p>;

    return (
      <Provider
        value={{
          isLoggedIn,
          isLoading,
          email,
          signup,
          login,
          logout,
          messageLogin,
          messageSignup,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {(value) => {
            const {
              isLoggedIn,
              isLoading,
              email,
              signup,
              login,
              logout,
              messageLogin,
              messageSignup,
            } = value;

            return (
              <WrappedComponent
                {...this.props}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                user={email}
                signup={signup}
                login={login}
                logout={logout}
                messageLogin={messageLogin}
                messageSignup={messageSignup}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

export { AuthProvider, withAuth };
