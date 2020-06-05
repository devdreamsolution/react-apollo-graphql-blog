import React, { Component } from 'react';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { withAddPost } from 'providers/posts';
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
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

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
// import draftToHtml from 'draftjs-to-html';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx";
import newPostStyle from "assets/jss/material-dashboard-pro-react/views/admin/newPostStyle.jsx";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { GET_POST, UPDATE_POST, GET_POSTS, GET_AUTHOR_POSTS, GET_CATEGORIES } from "queries";
import { Query, Mutation } from 'react-apollo';
import * as Cookies from 'es-cookie';

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
class EditPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      _id: "",
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
    this.handleToggle = this.handleToggle.bind(this);
  }
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
  onUnpublish(event, updatePost) {
    event.preventDefault();
    this.setState({ publish: false }, () => {

      updatePost().then(async () => {
        this.props.msgfunc("info", "We have saved your post in draft!");
        this.props.history.push('/edit-posts/posts');
      }).catch((error) => {
        this.props.msgfunc("danger", error.toString());
      });
    });
  }
  onPublish(event, updatePost) {
    event.preventDefault();
    this.setState({ publish: true }, () => {

      updatePost().then(async () => {
        this.props.msgfunc("success", "We have updated your post. Saved!");
        this.props.history.push('/edit-posts/posts');
      }).catch((error) => {
        this.props.msgfunc("danger", error.toString());
      });
    });
  }
  render() {
    let pathname=this.props.location.pathname;
    const _id = pathname.substr(pathname.lastIndexOf("/")+1);
    // const _id = "5dbfda5e4fc1912e14ef774d";
    const { classes } = this.props;
    const { editorState } = this.state;
    return(
      <Query query={GET_POST} variables={{ _id }}>
      
      {({ data, loading, error }) => {
        
        if (loading) return <div></div>
        if (error) return <div>Error</div>
        // this.setState({})
        const blocksFromHtml = htmlToDraft(data.post.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState1 = EditorState.createWithContent(contentState);
        
        // const processedHTML = DraftPasteProcessor.processHTML(data.post.content);
        //   const contentState = ContentState.createFromBlockArray(processedHTML);
        //   //move focus to the end. 
        //   let editorState1 = EditorState.createWithContent(contentState);
        //   editorState1 = EditorState.moveFocusToEnd(editorState1);
        // const editorState1 = EditorState.createWithContent(JSON.parse(data.post.content));
        if(this.state.editorState.getCurrentContent().getPlainText()=="" && this.state.editorState.getCurrentContent().getPlainText() != editorState1.getCurrentContent().getPlainText()){
          
          this.setState({
            _id: _id,
            editorState: editorState1,
            title:data.post.title,
            checked: data.post.categories,
            postImage: data.post.postImage,
            tags: data.post.tags,
            slug: data.post.slug,
          })
        }
          var postImage = data.post.postImage;
        return (
          <Mutation mutation={ UPDATE_POST } 
            variables={{ _id: this.state._id, title: this.state.title, content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())), publish: this.state.publish, tags: this.state.tags, categories: this.state.checked, postImage: this.state.postImage, slug: this.state.slug }} refetchQueries={[{ query: GET_POSTS }, { query: GET_AUTHOR_POSTS, variables: { author_id: Cookies.get('user') } }, { query: GET_POST, variables: { _id: _id } }]}>
          {(updatePost, {loading}) => {
            return (
              <div>
              <Header
              brand=""
              color="primary"
              links={
                <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                <Button type="button" color="transparent" className={classes.navLink} onClick={event => this.onUnpublish(event, updatePost)}>
                Unpublish
                </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                <Button type="button" color="transparent" className={classes.navLink}
                onClick={event => this.onPublish(event, updatePost)}
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
                onChange:(event)=>this.onTitleChange(event),
                value: this.state.title
              }}
              />
              <CustomInput
              id="slug"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "slug",
                onChange: (event) => this.onSlugChange(event),
                value: this.state.slug
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
                                checked={this.state.checked.indexOf(category._id) !== -1}
                                onChange={event => this.handleToggle(event, category._id)}
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
                  image={postImage}
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
            )
          }}
          </Query>
          )
        }
      }
      
export default withAuth(session => session && session.getCurrentUser)(withStyles(newPostStyle)(EditPost));