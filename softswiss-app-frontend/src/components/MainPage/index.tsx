import React from "react";
import styles from "/src/styles/MainPage.module.css";
import GamesList from "./GamesList";

const MainPage = () => {
  return (
    <div className={styles.main}>
      <GamesList />
    </div>
  );
};

export default MainPage;
