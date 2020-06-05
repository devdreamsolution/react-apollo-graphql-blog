import {
  title,
  description,
  section,
  container,
  mlAuto,
  mrAuto,
  cardTitle,
  card,
  dangerColor,
  successColor
} from "assets/jss/material-kit-pro-react.jsx";

const freeDemoStyle = {
  container,
  mlAuto,
  mrAuto,
  description,
  cardTitle,
  title: {
    ...title,
    marginTop: "15px",
    marginBottom: "1rem"
  },
  section: {
    ...section,
    padding: "70px 0px"
  },
  iconGithub: {
    fontSize: "82px",
    color: "#777"
  },
  iframeGithub: {
    top: "11px",
    display: "inline-block",
    position: "relative",
    marginLeft: "10px"
  },
  card: {
    ...card,
    border: "0px",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(0,0,0,0.87)",
    width: "100%",
    "& ul": {
      listStyle: "none",
      padding: "0px",
      maxWidth: "240px",
      margin: "10px auto"
    },
    "& ul li": {
      color: "#999",
      padding: "12px 0px",
      borderBottom: "1px solid rgba(153,153,153,0.3)",
      textAlign: "left"
    },
    "& ul li b": {
      minWidth: "24px",
      display: "inline-block",
      textAlign: "center",
      color: "#3c4858"
    }
  },
  cardPricing: {
    boxShadow: "none"
  },
  cardIcons: {
    top: "6px",
    position: "relative"
  },
  dangerColor: {
    color: dangerColor
  },
  successColor: {
    color: successColor
  }
};

export default freeDemoStyle;
