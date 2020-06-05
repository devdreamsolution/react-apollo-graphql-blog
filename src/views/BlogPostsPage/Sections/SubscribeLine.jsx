import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Mail from "@material-ui/icons/Mail";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import sectionSubscribeLineStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionSubscribeLineStyle.jsx";

function SubscribeLine({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <h3 className={classes.title}>Get Tips & Tricks every Week!</h3>
            <p className={classes.description}>
              Join our newsletter and get news in your inbox every week! We hate
              spam too, so no worries about this.
            </p>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card plain className={classes.cardClasses}>
              <CardBody formHorizontal plain>
                <form>
                  <GridContainer>
                    <GridItem
                      xs={12}
                      sm={8}
                      md={8}
                      className={classes.alignItemsCenter}
                    >
                      <CustomInput
                        id="subscribe"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.formControl
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Mail className={classes.icon} />
                            </InputAdornment>
                          ),
                          placeholder: "Your Email..."
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <Button round block color="primary">
                        Subscribe
                      </Button>
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default withStyles(sectionSubscribeLineStyle)(SubscribeLine);
