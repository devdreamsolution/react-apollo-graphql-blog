import {
  mrAuto,
  mlAuto,
  title,
  description,
  cardTitle
} from "assets/jss/material-kit-pro-react.jsx";

const teamStyle = {
  mrAuto,
  mlAuto,
  title,
  description: {
    ...description,
    marginBottom: "80px"
  },
  cardTitle,
  cardDescription: {
    color: "#999"
  },
  team: {
    padding: "80px 0px"
  },
  textCenter: {
    textAlign: "center!important"
  },
  img: {
    width: "100%",
    height: "auto"
  },
  textMuted: {
    color: "#6c757d!important"
  },
  justifyContent: {
    justifyContent: "center!important"
  }
};

export default teamStyle;
