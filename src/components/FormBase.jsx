import React from "react";
import PropTypes from "prop-types";

class FormBase extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      submitValue: "",
    };
  }

  onSubmitData = (e) => {
    e.preventDefault();
    const value = this.state.inputValue;
    this.setState({
      submitValue: value,
    });

    this.props.onSubmit && this.props.onSubmit(value);
  };

  onChangeInput = (e) => {
    const value = e.target.value;
    this.setState({
      inputValue: value,
    });

    this.props.onSubmit && this.props.onSubmit(value);
  };

  /*
   * =====================
   *   Common Interfaces
   * =====================
   */

  render() {
    return null;
  }
}

FormBase.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default FormBase;
