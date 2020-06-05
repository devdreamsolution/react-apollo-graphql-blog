import { container, title } from "assets/jss/material-kit-pro-react.jsx";

import imagesStyles from "assets/jss/material-kit-pro-react/imagesStyles.jsx";

const sectionTextStyle = {
  container,
  title,
  section: {
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: "#555",
      marginBottom: "30px"
    }
  },
  quoteText: {
    fontSize: "1.5rem !important"
  },
  ...imagesStyles
};

export default sectionTextStyle;
