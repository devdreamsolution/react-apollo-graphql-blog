import {
  section,
  container,
  mlAuto,
  mrAuto,
  title,
  description,
  card
} from "assets/jss/material-kit-pro-react.jsx";

const pricingStyle = {
  container,
  mlAuto,
  mrAuto,
  title,
  section: {
    ...section,
    padding: "80px 0",
    zIndex: 3,
    position: "relative",
    textAlign: "center"
  },
  socialLine: {
    padding: ".9375rem 0px",
    textAlign: "center",
    width: "100%"
  },
  marginRight: {
    marginRight: "3px"
  },
  description: {
    ...description,
    color: "#999"
  },
  card: {
    ...card,
    marginBottom: "30px",
    boxShadow:
      "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12)",
    "& ul": {
      listStyle: "none",
      padding: 0,
      maxWidth: "240px",
      margin: "10px auto"
    },
    "& ul li": {
      color: "#999",
      textAlign: "center",
      padding: "12px 0px",
      borderBottom: "1px solid rgba(153,153,153,0.3)"
    },
    "& ul li b": {
      color: "#3c4858"
    },
    "& ul li:last-child": {
      border: 0
    }
  },
  cardMargin: {
    marginTop: "80px"
  },
  cardCategory: {
    color: "#999",
    marginTop: "10px"
  },
  cardTitle: {
    marginTop: "30px",
    color: "#3c4858",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: "Roboto Slab,Times New Roman,serif",
    "& small": {
      position: "relative",
      top: "-17px",
      fontSize: "26px",
      display: "inline-flex",
      height: 0
    }
  },
  cardBody: {
    padding: "15px"
  },
  navPillsContent: {
    padding: "20px 0px 50px 0px"
  }
};

export default pricingStyle;
