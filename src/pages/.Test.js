import React, { Component } from "react";
import { connect } from "react-redux";

class Test extends Component {
  render() {
    console.log(
      "this.props.currentProductList :>> ",
      this.props.currentProductList
    );
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentProductList: state.currentProductList,
  };
};
const wrapper = connect(mapStateToProps);
const component = wrapper(Test);
export default component;
