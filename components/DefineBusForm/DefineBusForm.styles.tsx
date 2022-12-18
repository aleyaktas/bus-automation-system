import { DefineBusFormStyleProps } from "./DefineBusForm.types";

const styleFn: DefineBusFormStyleProps = () => ({
  container: {
    height: "100%",
    width: "100%",
    marginTop: "2rem",
    alignItems: "center",
  },
  alert: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.3rem",
    width: "30rem",
    marginLeft: "8rem",
  },
  root: {
    width: "30rem",
    fieldset: {
      borderColor: "white",
    },
    "& label.Mui-focused": {
      color: "purple",
      borderColor: "purple",
    },
    "& .MuiInputLabel-root": {
      color: "white !important",
      fontSize: "1.4rem",
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "gray",
    },

    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "red",
    },

    "& .MuiOutlinedInput-root": {
      color: "white !important",
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
      "& input": {
        fontSize: "1.4rem",
      },
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "black",
      fontWeight: "300",
      fontSize: "1.2rem",
    },
  },
  typography: { width: "8rem" },
  button: {
    width: "30rem",
    height: "4rem",
    backgroundColor: "#141529",
    color: "white",
    fontSize: "1.3rem",
    marginTop: "2rem",
    marginLeft: "8rem",
    "&:hover": {
      backgroundColor: "#141529",
    },
  },
});

export default styleFn;
