import React from "react";
import FormBase from "./FormBase";
import styled from "styled-components";
import PropTypes from "prop-types";

import "../css/Forms.css";

class ColorForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onChangeBackgroundColor: PropTypes.func,
    onChangeTextColor: PropTypes.func,
    deletable: PropTypes.bool,
    onDelete: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      backgroundColorInput: "",
      textColorInput: "",
    };
  }

  onChangeBackgroundColor = (e) => {
    var value = e.target.value;
    if (value.length == 1 && value != "#") {
      value = "#" + value;
    }
    this.setState({
      backgroundColorInput: value,
    });
    this.props.onChangeBackgroundColor &&
      this.props.onChangeBackgroundColor(value);
  };

  onChangeTextColor = (e) => {
    var value = e.target.value;
    if (value.length == 1 && value != "#") {
      value = "#" + value;
    }
    this.setState({
      textColorInput: value,
    });
    this.props.onChangeTextColor && this.props.onChangeTextColor(value);
  };

  ColorStateDisplay = styled.div`
    width: 96px;
    height: 48px;
    margin-right: 8px;
    color: ${(props) => props.textColor || "black"};
    background-color: ${(props) => props.backgroundColor || "white"};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    display: inline-block;
    text-align: center;
    line-height: 48px;
  `;

  render() {
    console.log("Color Form Rendering...");
    const {
      defaultBackgroundColor,
      defaultTextColor,
      deletable,
      onDelete,
    } = this.props;
    const { backgroundColorInput, textColorInput } = this.state;
    return (
      <div className={["color-form", this.props.className].join(" ")}>
        <this.ColorStateDisplay
          backgroundColor={backgroundColorInput}
          textColor={textColorInput}
        >
          {this.props.label}
        </this.ColorStateDisplay>
        <div className="inner-form">
          <input
            type="text"
            autoComplete="off"
            placeholder="Background"
            onChange={this.onChangeBackgroundColor.bind(this)}
            defaultValue={defaultBackgroundColor}
            value={backgroundColorInput}
          />
          <input
            type="color"
            value={backgroundColorInput}
            onChange={this.onChangeBackgroundColor.bind(this)}
          />
          <input
            type="text"
            autoComplete="off"
            placeholder="Text"
            onChange={this.onChangeTextColor.bind(this)}
            defaultValue={defaultTextColor}
            value={textColorInput}
          />
          <input
            type="color"
            value={textColorInput}
            onChange={this.onChangeTextColor.bind(this)}
          />
          {deletable && (
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}

ColorForm.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onChangeBackgroundColor: PropTypes.func,
  onChangeTextColor: PropTypes.func,
};

export default ColorForm;
