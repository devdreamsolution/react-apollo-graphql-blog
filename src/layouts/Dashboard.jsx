import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import AddAlert from "@material-ui/icons/AddAlert";

import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";

import EditPost from "views/Admin/Posts/EditPost.jsx";
import UserProfile from "../views/Pages/UserProfile";


var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
      ntf_color: "",
      ntf_msg: "",
      ntf_action: false,
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    this.showNotification = this.showNotification.bind(this);
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
      3000
      );
    }
    componentDidMount() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(this.refs.mainPanel, {
          suppressScrollX: true,
          suppressScrollY: false
        });
        document.body.style.overflow = "hidden";
      }
      window.addEventListener("resize", this.resizeFunction);
    }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
    classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
      });
    const switchRoutes = (
      <Switch>
        <Route path="/profile" render={(props) => <UserProfile {...props} msgfunc={this.showNotification.bind(this)} />} />
        {dashboardRoutes.map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
          if (prop.collapse)
            return prop.views.map((prop, key) => {
              return (
                <Route path={prop.path} render={(props) => <prop.component {...props} msgfunc={this.showNotification.bind(this)} />} key={key} />
              );
            });
          return <Route path={prop.path} render={(props) => <prop.component {...props} msgfunc={this.showNotification.bind(this)} />} key={key} />;
        })}
      </Switch>
    );
      return (
      <div className={classes.wrapper}>
        <Snackbar
          place="tr"
          color={this.state.ntf_color}
          icon={AddAlert}
          message={this.state.ntf_msg}
          open={this.state.ntf_action}
          closeNotification={() => this.setState({ ntf_action: false })}
          close
        />
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Creative Tim"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(Dashboard);
