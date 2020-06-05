// ##############################
// // // Table styles
// #############################

import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/material-kit-pro-react.jsx";

const tableStyle = theme => ({
  warning: {
    color: warningColor
  },
  primary: {
    color: primaryColor
  },
  danger: {
    color: dangerColor
  },
  success: {
    color: successColor
  },
  info: {
    color: infoColor
  },
  rose: {
    color: roseColor
  },
  gray: {
    color: grayColor
  },
  right: {
    textAlign: "right"
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    overflow: "auto",
    "& > tbody > tr, & > thead > tr": {
      height: "auto"
    }
  },
  tableShoppingHead: {
    fontSize: "0.75em !important",
    textTransform: "uppercase !important"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.5em",
    padding: "12px 8px!important",
    verticalAlign: "middle",
    fontSize: "0.875rem",
    borderBottom: "none",
    borderTop: "1px solid #ddd",
    position: "relative",
    color: "#3C4858"
  },
  tableHeadCell: {
    fontSize: "1.063rem",
    borderBottomWidth: "1px",
    fontWeight: "300",
    color: "#555",
    borderTopWidth: "0 !important"
  },
  tableCellTotal: {
    fontWeight: "500",
    fontSize: "1.0625rem",
    paddingTop: "20px",
    textAlign: "right"
  },
  tableCellAmount: {
    fontSize: "26px",
    fontWeight: "300",
    marginTop: "5px",
    textAlign: "right"
  },
  tableResponsive: {
    minHeight: "0.1%",
    overflowX: "auto"
  },
  tableStripedRow: {
    backgroundColor: "#f9f9f9"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: "#f5f5f5"
    }
  },
  warningRow: {
    backgroundColor: "#fcf8e3",
    "&:hover": {
      backgroundColor: "#faf2cc"
    }
  },
  dangerRow: {
    backgroundColor: "#f2dede",
    "&:hover": {
      backgroundColor: "#ebcccc"
    }
  },
  successRow: {
    backgroundColor: "#dff0d8",
    "&:hover": {
      backgroundColor: "#d0e9c6"
    }
  },
  infoRow: {
    backgroundColor: "#d9edf7",
    "&:hover": {
      backgroundColor: "#c4e3f3"
    }
  }
});

export default tableStyle;
