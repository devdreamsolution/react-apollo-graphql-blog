import React, { Component } from 'react';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import Settings from "@material-ui/icons/Settings";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Explore from "@material-ui/icons/Explore";
import Header from "components/Front/Header/Header.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Datetime from "react-datetime";

import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Close from "@material-ui/icons/Close";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TagsInput from "react-tagsinput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const styles = {
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px"
    }
  };
  
class EditComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedValue: null,
      selectedEnabled: "b"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "checkbox":
        if (event.target.checked) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    switch (type) {
      case "checkbox":
        this.setState({ [stateName]: event.target.checked });
        break;
      default:
        this.setState({ [stateName]: event.target.value });
        break;
    }
  }
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={10} md={10}>
            <h5>Author</h5>
            <CustomInput
              labelText="Name"
              success={this.state.requiredState === "success"}
              error={this.state.requiredState === "error"}
              id="required"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.change(event, "required", "length", 0),
                type: "text",
                endAdornment:
                  this.state.requiredState === "error" ? (
                    <InputAdornment position="end">
                      <Close className={classes.danger} />
                    </InputAdornment>
                  ) : (
                    undefined
                  )
              }}
            />
            <CustomInput
              labelText="Email"
              success={this.state.typeEmailState === "success"}
              error={this.state.typeEmailState === "error"}
              id="typeemail"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event =>
                  this.change(event, "typeEmail", "email"),
                type: "email",
                endAdornment:
                  this.state.typeEmailState === "error" ? (
                    <InputAdornment position="end">
                      <Close className={classes.danger} />
                    </InputAdornment>
                  ) : (
                    undefined
                  )
              }}
            />
            <CustomInput
              labelText="Url"
              success={this.state.urlState === "success"}
              error={this.state.urlState === "error"}
              id="url"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, "url", "url"),
                type: "text",
                endAdornment:
                  this.state.urlState === "error" ? (
                    <InputAdornment position="end">
                      <Close className={classes.danger} />
                    </InputAdornment>
                  ) : (
                    undefined
                  )
              }}
            />
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={2}>
            
            <div>
              <h5>Status</h5>
            </div>
            <div
              className={
                classes.checkboxAndRadio +
                " " +
                classes.checkboxAndRadioHorizontal
              }
            >
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedEnabled === "a"}
                    onChange={this.handleChangeEnabled}
                    value="a"
                    name="radio button enabled"
                    aria-label="A"
                    icon={
                      <FiberManualRecord
                        className={classes.radioUnchecked}
                      />
                    }
                    checkedIcon={
                      <FiberManualRecord
                        className={classes.radioChecked}
                      />
                    }
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="Approved"
              />
            </div>
            <div
              className={
                classes.checkboxAndRadio +
                " " +
                classes.checkboxAndRadioHorizontal
              }
            >
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedEnabled === "b"}
                    onChange={this.handleChangeEnabled}
                    value="b"
                    name="radio button enabled"
                    aria-label="B"
                    icon={
                      <FiberManualRecord
                        className={classes.radioUnchecked}
                      />
                    }
                    checkedIcon={
                      <FiberManualRecord
                        className={classes.radioChecked}
                      />
                    }
                    classes={{
                      checked: classes.radio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="Pending"
              />
            </div>
            <div
              className={
                classes.checkboxAndRadio +
                " " +
                classes.checkboxAndRadioHorizontal
              }
            >
              <FormControlLabel
                // disabled
                control={
                  <Radio
                    checked={this.state.selectedEnabled === "c"}
                    onChange={this.handleChangeEnabled}
                    value="c"
                    name="radio button disabled"
                    aria-label="C"
                    icon={
                      <FiberManualRecord
                        className={classes.radioUnchecked}
                      />
                    }
                    checkedIcon={
                      <FiberManualRecord
                        className={classes.radioChecked}
                      />
                    }
                    classes={{
                      checked: classes.radio,
                      // disabled: classes.disabledCheckboxAndRadio,
                      root: classes.radioRoot
                    }}
                  />
                }
                classes={{
                  label: classes.label
                }}
                label="Spam"
              />
            </div>
            <InputLabel className={classes.label}>
              Submitted On
            </InputLabel>
            <br />
            <FormControl fullWidth>
              <Datetime
                inputProps={{ placeholder: "Submitted On" }}
              />
            </FormControl>
            <InputLabel className={classes.label}>
              In response to:
            </InputLabel>
            <a href="#">Some Post Name</a>
            <Button color="info" className={classes.marginRight}>
              Update
            </Button>
          </GridItem>
          {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          /> */}
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(regularFormsStyle)(EditComment);