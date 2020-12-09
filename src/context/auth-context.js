import React from "react";
import authService from "./../lib/auth-service";

const { Consumer, Provider } = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    email: null,
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

  signup = (email, password) => {
    authService
      .signup(email, password)
      .then((email) => this.setState({ isLoggedIn: true, email }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, email: null });
      });
  };

  login = (email, password) => {
    authService
      .login(email, password)
      .then((email) => this.setState({ isLoggedIn: true, email }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, email: null });
      });
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedIn: false, email: null }))
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoggedIn, isLoading, email } = this.state;
    const { signup, login, logout } = this;

    if (isLoading) return <p>Loading</p>;

    return (
      <Provider value={{ isLoggedIn, isLoading, email, signup, login, logout }}>
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
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

export { AuthProvider, withAuth };
