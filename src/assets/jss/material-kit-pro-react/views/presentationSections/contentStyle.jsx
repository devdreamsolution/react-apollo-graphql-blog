import {
  container,
  section,
  title,
  sectionDescription,
  mlAuto
} from "assets/jss/material-kit-pro-react.jsx";

const contentStyle = theme => ({
  container,
  section: {
    ...section,
    padding: "70px 0px"
  },
  sectionDescription,
  title: {
    ...title,
    color: "#3c4858",
    marginTop: "30px",
    marginBottom: "5px",
    "& + $description": {
      marginBottom: "10px",
      marginTop: "0px"
    }
  },
  description: {
    color: "#999",
    marginTop: "35px",
    marginBottom: "15px"
  },
  imageContainer: {
    maxWidth: "900px",
    position: "relative"
  },
  ipadImg: {
    width: "100%"
  },
  mlAuto,
  areaImg: {
    height: "300px",
    width: "250px",
    zIndex: 2,
    top: "10%",
    left: "60%",
    boxShadow:
      "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "130px",
      maxHeight: "170px"
    }
  },
  infoImg: {
    height: "200px",
    width: "300px",
    top: "50%",
    left: "0%",
    boxShadow:
      "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "170px",
      maxHeight: "120px"
    }
  },
  animeInfoImg: {
    top: "50%",
    left: "0%",
    position: "absolute"
  },
  animeAreaImg: {
    top: "10%",
    left: "60%",
    position: "absolute"
  }
});

export default contentStyle;
