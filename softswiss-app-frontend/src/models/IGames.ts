export interface IGameInfo {
  title: string;
  provider: string;
  gameKey: string;
  gameImageUrl: string;
  collections: ICollections | Record<string, number>;
  real: Record<string, { id: number }>;
  demo: string;
}

export interface ICollections {
  popularity: number;
  slots: number;
  all: number;
  novelty: number;
  new: number;
}
