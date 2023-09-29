import React from "react";
import Head from "next/head";
import MainPage from "../components/MainPage";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <Head>
        <title>Softswiss Casino</title>
        <link
          rel="icon"
          href="https://www.softswiss.com/wp-content/uploads/2023/01/favicon-1.png"
        />
      </Head>
      <main className={inter.className}>
        <MainPage />
      </main>
    </>
  );
};

export default Home;
