import { DefineBusModelStyleProps } from "./DefineBusModel.types";

const styleFn: DefineBusModelStyleProps = () => ({
  container: {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  },
  seat: {
    width: "5rem",
    height: "5rem",
    backgroundColor: "#2e5951",
    borderRadius: "0.4rem",
  },
  button: {
    marginRight: "1.2rem",
    height: "auto",
    backgroundColor: "#ffcf70",
    color: "black",
    "&:hover": {
      backgroundColor: "#ffcf70",
    },
  },
});

export default styleFn;
