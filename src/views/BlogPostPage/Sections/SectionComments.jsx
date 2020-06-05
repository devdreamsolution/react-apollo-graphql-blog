import React, { Component } from "react";
import {If, Then, Else} from 'react-if' 
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import { ADD_COMMENT, GET_POST, GET_USER } from "queries";
import { Query, Mutation } from 'react-apollo';
// @material-ui/icons
import Reply from "@material-ui/icons/Reply";
import Favorite from "@material-ui/icons/Favorite";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Media from "components/Media/Media.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import profile4 from "assets/img/faces/card-profile4-square.jpg";
import profile1 from "assets/img/faces/card-profile1-square.jpg";
import profile6 from "assets/img/faces/card-profile6-square.jpg";

import sectionCommentsStyle from "assets/jss/material-kit-pro-react/views/blogPostSections/sectionCommentsStyle.jsx";
import * as Cookies from 'es-cookie';

import defaultAvatar from "assets/img/placeholder.jpg";

class SectionComments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      id: this.props._id._id,
      comments: [],
      query_check: false,
    }
    this.onContentChange = this.onContentChange.bind(this);
  }
  onContentChange(event) {
    event.preventDefault();
    this.setState({
      content: event.target.value
    });
  }
  onAddComment(event, addComment) {
    if (Cookies.get('user') == undefined) {
      this.props.msgfunc("warning", 'Please Signin...');
    } else {
      if (this.state.content == '') {
        this.props.msgfunc("warning", "Enter content of comment...");
      } else {
        
        event.preventDefault();
        addComment().then(async () => {
          this.props.msgfunc("success", "We have added your comment. Saved!");
          let tmp = this.state.comments;
          tmp.push({ author: Cookies.get('user'), content: this.state.content, post_id: this.props._id._id, createDate: Date.now() });
          this.setState({
            comments: tmp,
            content: ''
          });
        }).catch(() => {
          console.log("error!");
        });
      }
    }
  }
  render() {
    const { classes } = this.props;
    let _id = this.state.id;
    return (
      <Query query={GET_POST} variables={{ _id }}>
        {({ data, loading, error }) => {

          if (loading) return <div></div>
          if (error) return `Error! ${error.message}`

          const comments = data.post.comments;
          if (!this.state.query_check) {
            this.setState({
              query_check: true,
              comments: comments
            });
          }

          return (
            <Mutation mutation={ADD_COMMENT} variables={{ author: Cookies.get('user'), content: this.state.content, post_id: this.props._id._id }}>
              {(addComment, { loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                
                return (
                  <div className={classes.section}>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={10} md={8}>
                        <div>
                          <h3 className={classes.title}>{ this.state.comments.length } Comments</h3>
                          {this.state.comments.map(comment => {
                            var createDate = new Date(Number(comment.createDate));

                            return (
                              <Query query={GET_USER} variables={{ author_id: comment.author }}>
                                {({ data, loading, error }) => {

                                  if (loading) return <div></div>
                                  if (error) return `Error! ${error.message}`

                                  return (
                                    <Media
                                      avatar={data.getUser.profileImage}
                                      title={
                                        <span>
                                          {data.getUser.userName} <small>· { createDate.toUTCString() }</small>
                                        </span>
                                      }
                                      body={
                                        <p className={classes.color555}>
                                          { comment.content }
                                        </p>
                                      }
                                      footer={
                                        <div>
                                          <Tooltip
                                            id="tooltip-tina"
                                            title="Reply to comment"
                                            placement="top"
                                            classes={{ tooltip: classes.tooltip }}
                                          >
                                            <Button
                                              color="primary"
                                              simple
                                              className={classes.footerButtons}
                                            >
                                              <Reply className={classes.footerIcons} /> Reply
                                            </Button>
                                          </Tooltip>
                        
                                          <Button
                                            color="danger"
                                            simple
                                            className={classes.footerButtons}
                                          >
                                            <Favorite className={classes.footerIcons} /> 243
                                          </Button>
                                        </div>
                                      }
                                    />
                                  );

                                }}
                              </Query>
                            );
                          })
                          }
                          {/* <Media
                            avatar={profile1}
                            title={
                              <span>
                                John Camber <small>· Yesterday</small>
                              </span>
                            }
                            body={
                              <span className={classes.color555}>
                                <p>
                                  Hello guys, nice to have you on the platform! There will be
                                  a lot of great stuff coming soon. We will keep you posted
                                  for the latest news.
                                </p>
                                <p>Don't forget, You're Awesome!</p>
                              </span>
                            }
                            footer={
                              <div>
                                <Tooltip
                                  id="tooltip-john"
                                  title="Reply to comment"
                                  placement="top"
                                  classes={{ tooltip: classes.tooltip }}
                                >
                                  <Button
                                    color="primary"
                                    simple
                                    className={classes.footerButtons}
                                  >
                                    <Reply className={classes.footerIcons} /> Reply
                                  </Button>
                                </Tooltip>
              
                                <Button link className={classes.footerButtons}>
                                  <Favorite className={classes.footerIcons} /> 25
                                </Button>
                              </div>
                            }
                            innerMedias={[
                              <Media
                                key={Date.now()}
                                avatar={profile4}
                                title={
                                  <span>
                                    Tina Andrew <small>· 12 Hours Ago</small>
                                  </span>
                                }
                                body={
                                  <span className={classes.color555}>
                                    <p>
                                      Hello guys, nice to have you on the platform! There will
                                      be a lot of great stuff coming soon. We will keep you
                                      posted for the latest news.
                                    </p>
                                    <p>Don't forget, You're Awesome!</p>
                                  </span>
                                }
                                footer={
                                  <Tooltip
                                    id="tooltip-tina2"
                                    title="Reply to comment"
                                    placement="top"
                                    classes={{ tooltip: classes.tooltip }}
                                  >
                                    <Button
                                      color="primary"
                                      simple
                                      className={classes.footerButtons}
                                    >
                                      <Reply className={classes.footerIcons} /> Reply
                                    </Button>
                                  </Tooltip>
                                }
                              />
                            ]}
                          /> */}
                        </div>
                        <h3 className={classes.title}>Post your comment</h3>
                        <If condition={Cookies.get('user') == undefined}>
                          <Then>
                            <Media
                              avatar={defaultAvatar}
                              body={
                                <CustomInput
                                  labelText=" Write some nice stuff or nothing..."
                                  id="nice"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    multiline: true,
                                    onChange: (event) => this.onContentChange(event),
                                    rows: 5
                                  }}
                                />
                              }
                              footer={
                                <Button color="primary" round className={classes.footerButtons} onClick={event => this.onAddComment(event, addComment)}>
                                  Post comment
                                      </Button>
                              }
                            />
                          </Then>
                          <Else>

                            <Query query={GET_USER} variables={{ author_id: Cookies.get('user') }}>
                              {({ data, loading, error }) => {

                                if (loading) return <div></div>
                                if (error) return `Error! ${error.message}`

                                return (

                                  <Media
                                    avatar={data.getUser.profileImage ? data.getUser.profileImage : defaultAvatar}
                                    body={
                                      <CustomInput
                                        labelText=" Write some nice stuff or nothing..."
                                        id="nice"
                                        formControlProps={{
                                          fullWidth: true
                                        }}
                                        inputProps={{
                                          multiline: true,
                                          onChange: (event) => this.onContentChange(event),
                                          rows: 5
                                        }}
                                      />
                                    }
                                    footer={
                                      <Button color="primary" round className={classes.footerButtons} onClick={event => this.onAddComment(event, addComment)}>
                                        Post comment
                                      </Button>
                                    }
                                  />
                                );
                              }}
                            </Query>
                          </Else>
                        </If>
                      </GridItem>
                    </GridContainer>
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(sectionCommentsStyle)(SectionComments);
