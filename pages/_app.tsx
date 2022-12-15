import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { createContext, useState } from "react";

interface ContextProps {
  user: string;
  setUser: (user: string) => void;
}

export const Context = createContext<ContextProps>({
  user: "",
  setUser: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState("");
  return (
    <Context.Provider value={{ user, setUser }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}
