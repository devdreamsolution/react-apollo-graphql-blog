import {
  container,
  title,
  mlAuto,
  mrAuto,
  description
} from "assets/jss/material-kit-pro-react.jsx";

const styles = {
  container,
  title,
  mrAuto,
  mlAuto,
  description,
  card: {},
  cardBody: {
    padding: "15px",
    "& form": {
      marginBottom: "0"
    }
  },
  cardForm: {
    margin: "0 0 0 14px",
    padding: 0,
    top: 10
  },
  socialLine: {
    padding: ".9375rem 0px",
    "& $border": {
      borderRight: "1px solid rgba(0,0,0,0.12)"
    },
    "& $border:last-child": {
      border: 0
    }
  },
  textCenter: {
    textAlign: "center !important"
  },
  white: {
    backgroundColor: "#fff"
  },
  dark: {
    background: "radial-gradient(ellipse at center,#585858 0,#232323 100%)",
    backgroundSize: "550% 450%",
    "& $border": {
      borderColor: "rgba(255,255,255,0.1)"
    }
  },
  bigIcons: {
    "& a": {
      margin: 0,
      width: "100% !important",
      paddingTop: "45px",
      paddingBottom: "45px"
    },
    "& button i.fab, & a[role='button'] i.fab": {
      fontSize: "25px",
      lineHeight: "90px"
    }
  },
  subscribeLine: {
    padding: "1.875rem 0px",
    "& $card": {
      marginTop: "30px"
    },
    "& form": { margin: "0px" },
    "& $formFix": { paddingTop: "0px" },
    "&$subscribeLineImage:after": {
      position: "absolute",
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "block",
      left: 0,
      top: 0,
      content: "''",
      backgroundColor: "rgba(0,0,0,0.66)"
    }
  },
  formFix: {},
  subscribeLineWhite: {
    backgroundColor: "#fff",
    "& $subscribeButton": {
      top: "-6px"
    }
  },
  subscribeLineImage: {
    position: "relative",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    "& $container": {
      zIndex: 2,
      position: "relative"
    },
    "& $title": {
      color: "#fff"
    },
    "& $description": {
      color: "#999"
    }
  },
  subscribeButton: {},
  border: {}
};

export default styles;
