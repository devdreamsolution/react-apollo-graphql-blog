// import {
//
// } from "assets/jss/material-kit-pro-react.jsx";

const cardStyle = {
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    width: "100%",
    boxShadow:
      "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
    // some jss/css to make the cards look a bit better on Internet Explorer
    "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
      display: "inline-block !important"
    }
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardProfile: {
    marginTop: "30px",
    textAlign: "center"
  },
  cardBlog: {
    marginTop: "60px"
  },
  cardRaised: {
    boxShadow:
      "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  cardBackground: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    textAlign: "center",
    color: "#fff",
    "& h3": {
      color: "#fff !important"
    },
    "& p": {
      color: "rgba(255,255,255,0.7)!important"
    },
    "&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
      backgroundColor: "rgba(0, 0, 0, 0.56)",
      borderRadius: "6px"
    },
    "& small": {
      color: "rgba(255, 255, 255, 0.7) !important"
    }
  },
  cardPricing: {
    textAlign: "center",
    "&:after": {
      backgroundColor: "rgba(0, 0, 0, 0.7) !important"
    },
    "& ul": {
      listStyle: "none",
      padding: 0,
      maxWidth: "240px",
      margin: "10px auto"
    },
    "& ul li": {
      color: "#999999",
      textAlign: "center",
      padding: "12px 0px",
      borderBottom: "1px solid rgba(153,153,153,0.3)"
    },
    "& ul li:last-child": {
      border: 0
    },
    "& ul li b": {
      color: "#3c4858"
    },
    "& h1": {
      marginTop: "30px"
    },
    "& h1 small": {
      display: "inline-flex",
      height: 0,
      fontSize: "18px"
    },
    "& h1 small:first-child": {
      position: "relative",
      top: "-17px",
      fontSize: "26px"
    },
    "& ul li svg,& ul li .fab,& ul li .fas,& ul li .far,& ul li .fal,& ul li .material-icons": {
      position: "relative",
      top: "7px"
    }
  },
  cardPricingColor: {
    "& ul li": {
      color: "#fff",
      borderColor: "rgba(255,255,255,0.3)",
      "& b, & svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
        color: "#fff",
        fontWeight: "700"
      }
    }
  },
  cardProduct: {
    marginTop: "30px"
  },
  primary: {
    background: "linear-gradient(60deg,#ab47bc,#7b1fa2)",
    "& h1 small": {
      color: "rgba(255, 255, 255, 0.8)"
    },
    color: "#FFFFFF"
  },
  info: {
    background: "linear-gradient(60deg,#26c6da,#0097a7)",
    "& h1 small": {
      color: "rgba(255, 255, 255, 0.8)"
    },
    color: "#FFFFFF"
  },
  success: {
    background: "linear-gradient(60deg,#66bb6a,#388e3c)",
    "& h1 small": {
      color: "rgba(255, 255, 255, 0.8)"
    },
    color: "#FFFFFF"
  },
  warning: {
    background: "linear-gradient(60deg,#ffa726,#f57c00)",
    "& h1 small": {
      color: "rgba(255, 255, 255, 0.8)"
    },
    color: "#FFFFFF"
  },
  danger: {
    background: "linear-gradient(60deg,#ef5350,#d32f2f)",
    "& h1 small": {
      color: "rgba(255, 255, 255, 0.8)"
    },
    color: "#FFFFFF"
  },
  rose: {
    background: "linear-gradient(60deg,#ec407a,#c2185b)",
    "& h1 small": {
      color: "rgba(255, 255, 255, 0.8)"
    },
    color: "#FFFFFF"
  }
};

export default cardStyle;
