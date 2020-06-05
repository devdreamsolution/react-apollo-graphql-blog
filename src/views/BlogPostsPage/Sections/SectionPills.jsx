import React, { Component }from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
import TrendingUp from "@material-ui/icons/TrendingUp";

// core components
import { Link } from "react-router-dom";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Paginations from "components/Pagination/Pagination.jsx";

import Info from "components/Typography/Info.jsx";
import Danger from "components/Typography/Danger.jsx";
import Success from "components/Typography/Success.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

import office2 from "assets/img/examples/office2.jpg";
import blog8 from "assets/img/examples/blog8.jpg";
import cardProject6 from "assets/img/examples/card-project6.jpg";
import cardBlog4 from "assets/img/examples/card-blog4.jpg";
import sectionPillsStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.jsx";
import { GET_PUBLISH_POSTS, GET_CATEGORIES, GET_USER } from "queries";
import { Query } from 'react-apollo';

import defaultImage from "assets/img/image_placeholder.jpg";

class SectionPills extends Component {
  showPosts(){
    const { classes } = this.props;
    const { posts, postsLoading } = this.props;
    return (
      <Query query={GET_PUBLISH_POSTS}>
        {({ data, loading, error }) => {
            if (loading) return <div></div>
            if (error) return <div>Error</div>
            
            if(!loading) {
              if(data.publishPosts.length > 0){
                return data.publishPosts.map(post => {
                  var date = new Date(Number(post.updateDate));
                  
                  return (
                  <Card key={post._id} plain blog className={classes.card}>
                    <GridContainer>
                      <GridItem xs={12} sm={2} md={2}>
                        <CardHeader image plain>
                          {/* <a href="post" onClick={e => e.preventDefault()}> */}
                          <a href={`post/${post._id}`}>
                              <img src={post.postImage ? post.postImage : defaultImage} alt="..." />
                          </a>
                          <div
                            className={classes.coloredShadow}
                            style={{
                              backgroundImage: `url(${post.postImage ? post.postImage : defaultImage})`,
                              opacity: "1"
                            }}
                          />
                          <div
                            className={classes.coloredShadow}
                            style={{
                              backgroundImage: `url(${post.postImage ? post.postImage : defaultImage})`,
                              opacity: "1"
                            }}
                          />
                        </CardHeader>
                      </GridItem>
                      <GridItem xs={12} sm={10} md={10} style={{marginTop:-15}}>
                        <h3 className={classes.cardTitle}>
                          {/* <a href="/post" onClick={e => e.preventDefault()}> */}
                          <a href={`post/${post._id}`}>
                            {post.title}
                          </a>
                        </h3>
                        <p className={classes.description}>
                          Subtitle
                          <a href={`post/${post._id}`}>
                            {" "}
                            Read More{" "}
                          </a>
                        </p>
                        <p className={classes.author}>
                          by{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <Query query={GET_USER} variables={{ author_id: post.author_id }}>
                              {({ data, loading, error }) => {
                                if (loading) return <div></div>
                                if (error) return <div>Error</div>
                                return <b>{data.getUser.userName}</b>;
                              }}
                            </Query>
                          </a>{" "}
                          , {date.toUTCString()}
                        </p>
                      </GridItem>
                    </GridContainer>
                  </Card>
                  );
                });
              }
            }
        }}
      </Query>
    );
  }
  render(){
  const { classes } = this.props;
  return (
    <div className={classes.section} style={{paddingTop:0}}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
          
          <Query query={GET_CATEGORIES}>

            {({ data, loading, error }) => {
              
              if (loading) return <div></div>
              if (error) return <div>Error</div>
              
              var tabs = [{ tabButton: "All", tabContent: "" }];
              data.categories.map(category => {
                tabs.push({tabButton: category.name, tabContent: ""});
              })
              return (

                <NavPills
                  alignCenter
                  tabs={tabs}
                />
              );
            }}
          </Query>

        </GridItem>
      </GridContainer>
      <div className={classes.blog}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              className={`${classes.mlAuto} ${classes.mrAuto}`}
            >
            {this.showPosts()}
            </GridItem>
              <div>
                <Paginations
                  className={`${classes.textCenter} ${
                    classes.justifyContentCenter
                  }`}
                  pages={[
                    { text: "«" },
                    { text: 1 },
                    { text: 2 },
                    { active: true, text: 3 },
                    { text: 4 },
                    { text: 5 },
                    { text: "»" }
                  ]}
                  color="primary"
                />
              </div>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
}
export default withStyles(sectionPillsStyle)(SectionPills);
