// ##############################
// // // Accordion component style
// #############################

import {
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor
} from "assets/jss/material-kit-pro-react.jsx";

const accordionStyle = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px"
  },
  expansionPanel: {
    boxShadow: "none",
    "&:before": {
      display: "none !important"
    }
  },
  expansionPanelExpanded: {
    margin: "0"
  },
  expansionPanelSummary: {
    minHeight: "auto !important",
    backgroundColor: "transparent",
    borderBottom: "1px solid #ddd",
    padding: "25px 10px 5px 0px",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    color: "#3C4858"
  },
  primaryExpansionPanelSummary: {
    "&:hover": {
      color: primaryColor
    }
  },
  secondaryExpansionPanelSummary: {
    "&:hover": {
      color: secondaryColor
    }
  },
  warningExpansionPanelSummary: {
    "&:hover": {
      color: warningColor
    }
  },
  dangerExpansionPanelSummary: {
    "&:hover": {
      color: dangerColor
    }
  },
  successExpansionPanelSummary: {
    "&:hover": {
      color: successColor
    }
  },
  infoExpansionPanelSummary: {
    "&:hover": {
      color: infoColor
    }
  },
  roseExpansionPanelSummary: {
    "&:hover": {
      color: roseColor
    }
  },
  expansionPanelSummaryExpaned: {
    "& $expansionPanelSummaryExpandIcon": {
      [theme.breakpoints.up("md")]: {
        top: "auto !important"
      },
      transform: "rotate(180deg)",
      [theme.breakpoints.down("sm")]: {
        top: "10px !important"
      },
      // some jss/css to make the cards look a bit better on Internet Explorer
      "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
        display: "inline-block !important",
        top: "10px !important"
      }
    }
  },
  primaryExpansionPanelSummaryExpaned: {
    color: primaryColor
  },
  secondaryExpansionPanelSummaryExpaned: {
    color: secondaryColor
  },
  warningExpansionPanelSummaryExpaned: {
    color: warningColor
  },
  dangerExpansionPanelSummaryExpaned: {
    color: dangerColor
  },
  successExpansionPanelSummaryExpaned: {
    color: successColor
  },
  infoExpansionPanelSummaryExpaned: {
    color: infoColor
  },
  roseExpansionPanelSummaryExpaned: {
    color: roseColor
  },
  expansionPanelSummaryContent: {
    margin: "0 !important"
  },
  expansionPanelSummaryExpandIcon: {
    [theme.breakpoints.up("md")]: {
      top: "auto !important"
    },
    transform: "rotate(0deg)",
    color: "inherit",
    right: "-2px",
    [theme.breakpoints.down("sm")]: {
      top: "10px !important"
    },
    // some jss/css to make the cards look a bit better on Internet Explorer
    "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
      display: "inline-block !important"
    }
  },
  expansionPanelSummaryExpandIconExpanded: {},
  title: {
    fontSize: "15px",
    fontWeight: "bolder",
    marginTop: "0",
    marginBottom: "0",
    color: "inherit"
  },
  expansionPanelDetails: {
    display: "block",
    padding: "15px 0px 5px",
    fontSize: ".875rem"
  }
});

export default accordionStyle;
