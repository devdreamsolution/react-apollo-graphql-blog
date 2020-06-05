import { title } from "assets/jss/material-kit-pro-react.jsx";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.jsx";

const sectionCommentsStyle = {
  ...tooltipsStyle,
  section: {
    backgroundposition: "50%",
    backgroundSize: "cover",
    padding: "70px 0"
  },
  title: {
    ...title,
    marginBottom: "30px",
    textAlign: "center"
  },
  footerButtons: {
    float: "right"
  },
  footerIcons: {
    width: "1.1rem",
    height: "1.1rem",
    position: "relative",
    display: "inline-block",
    top: "0",
    marginTop: "-1em",
    marginBottom: "-1em",
    marginRight: "3px",
    verticalAlign: "middle"
  },
  color555: {
    "&,& *": {
      color: "#555 !important"
    }
  }
};

export default sectionCommentsStyle;
