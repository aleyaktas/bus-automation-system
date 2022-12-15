import { DefineBusStyleProps } from "./DefineBus.types";

const styleFn: DefineBusStyleProps = () => ({
  root: {
    width: "30rem",
    fieldset: {
      borderColor: "white",
    },
    "& label.Mui-focused": {
      color: "purple",
      borderColor: "purple",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "gray",
    },

    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "red",
    },

    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
});

export default styleFn;
