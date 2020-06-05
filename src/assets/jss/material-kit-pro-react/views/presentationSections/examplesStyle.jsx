import {
  section,
  sectionDark,
  container,
  mlAuto,
  mrAuto,
  title,
  description
} from "assets/jss/material-kit-pro-react.jsx";

const examplesStyle = {
  section: {
    ...section,
    padding: "70px 0px"
  },
  sectionDark: {
    ...sectionDark,
    "& $title": {
      color: "#fff"
    },
    "& $description": {
      color: "rgba(255,255,255,0.76)"
    }
  },
  container,
  mlAuto,
  mrAuto,
  sectionDescription: {
    textAlign: "center",
    marginBottom: "90px"
  },
  title: {
    ...title,
    textAlign: "center"
  },
  description,
  imgCardExtended: {
    transition: "all .2s cubic-bezier(0.4,0,0.2,1)",
    "&:hover": {
      transform: "translate3d(0, -10px, 0)"
    }
  }
};

export default examplesStyle;
