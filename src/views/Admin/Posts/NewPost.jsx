import React, { Component } from 'react';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { ADD_POST, GET_POSTS, GET_AUTHOR_POSTS, GET_CATEGORIES } from "queries";
import { Query, Mutation } from 'react-apollo';
import withAuth from '../../../hoc/withAuth';

import Header from "components/Front/Header/Header.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TagsInput from "react-tagsinput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";
import newPostStyle from "assets/jss/material-dashboard-pro-react/views/admin/newPostStyle.jsx";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as Cookies from 'es-cookie';

import defaultImage from "assets/img/image_placeholder.jpg";

const styles = {
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px"
    }
  };

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
class NewPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      tags:[],
      classicModal: false,
      noticeModal: false,
      smallModal: false,
      publish: true,
      checked: [],
      postImage: "",
      slug: "",
    }
    this.handleTags = this.handleTags.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onUnpublish = this.onUnpublish.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  // componentDidMount(){
  //   console.log(this.state.title);
  // }
  onPostImage(file) {
    this.setState({
      postImage: file
    });
  }
  handleToggle(event, value) {
    event.preventDefault();
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
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  onTitleChange(event) {
    event.preventDefault();
    this.setState({
      title:event.target.value
    });
  }
  onSlugChange(event) {
    event.preventDefault();
    this.setState({
      slug:event.target.value
    });
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleTags(regularTags) {
    this.setState({ tags: regularTags });
  }
  onUnpublish(event, addPost) {
    event.preventDefault();
    this.setState({ publish: false }, () => { 

      addPost().then(async () => {
        this.props.msgfunc("info", "We have saved your post in draft!");
        this.props.history.push('/edit-posts/posts');
        
      }).catch((error) => {
        this.props.msgfunc("danger", error.toString());
      });
    });
  }
  onPublish(event, addPost) {
    event.preventDefault();
    this.setState({ publish: true }, () => {
      
      addPost().then(async () => {
        this.props.msgfunc("success", "We have published your post,Published!");
        this.props.history.push('/edit-posts/posts');
        
      }).catch((error) => {
        this.props.msgfunc("danger", error.toString());
      });
    });
  }
  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    return (
      <Mutation mutation={ADD_POST} variables={{ author_id: Cookies.get('user'), title: this.state.title, content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())), publish: this.state.publish, tags: this.state.tags, categories: this.state.checked, postImage: this.state.postImage, slug: this.state.slug }} refetchQueries={[{ query: GET_POSTS }, { query: GET_AUTHOR_POSTS, variables: { author_id: Cookies.get('user') } }]}>
        {(addPost, { loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          
          return (
            <div>
              <Header
                brand=""
                color="primary"
                links={
                  <List className={classes.list + " " + classes.mlAuto}>
                    <ListItem className={classes.listItem}>
                      <Button type="button" color="transparent" className={classes.navLink} onClick={event => this.onUnpublish(event, addPost)}>
                          Save Draft
                      </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Button type="button" color="transparent" className={classes.navLink}
                        onClick={event => this.onPublish(event, addPost)}
                      >
                          Publish
                      </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <Button type="button" color="transparent" className={classes.navLink}>
                          Settings
                      </Button>
                    </ListItem>
                  </List>
                }
              />
              <GridContainer>
                <GridItem xs={12} sm={10} md={10}>
                  <CustomInput
                    id="title"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      placeholder: "Add Title",
                      onChange:(event)=>this.onTitleChange(event)
                    }}
                  />
                  <CustomInput
                    id="slug"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      placeholder: "slug",
                      onChange: (event) => this.onSlugChange(event)
                    }}
                  />
                  <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={2} md={2}>
                  
                  <div>
                    <h3>Categories</h3>
                  </div>
                  <Query query={GET_CATEGORIES}>

                    {({ data, loading, error }) => {

                      if (loading) return <div></div>
                      if (error) return <div>Error</div>

                      return (
                        data.categories.map(category => {
                          return (

                            <div>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    tabIndex={category._id}
                                    onChange={event => this.handleToggle(event,category._id)}
                                    // onClick={() => this.handleToggle(21)}
                                    // checkedIcon={<Check className={classes.checkedIcon} />}
                                    // icon={<Check className={classes.uncheckedIcon} />}
                                    // classes={{
                                    //   checked: classes.checked,
                                    //   root: classes.checkRoot
                                    // }}
                                  />
                                }
                                // classes={{ label: classes.label }}
                                label={category.name}
                              />
                            </div>
                          );
                        })
                      );
                    }}
                  </Query>
                  <div>
                    <h3>Tags</h3>
                  </div>
                  <TagsInput
                    value={this.state.tags}
                    onChange={this.handleTags}
                    tagProps={{ className: "react-tagsinput-tag primary" }}
                  />
                  <div>
                    <ImageUpload
                      style="image"
                      image={defaultImage}
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
                      getImage={this.onPostImage.bind(this)}
                      msgfunc={this.props.msgfunc}
                    />
                  </div>
                </GridItem>
                {/* <textarea
                  disabled
                  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> */}
              </GridContainer>
            </div>
          );
        }}
      </Mutation>
    );

  }
}

export default withAuth(session => session && session.getCurrentUser)(withStyles(newPostStyle)(NewPost));