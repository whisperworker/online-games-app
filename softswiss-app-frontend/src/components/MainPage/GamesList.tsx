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
import { applyFilters } from "../../shared/helpers/setFilters";
import UiLoader from "../uikit/UiLoader/UiLoader";

const GamesList = () => {
  const { games, error, isLoading } = useAppSelector(
    (reduxState: RootState) => reduxState.gamesReducer,
  );
  const dispatch = useAppDispatch();
  const [filteredGames, setFilteredGames] = useState<Array<IGameInfo>>(null);
  const [loadMoreGames, setLoadMoreGames] = useState(12);

  const handleShowMore = () => {
    setLoadMoreGames((prev) => prev + 12);
  };

  const handleChangeFilters = (filters) => {
    if (filters.currency || filters.provider) {
      setFilteredGames(applyFilters(games, filters));
      setLoadMoreGames(12);
    } else {
      setFilteredGames(null);
      setLoadMoreGames(12);
      dispatch(fetchGames());
    }
  };

  const renderGames = (games) =>
    games
      .slice(0, loadMoreGames)
      .map((game) => <GameItem key={game.title} game={game} />);

  useEffect(() => {
    dispatch(fetchGames());
  }, []);

  return (
    <div>
      {!isLoading && games && (
        <>
          <GamesFilter games={games} onFiltersChange={handleChangeFilters} />
          <div className={styles.grid}>
            {filteredGames ? (
              filteredGames.length ? (
                renderGames(filteredGames)
              ) : (
                <div>Игр не найдено</div>
              )
            ) : (
              renderGames(games)
            )}
          </div>
        </>
      )}
      {isLoading && (
        <div className={styles.loaderContainer}>
          <UiLoader />
        </div>
      )}
      {error && <div>{error}</div>}
      {!isLoading && (
        <div className={styles.buttonContainer}>
          {filteredGames && filteredGames?.length >= loadMoreGames && (
            <UiButton onClick={handleShowMore}>Показать еще</UiButton>
          )}
          {games && !filteredGames && games?.length >= loadMoreGames && (
            <UiButton onClick={handleShowMore}>Показать еще</UiButton>
          )}
        </div>
      )}
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
        width={300}
        height={200}
        layout="responsive"
      />
      <h2>{game.title}</h2>
    </Link>
  );
}
