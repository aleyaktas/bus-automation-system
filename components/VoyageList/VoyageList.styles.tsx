import { VoyageListStyleProps } from "./VoyageList.types";

const styleFn: VoyageListStyleProps = () => ({
  container: {
    height: "100%",
    width: "100%",
    marginTop: "2rem",
    alignItems: "center",
    "& > :not(style)": { m: 1 },
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
    width: "15rem",
    fieldset: {
      borderColor: "white",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInputLabel-root": {
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
      color: "#af0101",
      fontWeight: "300",
      fontSize: "1.2rem",
      position: "absolute",
      top: "5rem",
    },
    "& .MuiFormLabel-root.MuiInputLabel-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.38) !important",
    },
  },
  typography: { width: "7rem" },
  button: {
    backgroundColor: "#141529",
    color: "white",
    fontSize: "1.3rem",

    "&:hover": {
      backgroundColor: "#141529",
    },
  },
});

export default styleFn;
