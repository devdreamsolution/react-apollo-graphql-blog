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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import Assignment from "@material-ui/icons/Assignment";
import Check from "@material-ui/icons/Check";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Table from "components/Table/Table.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TagsInput from "react-tagsinput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// import draftToHtml from 'draftjs-to-html';
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

// import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";

const styles = {
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px"
    }
  };
  
class Tags extends Component {
  constructor(props){
    super(props);
    this.state = {
      simpleSelect: "",
      tags:[],
      checked: [],
    }
  }
  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    const simpleButtons = [
      { color: "success", icon: Edit },
      { color: "danger", icon: Close }
    ].map((prop, key) => {
      return (
        <Button
          color={prop.color}
          simple
          className={classes.actionButton}
          key={key}
        >
          <prop.icon className={classes.icon} />
        </Button>
      );
    });
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <h5>Add New Tag</h5>
            {/* <h6>Name</h6> */}
            <CustomInput
              labelText="Name"
              id="name"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                placeholder: "Name"
              }}
            />
            <CustomInput
              labelText="Slug"
              id="slug"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Slug"
              }}
            />
            <CustomInput
              labelText="Description"
              id="textarea-input"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 5
              }}
            />
            <Button color="info" className={classes.marginRight}>
              Add New Tag
            </Button>
          </GridItem>
          <GridItem xs={12} sm={8} md={8}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Tags</h4>
              </CardHeader>
              <CardBody>
                <Table
                  striped
                  tableHead={[
                    "#",
                    <Checkbox
                      // className={classes.positionAbsolute}
                      tabIndex={-1}
                      onClick={() => this.handleToggle(0)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />,
                    "Name",
                    "Description",
                    "Slug",
                    "Count",
                    "Action"
                  ]}
                  tableData={[
                    [
                      "1",
                      <Checkbox
                        // className={classes.positionAbsolute}
                        tabIndex={-1}
                        onClick={() => this.handleToggle(1)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />,
                      "Moleskine Agenda",
                      "Office",
                      "25",
                      "€ 49",
                      simpleButtons
                    ],
                    [
                      "2",
                      <Checkbox
                        // className={classes.positionAbsolute}
                        tabIndex={-1}
                        onClick={() => this.handleToggle(2)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />,
                      "Stabilo Pen",
                      "Office",
                      "30",
                      "€ 10",
                      simpleButtons
                    ],
                    [
                      "3",
                      <Checkbox
                        // className={classes.positionAbsolute}
                        tabIndex={-1}
                        onClick={() => this.handleToggle(3)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />,
                      "A4 Paper Pack",
                      "Office",
                      "50",
                      "€ 10.99",
                      simpleButtons
                    ],
                    [
                      "4",
                      <Checkbox
                        // className={classes.positionAbsolute}
                        tabIndex={-1}
                        onClick={() => this.handleToggle(4)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />,
                      "Apple iPad",
                      "Communication",
                      "10",
                      "€ 499.00",
                      simpleButtons
                    ],
                    [
                      "5",
                      <Checkbox
                        // className={classes.positionAbsolute}
                        tabIndex={-1}
                        onClick={() => this.handleToggle(5)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />,
                      "Apple iPhone",
                      "Communication",
                      "10",
                      "€ 599.00",
                      simpleButtons
                    ],
                  ]}
                  customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                  ]}
                  customClassesForCells={[0, 5, 6]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                  ]}
                  customHeadClassesForCells={[0, 5, 6]}
                />
              </CardBody>
            </Card>
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

export default withStyles(extendedTablesStyle)(Tags);