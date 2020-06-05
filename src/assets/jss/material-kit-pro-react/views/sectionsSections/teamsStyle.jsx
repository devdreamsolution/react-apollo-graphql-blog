import {
  container,
  title,
  cardTitle,
  description,
  mlAuto,
  mrAuto,
  section,
  sectionDark,
  coloredShadow
} from "assets/jss/material-kit-pro-react.jsx";

const teamsSection = {
  container,
  title,
  mlAuto,
  mrAuto,
  cardTitle,
  coloredShadow,
  description,
  descriptionWhite: {
    ...description
  },
  textCenter: {
    textAlign: "center"
  },
  team: {
    padding: "80px 0",
    "& h5$description,& h5$descriptionWhite": {
      marginBottom: "80px"
    }
  },
  section: {
    ...sectionDark,
    ...section,
    position: "relative",
    "& $title": {
      color: "#FFFFFF"
    },
    "& $descriptionWhite": {
      color: "rgba(255, 255, 255, 0.76)"
    },
    "& $container": {
      zIndex: "2",
      position: "relative"
    },
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
  justifyContent: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  cardCategory: {
    marginTop: "10px"
  },
  btn: {
    marginTop: "0 !important"
  },
  card3: {
    textAlign: "left"
  },
  card5: {
    textAlign: "left",
    "& $cardTitle": {
      color: "#FFFFFF"
    },
    "& $description": {
      color: "#FFFFFF"
    }
  }
};

export default teamsSection;
