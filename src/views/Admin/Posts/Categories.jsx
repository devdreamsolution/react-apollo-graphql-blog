import React, { Component } from 'react';
import {If, Then, Else} from 'react-if';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { ADD_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY, UPDATE_CATEGORY } from "queries";
import { Query, Mutation } from "react-apollo";

import SweetAlert from "react-bootstrap-sweetalert";
import Heading from "components/Heading/Heading.jsx";
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
  
class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {
      simpleSelect: "",
      tags:[],
      checked: [],
      name: "",
      slug: "",
      description: "",
      label_txt: "Add New Category",
      action: "add",
      _id: "",
      alert: null,
      show: false,
    }
    this.hideAlert = this.hideAlert.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.cancelDetele = this.cancelDetele.bind(this);
  }
  successDelete(deleteCategory) {
    deleteCategory().then(async () => {
      this.setState({
        alert: (
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Deleted!"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
          >
            The category has been deleted.
          </SweetAlert>
        )
      });
    }).catch(() => {
      console.log("error!");
    });
  }
  cancelDetele() {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          The category is safe :)
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  warningWithConfirmMessage(deleteCategory) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(deleteCategory)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover this category!
        </SweetAlert>
      )
    });
  }
  onNameChange(event) {
    event.preventDefault();
    this.setState({
      name: event.target.value
    });
  }
  onSlugChange(event) {
    event.preventDefault();
    this.setState({
      slug: event.target.value
    });
  }
  onDescriptionChange(event) {
    event.preventDefault();
    this.setState({
      description: event.target.value
    });
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
  onAddCategory(event, addCategory) {
    event.preventDefault();
    addCategory().then(async ({ data }) => {
      this.setState({
        name: "",
        slug: "",
        description: "",
      }, () => {
          this.props.msgfunc("success", "Category created. Saved!");
        });
      }).catch(error => {
        this.props.msgfunc("error", error.toString());
      });
    }
    onUpdateCategory(event, updateCategory) {
      event.preventDefault();
      updateCategory().then(async ({ data }) => {
        this.setState({
          name: "",
          slug: "",
          description: "",
          _id: "",
          label_txt: "Add New Category",
          action: "add",
        }, () => {
          
          this.props.msgfunc("info", "Category Updated. Saved!");
        });
      }).catch(error => {
        this.props.msgfunc("error", error.toString());
    });
  }
  onEditAction(event, category) {
    event.preventDefault();
    this.setState({
      label_txt: "Edit Category",
      action: "edit",
      _id: category._id,
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
  }
  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {this.state.alert}
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <h5>{this.state.label_txt}</h5>
            {/* <h6>Name</h6> */}
            <CustomInput
              labelText="Name"
              id="name"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                placeholder: "Name",
                onChange: (event) => this.onNameChange(event),
                value: this.state.name,
              }}
            />
            <CustomInput
              labelText="Slug"
              id="slug"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Slug",
                onChange: (event) => this.onSlugChange(event),
                value: this.state.slug,
              }}
            />
            <FormControl
              fullWidth
              className={classes.selectFormControl}
            >
              <InputLabel
                htmlFor="simple-select"
                className={classes.selectLabel}
              >
                Parent Category
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.simpleSelect}
                onChange={this.handleSimple}
                inputProps={{
                  name: "simpleSelect",
                  id: "simple-select"
                }}
                >
                <MenuItem
                  // disabled
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="0"
                >
                  None
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="2"
                >
                  Uncategorized
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="3"
                >
                  Paris
                </MenuItem>
              </Select>
            </FormControl>
            <CustomInput
              labelText="Description"
              id="textarea-input"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                rows: 5,
                onChange: (event) => this.onDescriptionChange(event),
                value: this.state.description,
              }}
            />
            <If condition={this.state.action == "add"}>
              <Then>
              
                <Mutation mutation={ADD_CATEGORY} variables={{ name: this.state.name, slug: this.state.slug, description: this.state.description }} refetchQueries={[{ query: GET_CATEGORIES }]}>
                  {(addCategory, { loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (

                      <Button color="info" className={classes.marginRight} onClick={event => this.onAddCategory(event, addCategory)}>
                        Add New Category
                      </Button>
                    );
                  }}
                </Mutation>
              </Then>
              <Else>

                <Mutation mutation={UPDATE_CATEGORY} variables={{ _id: this.state._id, name: this.state.name, slug: this.state.slug, description: this.state.description }} refetchQueries={[{ query: GET_CATEGORIES }]}>
                  {(updateCategory, { loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (

                      <Button color="info" className={classes.marginRight} onClick={event => this.onUpdateCategory(event, updateCategory)}>
                        Update Category
                      </Button>
                    );
                  }}
                </Mutation>
              </Else>
            </If>
          </GridItem>
          <GridItem xs={12} sm={8} md={8}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Categories</h4>
              </CardHeader>
              <CardBody>
                <Query query={GET_CATEGORIES}>

                  {({ data, loading, error }) => {

                    if (loading) return <div></div>
                    if (error) return <div>Error</div>
                    
                    var categories = [];
                    var flag = 0;
                    data.categories.map(category => {
                      flag++;
                      categories.push([
                        flag,
                        category.name,
                        category.slug,
                        category.description,
                        [
                          <Button
                            color="success"
                            simple
                            className={classes.actionButton}
                            key={category._id + " "}
                            onClick={event => this.onEditAction(event, category)}
                          >
                            <Edit className={classes.icon} />
                          </Button>,
                          <Mutation mutation={DELETE_CATEGORY}
                            variables={{ _id: category._id }} refetchQueries={[{ query: GET_CATEGORIES }]} key={category._id}>
                            {(deleteCategory, { loading }) => {
                              return (

                                <Button
                                  color="danger"
                                  simple
                                  className={classes.actionButton}
                                  // key={category._id}
                                  onClick={() => {
                                    this.warningWithConfirmMessage(deleteCategory)
                                  }}
                                  // onClick={() => {
                                  //   deleteCategory().then(async () => {
                                  //     console.log('Deleted!');
                                  //   }).catch(() => {
                                  //     console.log("error!");
                                  //   });
                                  // }}
                                >
                                  <Close className={classes.icon} />
                                </Button>
                              );
                            }}
                          </Mutation>
                        ]
                      ]);
                    });
                    return (

                      <Table
                        striped
                        tableHead={[
                          "#",
                          "Name",
                          "Slug",
                          "Description",
                          "Action"
                        ]}

                        tableData={categories}
                        customCellClasses={[
                          classes.center,
                          classes.right,
                        ]}
                        customClassesForCells={[0, 4]}
                        customHeadCellClasses={[
                          classes.center,
                          classes.right,
                        ]}
                        customHeadClassesForCells={[0, 4]}
                      />
                    );
                  }}
                </Query>
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

export default withStyles(extendedTablesStyle)(Categories);