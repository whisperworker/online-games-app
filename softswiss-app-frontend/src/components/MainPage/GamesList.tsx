import React, { useEffect, useState } from "react";
import styles from "src/styles/MainPage.module.css";
import Link from "next/link";
import Image from "next/image";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchGames } from "../../store/slices/ActionCreators";
import GamesFilter from "../GamesFilter";
import { IGameInfo } from "../../models/IGames";
import { useAppSelector } from "../../hooks/useAppSelector";
import UiButton from "../uikit/UiButton/UiButton";
import { setFilteredGames } from "../../store/slices/gamesSlice";
import { applyFilters } from "../../shared/helpers/setFilters";
import UiLoader from "../uikit/UiLoader/UiLoader";

const GamesList = () => {
  const { games, filteredGames, error, isLoading } = useAppSelector(
    (reduxState: RootState) => reduxState.gamesReducer,
  );
  const dispatch = useAppDispatch();
  const [loadMoreGames, setLoadMoreGames] = useState(12);

  const handleShowMore = () => {
    setLoadMoreGames((prev) => prev + 12);
  };

  const handleChangeFilters = (filters) => {
    if (filters.currency || filters.provider) {
      const filteredGames = applyFilters(games, filters);
      dispatch(setFilteredGames(filteredGames));
      setLoadMoreGames(12);
    } else {
      setLoadMoreGames(12);
      dispatch(fetchGames());
    }
  };

  useEffect(() => {
    dispatch(fetchGames());
  }, []);

  return (
    <div>
      {games && (
        <>
          <GamesFilter games={games} onFiltersChange={handleChangeFilters} />
          <div className={styles.grid}>
            {filteredGames ? (
              filteredGames.length ? (
                filteredGames
                  .slice(0, loadMoreGames)
                  .map((game) => <GameItem key={game.title} game={game} />)
              ) : (
                <div>Игр не найдено</div>
              )
            ) : (
              games
                .slice(0, loadMoreGames)
                .map((game) => <GameItem key={game.title} game={game} />)
            )}
          </div>
        </>
      )}
      {error && <div>{error}</div>}
      {isLoading && (
        <div className={styles.loaderContainer}>
          <UiLoader />
        </div>
      )}
      <div className={styles.buttonContainer}>
        {filteredGames && filteredGames?.length >= loadMoreGames && (
          <UiButton onClick={handleShowMore}>Показать еще</UiButton>
        )}
        {games && !filteredGames && games?.length >= loadMoreGames && (
          <UiButton onClick={handleShowMore}>Показать еще</UiButton>
        )}
      </div>
    </div>
  );
};

export default GamesList;

type GameItemProps = {
  game: IGameInfo;
};

function GameItem({ game }: GameItemProps) {
  return (
    <Link className={styles.card} href={`/game/${game.gameKey}`}>
      <Image
        src={game.gameImageUrl}
        alt="logo"
        width={0}
        height={0}
        sizes="150vw"
        style={{ width: "100%", height: "auto" }}
      />
      <h2>{game.title}</h2>
    </Link>
  );
}
