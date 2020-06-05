import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
// import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import withAuth from '../../../hoc/withAuth';
import SweetAlert from "react-bootstrap-sweetalert";
import Heading from "components/Heading/Heading.jsx";

import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { GET_POSTS, DELETE_POST, GET_USER, GET_AUTHOR_POSTS } from "queries";
import { Query, Mutation } from 'react-apollo';
import * as Cookies from 'es-cookie';

const styles = {
  ...sweetAlertStyle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      alert: null,
      show: false,
    }
    this.hideAlert = this.hideAlert.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.cancelDetele = this.cancelDetele.bind(this);
  }
  successDelete(deletePost) {
    deletePost().then(async () => {
      this.setState({
        alert: (
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Deleted!"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
          >
            Your post has been deleted.
          </SweetAlert>
        )
      });
    }).catch(() => {
      console.log("error!");
    });
  }
  cancelDetele() {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Your post is safe :)
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  warningWithConfirmMessage(deletePost) {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete(deletePost)}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover this post!
        </SweetAlert>
      )
    });
  }

  render() {
    const { classes } = this.props;
    var posts_data = [];
    return (
      <div>
        {this.state.alert}
        <Query query={GET_USER} variables={{ author_id: Cookies.get('user') }}>
          {({ data, loading, error }) => {

            if (loading) return <div></div>
            if (error) return `Error! ${error.message}`
            
            if (data.getUser.role == "admin") {
              return (
                <Query query={GET_POSTS}>
                {({ loading, data, error }) => {
                  if (loading) return <div>Loading...</div>
                  if (error) return <div></div>
                  
                  if (!loading) {
                    if (data.posts.length > 0) {
                    
                      posts_data = data.posts.map(post => {
                        let key = post._id;
                        return {
                          id: key,
                          checkbox: <Checkbox />,
                          name: post.title,
                          position: post._id,
                          office: "",
                          age: "",
                          actions: (
                            // we've added some custom button actions
                            <div className="actions-right">
                              {/* use this button to add a edit kind of action */}
                              <Link to={`edit/${post._id}`}>
                              <Button
                                justIcon
                                round
                                simple
                                // onClick={() => {
                                //   let obj = this.state.data.find(o => o.id === key);
                                //   alert(
                                //     "You've clicked EDIT button on \n{ \n_id: " +
                                //       obj.id 
                                //   );
                                // }}
                                color="warning"
                                className="edit"
                              >
                                  <Dvr />
                              </Button>
                                </Link>
                              {" "}
                              {/* use this button to remove the data row */}
                          <Mutation mutation={ DELETE_POST } 
                                variables={{ _id: key }} refetchQueries={[{query: GET_POSTS}]}>
                            {(deletePost, {loading}) => {
                            return (
                              <Button
                                justIcon
                                round
                                simple
                                onClick={() => {
                                  this.warningWithConfirmMessage(deletePost)
                                }}
                                color="danger"
                                className="remove"
                              >
                                <Close />
                              </Button>
                            )
                              }}
                              </Mutation>
                              {" "}
                            </div>
                          )
                        };
                      })
                    
                  }}
                  return (
                <GridContainer>
                  
                  <GridItem xs={12}>
                    <Card>
                      <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                          <Assignment />
                        </CardIcon>
                            <h4 className={classes.cardIconTitle}>All Posts</h4>
                      </CardHeader>
                      <CardBody>
                        <ReactTable
                          data = {posts_data} 
                          filterable
                          columns={[
                            {
                              Header: <Checkbox/>,
                              accessor: "checkbox",
                              sortable: false,
                              filterable: false
                            },
                            {
                              Header: "Title",
                              accessor: "name"
                            },
                            {
                              Header: "Author",
                              accessor: "position"
                            },
                            {
                              Header: "Categories",
                              accessor: "office"
                            },
                            {
                              Header: "Tags",
                              accessor: "age"
                            },
                            {
                              Header: "Comments Count",
                              accessor: "age"
                            },
                            {
                              Header: "Date",
                              accessor: "age"
                            },
                            {
                              Header: "Actions",
                              accessor: "actions",
                              sortable: false,
                              filterable: false
                            }
                          ]}
                          defaultPageSize={10}
                          showPaginationTop
                          showPaginationBottom={false}
                          className="-striped -highlight"
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
                  );
                }}
                </Query>
              );
            }

            if (data.getUser.role == "user") {
              return (
                <Query query={GET_AUTHOR_POSTS} variables={{ author_id: Cookies.get('user') }}>
                {({ loading, data, error }) => {
                  if (loading) return <div>Loading...</div>
                  if (error) return <div></div>
                  
                  if (!loading) {
                    if (data.getAuthorPosts.length > 0) {
                    
                      posts_data = data.getAuthorPosts.map(post => {
                        let key = post._id;
                        return {
                          id: key,
                          checkbox: <Checkbox />,
                          name: post.title,
                          position: post._id,
                          office: "",
                          age: "",
                          actions: (
                            // we've added some custom button actions
                            <div className="actions-right">
                              {/* use this button to add a edit kind of action */}
                              <Link to={`edit/${post._id}`}>
                              <Button
                                justIcon
                                round
                                simple
                                // onClick={() => {
                                //   let obj = this.state.data.find(o => o.id === key);
                                //   alert(
                                //     "You've clicked EDIT button on \n{ \n_id: " +
                                //       obj.id 
                                //   );
                                // }}
                                color="warning"
                                className="edit"
                              >
                                  <Dvr />
                              </Button>
                                </Link>
                              {" "}
                              {/* use this button to remove the data row */}
                          <Mutation mutation={ DELETE_POST } 
                                variables={{ _id: key }} refetchQueries={[{ query: GET_AUTHOR_POSTS, variables: { author_id: Cookies.get('user') }  }]}>
                            {(deletePost, {loading}) => {
                            return (
                              <Button
                                justIcon
                                round
                                simple
                                onClick={() => {
                                  this.warningWithConfirmMessage(deletePost)
                                }}
                                color="danger"
                                className="remove"
                              >
                                <Close />
                              </Button>
                            )
                              }}
                              </Mutation>
                              {" "}
                            </div>
                          )
                        };
                      })
                    
                  }}
                  return (
                <GridContainer>
                  <GridItem xs={12}>
                    <Card>
                      <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                          <Assignment />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>All Posts</h4>
                      </CardHeader>
                      <CardBody>
                        <ReactTable
                          data = {posts_data} 
                          filterable
                          columns={[
                            {
                              Header: <Checkbox/>,
                              accessor: "checkbox",
                              sortable: false,
                              filterable: false
                            },
                            {
                              Header: "Title",
                              accessor: "name"
                            },
                            {
                              Header: "Author",
                              accessor: "position"
                            },
                            {
                              Header: "Categories",
                              accessor: "office"
                            },
                            {
                              Header: "Tags",
                              accessor: "age"
                            },
                            {
                              Header: "Comments Count",
                              accessor: "age"
                            },
                            {
                              Header: "Date",
                              accessor: "age"
                            },
                            {
                              Header: "Actions",
                              accessor: "actions",
                              sortable: false,
                              filterable: false
                            }
                          ]}
                          defaultPageSize={10}
                          showPaginationTop
                          showPaginationBottom={false}
                          className="-striped -highlight"
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
                  );
                }}
                </Query>
              );
            }

            return <div>No Permission!</div>;
          }}
        </Query>
      </div>
    );
    
  }
}

export default withAuth(session => session && session.getCurrentUser)(withStyles(styles)(AllPosts));
