import { LoginStyleProps } from "./Login.types";

const styleFn: LoginStyleProps = () => ({
  container: {
    width: "100%",
    height: "100vh",
    background: "linear-gradient(to left, #e4e9ef, #076585)",
  },
  cardContent: { padding: "0", width: "100%" },
  loginIcon: {
    fontSize: "8rem",
    border: "0",
    color: "#076585",
    strokeWidth: "0.1",
  },
  fontSizeLg: {
    fontSize: "1.6rem",
  },
});

export default styleFn;
