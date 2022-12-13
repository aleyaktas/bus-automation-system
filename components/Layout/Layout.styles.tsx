import { LayoutStyleProps } from "./Layout.types";

const styleFn: LayoutStyleProps = () => ({
  container: {
    width: "100%",
    height: "100vh",
    background: "linear-gradient(to left, #e4e9ef, #076585)",
  },
  main: {
    height: "100vh",
    overflowY: "auto",
  },
});

export default styleFn;
