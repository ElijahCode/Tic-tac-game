const firstState: IState = {
  isActive: false,
  gameField: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  currentPlayer: {
    name: "",
  },
  players: [
    {
      name: "",
    },
    {
      name: "",
    },
  ],
  userRole: "watcher",
  watchers: [],
  winner: "none",
};

export const statesAsset: IState[] = [firstState, firstState, firstState];
