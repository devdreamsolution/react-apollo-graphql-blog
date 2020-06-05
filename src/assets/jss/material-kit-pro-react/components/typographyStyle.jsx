// ##############################
// // // Typography styles
// #############################

import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor
} from "assets/jss/material-kit-pro-react.jsx";

const typographyStyle = {
  defaultFontStyle: {
    ...defaultFont,
    fontSize: "14px"
  },
  defaultHeaderMargins: {
    marginTop: "20px",
    marginBottom: "10px"
  },
  quote: {
    padding: "10px 20px",
    margin: "0 0 20px",
    fontSize: "1.25rem",
    borderLeft: "5px solid #eee"
  },
  quoteText: {
    margin: "0 0 10px",
    fontStyle: "italic"
  },
  quoteAuthor: {
    display: "block",
    fontSize: "80%",
    lineHeight: "1.42857143",
    color: "#777"
  },
  mutedText: {
    "&, & *": {
      color: "#6c757d",
      display: "inline-block"
    }
  },
  primaryText: {
    "&, & *": {
      color: primaryColor,
      display: "inline-block"
    }
  },
  infoText: {
    "&, & *": {
      color: infoColor,
      display: "inline-block"
    }
  },
  successText: {
    "&, & *": {
      color: successColor,
      display: "inline-block"
    }
  },
  warningText: {
    "&, & *": {
      color: warningColor,
      display: "inline-block"
    }
  },
  dangerText: {
    "&, & *": {
      color: dangerColor,
      display: "inline-block"
    }
  },
  roseText: {
    "&, & *": {
      color: roseColor,
      display: "inline-block"
    }
  },
  smallText: {
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1",
    color: "#777"
  }
};

export default typographyStyle;
