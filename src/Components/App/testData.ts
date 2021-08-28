import { createStateClone } from "../../createStateClone/createCloneState";

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

const secondState: IState = {
  ...createStateClone(firstState),
  currentPlayer: {
    name: "Bob",
  },
};

const thirdState: IState = {
  ...createStateClone(secondState),
  players: [
    {
      name: "Jack",
    },
    {
      name: "Ann",
    },
  ],
};

export const statesAsset: IState[] = [firstState, secondState, thirdState];
