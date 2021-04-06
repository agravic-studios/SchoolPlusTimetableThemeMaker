import React from "react";
import FormBase from "./FormBase";
import styled from "styled-components";
import PropTypes from "prop-types";

class TextForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChangeBackgroundColor: PropTypes.func,
    onChangeTextColor: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      backgroundColorInput: "",
      backgroundColorSubmit: "",
      textColorInput: "",
      textColorSubmit: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const bg = this.state.backgroundColorInput;
    const tx = this.state.textColorInput;
    this.setState({
      backgroundColorSubmit: bg,
      textColorSubmit: tx,
    });

    this.props.onSubmit && this.props.onSubmit(bg, tx);
  };

  onChangeBackgroundColor = (e) => {
    var value = e.target.value;
    this.setState({
      backgroundColorInput: value,
    });
  };

  onChangeTextColor = (e) => {
    var value = e.target.value;
    if (value.length == 1 && value != "#") {
      value = "#" + value;
    }
    this.setState({
      textColorInput: value,
    });
  };

  ColorStateDisplay = styled.div`
    width: 48px;
    height: 48px;
    margin-right: 8px;
    color: ${(props) => props.textColor || "black"};
    background-color: ${(props) => props.backgroundColor || "white"};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  `;

  Container = styled.div`
    display: flex !important;
    flex-direction: row;
    align-items: center;
  `;

  render() {
    const {
      backgroundColorInput,
      backgroundColorSubmit,
      textColorInput,
      textColorSubmit,
    } = this.state;
    return (
      <this.Container className={this.props.className}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>
            {this.props.label}:{" "}
            <input
              type={this.props.number ? "number" : "text"}
              autoComplete="off"
              onChange={this.onChangeBackgroundColor.bind(this)}
              value={backgroundColorInput}
            />
          </label>
        </form>
      </this.Container>
    );
  }
}

TextForm.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  number: PropTypes.bool,
};

export default TextForm;
