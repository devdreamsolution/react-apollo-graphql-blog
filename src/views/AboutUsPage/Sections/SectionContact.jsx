import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import contactStyle from "assets/jss/material-kit-pro-react/views/aboutUsSections/contactStyle.jsx";

class SectionContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      specialitySelect: "1"
    };
  }
  handleSpeciality = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.aboutUs}>
        <GridContainer>
          <GridItem
            md={8}
            sm={8}
            className={classNames(classes.mrAuto, classes.mlAuto)}
          >
            <h2 className={classNames(classes.title, classes.textCenter)}>
              Want to work with us?
            </h2>
            <h4 className={classNames(classes.description, classes.textCenter)}>
              Divide details about your product or agency work into parts. Write
              a few lines about each one and contact us about any further
              collaboration. We will get back to you in a couple of hours.
            </h4>
            <form>
              <GridContainer>
                <GridItem md={4} sm={4}>
                  <CustomInput
                    labelText="Your name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={4} sm={4}>
                  <CustomInput
                    labelText="Your email"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem md={4} sm={4}>
                  <FormControl
                    fullWidth
                    className={`${classes.selectFormControl} ${
                      classes.selectUnderlineRoot
                    }`}
                  >
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={this.state.specialitySelect}
                      onChange={this.handleSpeciality}
                      inputProps={{
                        name: "specialitySelect",
                        id: "speciality-select"
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Speciality
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="1"
                      >
                        I'm a Designer
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="2"
                      >
                        I'm a Developer
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected
                        }}
                        value="3"
                      >
                        I'm a Hero
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem
                  md={4}
                  sm={4}
                  className={classNames(
                    classes.mrAuto,
                    classes.mlAuto,
                    classes.textCenter
                  )}
                >
                  <Button color="primary" round>
                    Let's talk
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(contactStyle)(SectionContact);
