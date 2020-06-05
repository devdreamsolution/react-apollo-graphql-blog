import {
  container,
  section,
  sectionDark,
  mlAuto,
  title,
  description,
  cardTitle
} from "assets/jss/material-kit-pro-react.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.jsx";

const contactsSection = {
  ...customCheckboxRadioSwitch,
  container,
  mlAuto,
  title,
  description,
  cardTitle,
  section: {
    ...sectionDark,
    ...section,
    position: "relative",
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
    },
    "& $title": {
      color: "#FFFFFF"
    },
    "& $description": {
      color: "rgba(255, 255, 255, 0.76)"
    },
    "& $infoArea": {}
  },
  contacts: {
    padding: "80px 0"
  },
  infoArea: {
    padding: "0",
    margin: "0",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      color: "#fff"
    },
    "& h4": {
      marginTop: "20px",
      color: "#fff"
    }
  },
  card1: {
    marginTop: "30px",
    "& $cardTitle": {
      marginBottom: "0.75rem !important",
      color: "#FFFFFF"
    }
  },
  textCenter: {
    textAlign: "center"
  },
  justifyContentBetween: {
    WebkitBoxPack: "justify !important",
    MsFlexPack: "justify !important",
    justifyContent: "space-between !important"
  },
  pullRight: {
    float: "right"
  },
  card2: {
    "@media (min-width: 991px)": {
      margin: "80px 0 80px 150px"
    },
    maxWidth: "560px",
    float: "left",
    "& $cardTitle": {
      marginBottom: "0.75rem !important",
      color: "#FFFFFF"
    }
  },
  map: {
    overflow: "hidden",
    width: "100%",
    height: "800px",
    position: "absolute"
  },
  contacts2: {
    padding: "0",
    height: "800px"
  },
  infoArea2: {
    padding: "0",
    margin: "0",
    "& h4": {
      fontSize: "1.0625rem",
      lineHeight: "1.55em"
    }
  }
};

export default contactsSection;
