import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import AddAlert from "@material-ui/icons/AddAlert";

import pagesRoutes from "routes/pages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import bgImage from "assets/img/register.jpeg";

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ntf_color: "",
      ntf_msg: "",
      ntf_action: false,
    }
  }
  componentDidMount() {
    document.body.style.overflow = "unset";
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
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <PagesHeader {...rest} />
        <Snackbar
          place="tr"
          color={this.state.ntf_color}
          icon={AddAlert}
          message={this.state.ntf_msg}
          open={this.state.ntf_action}
          closeNotification={() => this.setState({ ntf_action: false })}
          close
        />
        <div className={classes.wrapper} ref="wrapper">
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + bgImage + ")" }}
          >
            <Switch>
              {pagesRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return null;
                }
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                }
                return (
                  <Route
                    path={prop.path}
                    render={(props) => <prop.component {...props} msgfunc={this.showNotification.bind(this)} />}
                    // component={prop.component}
                    key={key}
                    // msgfunc={this.showNotification}
                  />
                );
              })}
            </Switch>
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
