import {
  mrAuto,
  mlAuto,
  cardTitle
} from "assets/jss/material-kit-pro-react.jsx";

const pricingStyle = {
  mrAuto,
  mlAuto,
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#fff!important",
    "& small": {
      color: "rgba(255,255,255,0.8)!important"
    }
  },
  textCenter: {
    textAlign: "center"
  },
  pricingSection: {
    padding: "80px 0px"
  },
  textInfo: {
    color: "#00bcd4!important"
  }
};

export default pricingStyle;
