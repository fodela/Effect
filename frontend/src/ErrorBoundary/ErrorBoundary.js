import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errMsg: "",
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true, errMsg: error });
  }

  render() {
    return this.state.hasError ? (
      <div>{this.state.errMsg}</div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
