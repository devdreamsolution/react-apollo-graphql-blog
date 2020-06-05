import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { GET_USER, GET_POST, POST_LIKE } from "queries";
import { Query, Mutation } from 'react-apollo';
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Badge from "components/Badge/Badge.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import Favorite from "@material-ui/icons/Favorite";

import sectionBlogInfoStyle from "assets/jss/material-kit-pro-react/views/blogPostSections/sectionBlogInfoStyle.jsx";


class SectionBlogInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      like_count : -1
    }
  }
  onPostLIke(event, postLike) {
    event.preventDefault();
    postLike().then(async () => {
      this.setState({
        like_count: ++this.state.like_count
      });
      console.log('OK!');
    }).catch(() => {
      console.log("error!");
    });
  }
  render () {

    const { classes } = this.props;

    let _id = this.props._id._id;
    
    return (
      <Query query={GET_POST} variables={{ _id }}>
        {({ data, loading, error }) => {
          
          if (loading) return <div></div>
          if (error) return `Error! ${error.message}`
          if (this.state.like_count == -1) {
            this.setState({
              like_count: data.post.like_count
            });
          }
          let author_id = data.post.author_id;
          var like_count = this.state.like_count;
          var tags = data.post.tags;
          return (
            <Query query={GET_USER} variables={{ author_id }}>
              {({ data, loading, error }) => {
                
                if (loading) return <div></div>
                if (error) return `Error! ${error.message}`
                
                var userName = data.getUser.userName;
                var profileImage = data. getUser.profileImage;
                return (
                  <Mutation mutation={POST_LIKE} variables={{ _id: _id, like_count: like_count + 1 }}>
                    {(postLike, { loading, error, data }) => {

                      if (loading) return <div></div>
                      if (error) return `Error! ${error.message}`

                      return (
                        <div className={classes.section}>
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={10} md={8}>
                              <GridContainer>
                                <GridItem xs={12} sm={10} md={10}>
                                  <div className={classes.blogTags}>
                                    Tags:
                                    {tags.map(tag => {
                                      return (

                                        <Badge color="primary">{tag}</Badge>
                                      );  
                                    })}
                                  </div>
                                </GridItem>
                                <GridItem xs={12} sm={2} md={2}>
                                  <Button
                                    color="danger"
                                    simple
                                    className={classes.footerButtons}
                                    onClick={event => this.onPostLIke(event, postLike)}
                                  >
                                    <Favorite className={classes.footerIcons} /> {like_count}
                                  </Button>
                                  {/* <Button color="google" round className={classes.buttons}>
                                    <i className="fab fa-google" /> 232
                                  </Button>
                                  <Button color="twitter" round className={classes.buttons}>
                                    <i className="fab fa-twitter" /> 910
                                  </Button>
                                  <Button color="facebook" round className={classes.buttons}>
                                    <i className="fab fa-facebook-square" /> 872
                                  </Button> */}
                                </GridItem>
                              </GridContainer>
                              <hr />
                              <Card plain profile className={classes.card}>
                                <GridContainer>
                                  <GridItem xs={12} sm={2} md={2}>
                                    <CardAvatar plain profile>
                                      <img src={profileImage} alt="..." />
                                    </CardAvatar>
                                  </GridItem>
                                  <GridItem xs={12} sm={8} md={8}>
                                    <h4 className={classes.cardTitle}>{userName}</h4>
                                    <p className={classes.description}>
                                      I've been trying to figure out the bed design for the master
                                      bedroom at our Hidden Hills compound...I like good music from
                                      Youtube.
                                    </p>
                                  </GridItem>
                                  <GridItem xs={12} sm={2} md={2}>
                                    <Button round className={classes.pullRight}>
                                      Follow
                                    </Button>
                                  </GridItem>
                                </GridContainer>
                              </Card>
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
        }}
      </Query>
    );


  }
}

export default withStyles(sectionBlogInfoStyle)(SectionBlogInfo);
