import React, { useState } from "react";
import { IGameInfo } from "../../models/IGames";
import styles from "./filter.module.css";
import UiSelect from "../uikit/UiSelect/UiSelect";

type Props = {
  games: Array<IGameInfo>;
  onFiltersChange: (filters: { currency: string; provider: string }) => void;
};

const GamesFilter: React.FC<Props> = ({ games, onFiltersChange }) => {
  const gameReal = games.map((game) => Object.keys(game.real));
  const gameCurrencies = [...new Set<string>([].concat(...gameReal))];
  const gameProviders = [
    ...new Set<string>(games.map((game) => game.provider)),
  ];
  const [filters, setFilters] = useState(() => ({
    currency: "",
    provider: "",
  }));

  const handleChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setFilters({ ...filters, currency: selectedCurrency });
    onFiltersChange({
      ...filters,
      currency: selectedCurrency,
      provider: filters.provider,
    });
  };

  const handleChangeProvider = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvider = e.target.value;
    setFilters({ ...filters, provider: e.target.value });
    onFiltersChange({
      ...filters,
      currency: filters.currency,
      provider: selectedProvider,
    });
  };

  return (
    <div className={styles.filterContainer}>
      <UiSelect
        options={gameCurrencies}
        onChange={handleChangeCurrency}
        optionName="Валюта"
      />
      <UiSelect
        options={gameProviders}
        onChange={handleChangeProvider}
        optionName="Провайдер"
      />
    </div>
  );
};

export default GamesFilter;
