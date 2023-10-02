import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "src/styles/GamePage.module.css";
import { RootState } from "../../store/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import UiButton from "../../components/uikit/UiButton/UiButton";
import { ParsedUrlQuery } from "querystring";

const GamePage = () => {
  const router = useRouter();
  const { gameKey }: ParsedUrlQuery = router.query;
  const { games } = useAppSelector(
    (reduxState: RootState) => reduxState.gamesReducer,
  );

  return (
    <div className={`${styles.gamePage}`}>
      <Link href="/">
        <UiButton className={`${styles.toMainPageButton}`}>На главную</UiButton>
      </Link>
      {games?.map(
        (game) =>
          gameKey?.includes(game.gameKey.split("/")[1]) && (
            <h1 key={game.gameKey}>{game.title}</h1>
          ),
      )}
    </div>
  );
};

export default GamePage;
