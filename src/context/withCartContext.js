import React from "react";
import Context from "./cart-context";

const withCartContext = (WrappedComponent) => {
  const WithHOC = (props) => {
    return (
      <Context.Consumer>
        {(context) => <WrappedComponent {...props} context={context} />}
      </Context.Consumer>
    );
  };

  return WithHOC;
};

export default withCartContext;
