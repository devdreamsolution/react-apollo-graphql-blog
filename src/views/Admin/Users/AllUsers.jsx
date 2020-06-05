import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { GET_ALL_USERS } from "queries";
import { Query } from 'react-apollo';
import withAuth from '../../../hoc/withAuth';

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import { ok } from "assert";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query_check: false,
      data: dataTable.dataRows.map((prop, key) => {
        return {
          
        };
      })
      
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Query query={GET_ALL_USERS}>
        {({ loading, data, error }) => {
          if (loading) return <div></div>
          if (error) return <div></div>

            console.log(data.getAllUsers);
            if (!this.state.query_check) {
              this.setState({
                query_check: true,
                data: data.getAllUsers.map(user => {
                  return {
                    id: user._id,
                    userName: user.userName,
                    name: user.firstName + " " + user.lastName,
                    email: user.email,
                    role: user.role,
                    actions: (
                      // we've added some custom button actions
                      <div className="actions-right">
                        {/* use this button to add a edit kind of action */}
                        <Button
                          justIcon
                          round
                          simple
                          onClick={() => {
                            alert(
                              "You've clicked EDIT button on \n{ \nName: "
                            );
                          }}
                          color="warning"
                          className="edit"
                        >
                          <Dvr />
                        </Button>{" "}
                        {/* use this button to remove the data row */}
                        <Button
                          justIcon
                          round
                          simple
                          onClick={() => {
                            
                          }}
                          color="danger"
                          className="remove"
                        >
                          <Close />
                        </Button>{" "}
                      </div>
                    )
                  };
                })
              });
            }
            return (
              <GridContainer>
                <GridItem xs={12}>
                  <Card>
                    <CardHeader color="primary" icon>
                      <CardIcon color="primary">
                        <Assignment />
                      </CardIcon>
                      <h4 className={classes.cardIconTitle}>All Users</h4>
                    </CardHeader>
                    <CardBody>
                      <ReactTable
                        data={this.state.data}
                        filterable
                        columns={[
                          {
                            Header: "Username",
                            accessor: "userName"
                          },
                          {
                            Header: "Email",
                            accessor: "email"
                          },
                          {
                            Header: "Name",
                            accessor: "name"
                          },
                          {
                            Header: "Role",
                            accessor: "role"
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
}

export default withAuth(session => session && session.getCurrentUser)(withStyles(styles)(AllUsers));
