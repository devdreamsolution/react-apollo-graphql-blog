const style = {
  rotatingCardContainer: {
    perspective: "800px",
    "& $cardRotate $back": {
      transform: "rotateY(180deg)",
      zIndex: "5",
      textAlign: "center",
      width: "100%",
      height: "100%"
    },
    "&:not($manualRotate):hover $cardRotate": {
      transform: "rotateY(180deg)"
    },
    "&$manualRotate$activateRotate $cardRotate": {
      transform: "rotateY(180deg)"
    },
    "& $cardRotate $front": {
      zIndex: "2",
      position: "relative"
    },
    "& $cardRotate $front, & $cardRotate $back": {
      backfaceVisibility: "hidden",
      boxShadow:
        "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)",
      position: "absolute",
      backgroundColor: "#fff",
      borderRadius: "6px",
      top: "0",
      left: "0",
      WebkitBoxPack: "center",
      MsFlexPack: "center",
      justifyContent: "center",
      MsFlexLinePack: "center",
      alignContent: "center",
      display: "flex",
      WebkitBoxOrient: "vertical",
      WebkitBoxDirection: "normal",
      flexDirection: "column"
    }
  },
  activateRotate: {},
  manualRotate: {},
  cardRotate: {
    transition: "all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1)",
    transformStyle: "preserve-3d",
    position: "relative",
    background: "transparent"
  },
  front: {},
  back: {},
  wrapperBackground: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    textAlign: "center",
    "&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
      backgroundColor: "rgba(0, 0, 0, 0.56)",
      borderRadius: "6px"
    }
  },
  cardBodyRotate: {
    WebkitBoxPack: "center",
    MsFlexPack: "center",
    justifyContent: "center",
    MsFlexLinePack: "center",
    alignContent: "center",
    display: "flex",
    WebkitBoxOrient: "vertical",
    WebkitBoxDirection: "normal",
    flexDirection: "column"
  },
  wrapperPrimary: {
    background: "linear-gradient(60deg,#ab47bc,#7b1fa2)",
    "& h1 small": {
      color: "rgba(255, 255, 255, 0.8)"
    },
    color: "#FFFFFF"
  },
  wrapperInfo: {
    background: "linear-gradient(60deg,#26c6da,#0097a7)",
    color: "#FFFFFF"
  },
  wrapperSuccess: {
    background: "linear-gradient(60deg,#66bb6a,#388e3c)",
    color: "#FFFFFF"
  },
  wrapperWarning: {
    background: "linear-gradient(60deg,#ffa726,#f57c00)",
    color: "#FFFFFF"
  },
  wrapperDanger: {
    background: "linear-gradient(60deg,#ef5350,#d32f2f)",
    color: "#FFFFFF"
  },
  wrapperRose: {
    background: "linear-gradient(60deg,#ec407a,#c2185b)",
    color: "#FFFFFF"
  }
};

export default style;
