import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import FormatAlignLeft from "@material-ui/icons/FormatAlignLeft";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Front/Header/Header.jsx";
import HeaderLinks from "components/Front/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import AddAlert from "@material-ui/icons/AddAlert";
// sections for this page
import SectionText from "./Sections/SectionText.jsx";
import SectionBlogInfo from "./Sections/SectionBlogInfo.jsx";
import SectionComments from "./Sections/SectionComments.jsx";
import SectionSimilarStories from "./Sections/SectionSimilarStories.jsx";

import blogPostPageStyle from "assets/jss/material-kit-pro-react/views/blogPostPageStyle.jsx";
// import { GET_POST } from "../../providers/posts/GetPost.js";
import {GET_POST} from "queries";
import { Query } from 'react-apollo';

import defaultImage from "assets/img/image_placeholder.jpg";


class BlogPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ntf_color: "",
      ntf_msg: "",
      ntf_action: false,
    }
  }
  showNotification(ntf_color, ntf_msg) {
    this.setState({
      ntf_color: ntf_color,
      ntf_msg: ntf_msg,
      ntf_action: true,
    });
    setTimeout(
      function () {
        this.setState({
          ntf_color: '',
          ntf_msg: '',
          ntf_action: false,
        });
      }.bind(this),
      6000
    );
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.body.style.overflow = "unset";
  }
  smoothScroll(target) {
    var targetScroll = document.getElementById(target);
    console.log(target);
    console.log(targetScroll.offsetTop);
    this.scrollTo(document.documentElement, targetScroll.offsetTop, 900);
  }
  scrollTo(element, to, duration) {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = this.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    }.bind(this);
    animateScroll();
  }
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  render() {
    console.log(this.props);
    const { classes } = this.props;
    // const userName = this.props.match.params.URL_Param;
    let pathname=this.props.location.pathname;
    const _id = pathname.substr(pathname.lastIndexOf("/")+1);
    return (
      <div>
        <Snackbar
          place="tr"
          color={this.state.ntf_color}
          icon={AddAlert}
          message={this.state.ntf_msg}
          open={this.state.ntf_action}
          closeNotification={() => this.setState({ ntf_action: false })}
          close
        />
        <Header
          brand="Material Kit PRO React"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 300,
            color: "info"
          }}
        />
        <Query query={GET_POST} variables={{ _id }}>

        {({ data, loading, error }) => {

          if (loading) return <div></div>
          if (error) return <div>Error</div>
          
          console.log("post: ",data);
          return (
        <Parallax image={data.post.postImage ? data.post.postImage : defaultImage} filter="dark">
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem md={8} className={classes.textCenter}>
                <h1 className={classes.title}>
                  {data.post.title}
                </h1>
                <h4 className={classes.subtitle}>
                  Sub title
                </h4>
                <br />
                <a
                  href="#sectionText"
                  data-number="3"
                  className=""
                  onClick={e => {
                    e.preventDefault();
                    this.smoothScroll("main");
                  }}
                >
                  <Button color="rose" size="lg" round>
                    <FormatAlignLeft /> Read Article
                  </Button>
                </a>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        )

      }}

    </Query>
        <div className={classes.main} id="main">
          <div className={classes.container}>
          <Query query={GET_POST} variables={{ _id }}>

{({ data, loading, error }) => {

  if (loading) return <div></div>
  if (error) return <div>Error</div>

  return (
            <SectionText title={data.post.title} content={data.post.content} />
            )

      }}

    </Query>
            <SectionBlogInfo _id={{ _id }}/>
            <SectionComments _id={{ _id }} msgfunc={this.showNotification.bind(this)}/>
          </div>
        </div>
        {/* <SectionSimilarStories /> */}
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a href="https://www.creative-tim.com">Creative Tim</a> for a
                better web.
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(blogPostPageStyle)(BlogPostPage);
