import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import { GET_USER, EDIT_PROFILE } from "queries";
import { Query, Mutation } from 'react-apollo';
import * as Cookies from 'es-cookie';


import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";

import defaultAvatar from "assets/img/placeholder.jpg";

class UserProfile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userNameState: "",
      firstName: "",
      firstNameState: "",
      lastName: "",
      lastNameState: "",
      email: "",
      emailState: "",
      profileImage: "",
      aboutme: "",
      aboutmeState: "",
    };
  }

  onUserNameChange(event) {
    event.preventDefault();
    this.setState({
      userName: event.target.value
    });
  }
  onFirstNameChange(event) {
    event.preventDefault();
    this.setState({
      firstName: event.target.value
    });
  }
  onLastNameChange(event) {
    event.preventDefault();
    this.setState({
      lastName: event.target.value
    });
  }
  onEmailChange(event) {
    event.preventDefault();
    this.setState({
      email: event.target.value
    });
  }
  onAboutmeChange(event) {
    event.preventDefault();
    this.setState({
      aboutme:event.target.value
    });
  }
  onProfileImage(file) {
    this.setState({
      profileImage: file
    });
  }
  onUpdateProfile(event, editProfile) {
    event.preventDefault();
    editProfile().then(async () => {
      this.props.msgfunc("success", "We have updated your post. Saved!");
    }).catch((error) => {
      this.props.msgfunc("danger", error.toString());
    });
  }

  render () {

    const { classes } = this.props;
    return (
      <Query query={GET_USER} variables={{ author_id: Cookies.get('user') }}>
        {({ data, loading, error }) => {

          if (loading) return <div></div>
          if (error) return `Error! ${error.message}`

          return (

            <div>
              <GridContainer>
                <Mutation mutation={EDIT_PROFILE}
                  variables={{ _id: Cookies.get('user'), userName: (this.state.userName != '') ? this.state.userName : data.getUser.userName, firstName: (this.state.firstName != '') ? this.state.firstName : data.getUser.firstName, lastName: (this.state.lastName != '') ? this.state.lastName : data.getUser.lastName, email: (this.state.email != '') ? this.state.email : data.getUser.email, aboutme: (this.state.aboutme != '') ? this.state.aboutme : data.getUser.aboutme, profileImage: (this.state.profileImage != '') ? this.state.profileImage : data.getUser.profileImage }} refetchQueries={[{ query: GET_USER, variables: { author_id: Cookies.get('user') } }]}>
                  {(editProfile, { loading }) => {
                    return (

                      <GridItem xs={12} sm={12} md={8}>
                        <Card>
                          <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                              <PermIdentity />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>
                              My Profile - <small>Complete your profile</small>
                            </h4>
                          </CardHeader>
                          <CardBody>
                            <GridContainer>
                              {/* <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                  labelText="Company (disabled)"
                                  id="company-disabled"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    disabled: true
                                  }}
                                />
                              </GridItem> */}
                              <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                  labelText="Username"
                                  id="username"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.onUserNameChange(event),
                                    value: data.getUser.userName,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={5}>
                                <CustomInput
                                  labelText="Email address"
                                  id="email-address"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.onEmailChange(event),
                                    value: data.getUser.email,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={4} md={2}>
                                <ImageUpload
                                  style="avatar"
                                  image={data.getUser.profileImage}
                                  addButtonProps={{
                                    color: "rose",
                                    round: true
                                  }}
                                  changeButtonProps={{
                                    color: "rose",
                                    round: true
                                  }}
                                  removeButtonProps={{
                                    color: "danger",
                                    round: true
                                  }}
                                  getImage={this.onProfileImage.bind(this)}
                                  msgfunc={this.props.msgfunc}
                                />
                              </GridItem>
                            </GridContainer>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="First Name"
                                  id="first-name"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.onFirstNameChange(event),
                                    value: data.getUser.firstName,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Last Name"
                                  id="last-name"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.onLastNameChange(event),
                                    value: data.getUser.lastName,
                                  }}
                                />
                              </GridItem>
                            </GridContainer>
                            {/* <GridContainer>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="City"
                                  id="city"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="Country"
                                  id="country"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                  labelText="Postal Code"
                                  id="postal-code"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                />
                              </GridItem>
                            </GridContainer> */}
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>
                                <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                                <CustomInput
                                  id="about-me"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    onChange: (event) => this.onAboutmeChange(event),
                                    value: data.getUser.aboutme,
                                    multiline: true,
                                    rows: 5
                                  }}
                                />
                              </GridItem>
                            </GridContainer>
                            <Button color="rose" className={classes.updateProfileButton} onClick={event => this.onUpdateProfile(event, editProfile)}>
                              Update Profile
                            </Button>
                            <Clearfix />
                          </CardBody>
                        </Card>
                      </GridItem>
                    );
                  }}
                </Mutation>
                <GridItem xs={12} sm={12} md={4}>
                  <Card profile>
                    <CardAvatar profile>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={data.getUser.profileImage ? data.getUser.profileImage : defaultAvatar} alt="..." />
                      </a>
                    </CardAvatar>
                    <CardBody profile>
                      <h6 className={classes.cardCategory}>{data.getUser.userName}</h6>
                          <h4 className={classes.cardTitle}>{data.getUser.firstName} {data.getUser.lastName}</h4>
                      <p className={classes.description}>
                        {data.getUser.aboutme}
                      </p>
                      {/* <Button color="rose" round>
                        Follow
                      </Button> */}
                    </CardBody>
                  </Card>
                  <Card profile>
                    <CardBody profile>
                      <h6 className={classes.cardCategory}>{this.state.userName}</h6>
                      <h4 className={classes.cardTitle}>{this.state.firstName} {this.state.lastName}</h4>
                      <p className={classes.description}>
                        {this.state.aboutme}
                      </p>
                      {/* <Button color="rose" round>
                        Follow
                      </Button> */}
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(userProfileStyles)(UserProfile);
