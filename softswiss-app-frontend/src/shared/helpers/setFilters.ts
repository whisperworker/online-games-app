import { IGameInfo } from "../../models/IGames";

export function applyFilters(
  games: Array<IGameInfo>,
  filters,
): Array<IGameInfo> | null {
  if (filters.provider || filters.currency) {
    return games.filter((game) => {
      return filters.provider && filters.currency
        ? Object.keys(game.real).includes(filters.currency) &&
            game.provider === filters.provider
        : Object.keys(game.real).includes(filters.currency) ||
            game.provider === filters.provider;
    });
  }
  return null;
}
