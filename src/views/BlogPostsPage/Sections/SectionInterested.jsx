import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { GET_PUBLISH_POSTS } from "queries";
import { Query } from 'react-apollo';

// @material-ui/icons
import TrendingUp from "@material-ui/icons/TrendingUp";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Info from "components/Typography/Info.jsx";
import Success from "components/Typography/Success.jsx";
import Danger from "components/Typography/Danger.jsx";

import bg5 from "assets/img/bg5.jpg";
import blog5 from "assets/img/examples/blog5.jpg";
import blog6 from "assets/img/examples/blog6.jpg";
import defaultImage from "assets/img/image_placeholder.jpg";

import sectionInterestedStyle from "assets/jss/material-kit-pro-react/views/blogPostsSections/sectionInterestedStyle.jsx";



function SectionInterested({ ...props }) {
  const { classes } = props;
  return (
    <div className={classes.section}>
      <h3 className={classes.title + " " + classes.textCenter}>
        Latest Blogs
      </h3>
      <br />
      <Query query={GET_PUBLISH_POSTS}>
        {({ data, loading, error }) => {
          if (loading) return <div></div>
          if (error) return <div>Error</div>
          return (
            
            <GridContainer>
              <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
                <Card plain blog>
                  <CardHeader image plain>
                    <a href={`post/${data.publishPosts[0]._id}`}>
                      <img src={data.publishPosts[0].postImage ? data.publishPosts[0].postImage: defaultImage} alt="..." style={{ height: "230px" }}/>
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${data.publishPosts[0].postImage ? data.publishPosts[0].postImage : defaultImage})`,
                        opacity: "1",
                      }}
                    />
                  </CardHeader>
                  <CardBody plain>
                    <Info>
                      <h6>ENTERPRISE</h6>
                    </Info>
                    <h4 className={classes.cardTitle}>
                      <a href={`post/${data.publishPosts[0]._id}`}>
                        {data.publishPosts[0].title}
                      </a>
                    </h4>
                    <p className={classes.description}>
                      Like so many organizations these days, Autodesk is a company in
                      transition. It was until recently a traditional boxed software
                      company selling licenses.
                      <a href={`post/${data.publishPosts[0]._id}`}> Read More </a>
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
                <Card plain blog>
                  <CardHeader plain image>
                    <a href={`post/${data.publishPosts[1]._id}`}>
                      <img src={data.publishPosts[1].postImage ? data.publishPosts[1].postImage : defaultImage} alt="..." style={{ height: "230px" }}/>
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${data.publishPosts[1].postImage ? data.publishPosts[1].postImage : defaultImage})`,
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                  <CardBody plain>
                    <Success>
                      <h6>STARTUPS</h6>
                    </Success>
                    <h4 className={classes.cardTitle}>
                      <a href={`post/${data.publishPosts[1]._id}`}>
                        {data.publishPosts[1].title}
                      </a>
                    </h4>
                    <p className={classes.description}>
                      Like so many organizations these days, Autodesk is a company in
                      transition. It was until recently a traditional boxed software
                      company selling licenses.
                      <a href={`post/${data.publishPosts[1]._id}`}> Read More </a>
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4} lg={4} xl={4}>
                <Card plain blog>
                  <CardHeader plain image>
                    <a href={`post/${data.publishPosts[2]._id}`}>
                      <img src={data.publishPosts[2].postImage ? data.publishPosts[2].postImage : defaultImage} alt="..." style={{ height: "230px" }}/>
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${data.publishPosts[2].postImage ? data.publishPosts[2].postImage : defaultImage})`,
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                  <CardBody plain>
                    <Danger>
                      <h6>
                        <TrendingUp /> ENTERPRISE
                      </h6>
                    </Danger>
                    <h4 className={classes.cardTitle}>
                      <a href={`post/${data.publishPosts[2]._id}`}>
                        {data.publishPosts[2].title}
                      </a>
                    </h4>
                    <p className={classes.description}>
                      Like so many organizations these days, Autodesk is a company in
                      transition. It was until recently a traditional boxed software
                      company selling licenses.
                      <a href={`post/${data.publishPosts[2]._id}`}> Read More </a>
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          );
        }}
      </Query>
    </div>
  );
}

export default withStyles(sectionInterestedStyle)(SectionInterested);
