import {
  section,
  sectionDark,
  cardTitle,
  container
} from "assets/jss/material-kit-pro-react.jsx";

const sectionImageStyle = {
  container: {
    ...container,
    position: "relative",
    zIndex: "2"
  },
  section: {
    ...section,
    ...sectionDark,
    padding: "80px 0",
    position: "relative",
    "&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    }
  },
  cardTitle: {
    ...cardTitle,
    color: "#FFFFFF !important"
  },
  description: {
    color: "rgba(255, 255, 255, 0.76)"
  },
  textLeft: {
    textAlign: "left"
  }
};

export default sectionImageStyle;
