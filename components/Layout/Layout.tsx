import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styleFn from "./Layout.styles";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = styleFn();

  return (
    <div style={styles.container}>
      <Navbar />
      <main style={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
