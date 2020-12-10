import React from "react";
import apiService from "../lib/api-service";

const { Consumer, Provider } = React.createContext();

class ApiProvider extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    apiService
      .getCart()
      .then((cart) => this.setState({ cart }))
      .catch((err) => this.setState({ cart: [] }));
  }

  signup = (email, password) => {
    apiService
      .signup(email, password)
      .then((email) => this.setState({ isLoggedIn: true, email }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, email: null });
      });
  };

  login = (email, password) => {
    apiService
      .login(email, password)
      .then((email) => this.setState({ isLoggedIn: true, email }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, email: null });
      });
  };

  logout = () => {
    apiService
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
const withapi = (WrappedComponent) => {
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

export { ApiProvider, withapi };
