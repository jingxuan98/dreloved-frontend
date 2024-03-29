import React, { createContext, useReducer, useContext, useState } from "react";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { provider } from "web3-core";
import Layout from "../layout";
import "antd/dist/antd.css";
import "@fontsource/varela-round";
import "../styles/globals.css";
require("../styles/variables.less");

// // for dev
// export const api = "http://localhost:5002/";

//for production
export const api = "https://dreloved-backend.vercel.app/";

// console.log(process.env.NODE_ENV);
export const UserContext = createContext(null);

function getLibrary(provider: provider) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({});

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </Web3ReactProvider>
  );
}

export default MyApp;
