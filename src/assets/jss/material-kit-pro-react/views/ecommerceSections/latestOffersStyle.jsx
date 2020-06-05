import {
  section,
  container,
  cardTitle,
  coloredShadow,
  mlAuto
} from "assets/jss/material-kit-pro-react.jsx";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.jsx";

const styles = {
  cardTitle,
  container,
  ...tooltipsStyle,
  section: {
    ...section,
    padding: "70px 0px"
  },
  coloredShadow,
  cardDescription: {
    color: "#999",
    textAlign: "center"
  },
  mlAuto,
  priceContainer: {
    display: "inline-flex"
  },
  price: {
    fontSize: "18px",
    color: "#9a9a9a"
  },
  priceOld: {
    fontSize: "16px",
    textDecoration: "line-through"
  },
  priceNew: {
    color: "#f44336"
  },
  stats: {
    color: "#999"
  },
  textCenter: {
    textAlign: "center"
  }
};

export default styles;
