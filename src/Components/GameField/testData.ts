import { createStateClone } from "../../createStateClone/createCloneState";

const firstState: IState = {
  isActive: false,
  gameField: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  currentPlayer: {
    name: "Bob",
  },
  players: [
    {
      name: "Bob",
    },
    {
      name: "Bill",
    },
  ],
  userRole: "watcher",
  watchers: [
    {
      name: "Jane",
    },
    {
      name: "Kane",
    },
    {
      name: "Mike",
    },
  ],
  winner: "none",
};

const secondState: IState = createStateClone(firstState);
secondState.winner = {
  name: "Bob",
};

const thirdState: IState = createStateClone(firstState);
thirdState.winner = "Draw";

const fourthState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
  winner: {
    name: "Bob",
  },
};

const fifthState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
  winner: "Draw",
};

const sixthState: IState = {
  ...createStateClone(firstState),
  isActive: true,
  userRole: "cross",
};

const seventhState: IState = {
  ...createStateClone(firstState),
  isActive: true,
  userRole: "zero",
};

const eighthState: IState = {
  ...createStateClone(firstState),
  isActive: true,
};

const ninthState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
};

const tenthState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
  isActive: true,
  gameField: [
    ["", "", ""],
    ["X", "O", ""],
    ["X", "", "O"],
  ],
};

const eleventhState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
  isActive: true,
  gameField: [
    ["", "X", "O"],
    ["", "", ""],
    ["O", "X", ""],
  ],
};

const twelveState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
  isActive: true,
  gameField: [
    ["", "O", "X"],
    ["", "O", "X"],
    ["O", "", ""],
  ],
};

const thirteenthState: IState = {
  ...createStateClone(firstState),
  userRole: "zero",
  currentPlayer: {
    name: "Bill",
  },
  isActive: true,
  gameField: [
    ["", "O", "O"],
    ["", "X", "X"],
    ["X", "", ""],
  ],
};

const fourteenthState: IState = {
  ...createStateClone(firstState),
  userRole: "zero",
  currentPlayer: {
    name: "Bill",
  },
  isActive: true,
  gameField: [
    ["X", "", "X"],
    ["O", "", "O"],
    ["X", "", ""],
  ],
};

const fifteenthState: IState = {
  ...createStateClone(firstState),
  userRole: "zero",
  currentPlayer: {
    name: "Bill",
  },
  isActive: true,
  gameField: [
    ["X", "", ""],
    ["", "X", ""],
    ["O", "O", ""],
  ],
};

const sixteenthState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
  isActive: true,
  gameField: [
    ["X", "O", "O"],
    ["", "X", ""],
    ["", "", ""],
  ],
};

const seventeenthState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
  isActive: true,
  gameField: [
    ["O", "O", "X"],
    ["", "X", ""],
    ["", "", ""],
  ],
};

const eighteenthState: IState = {
  ...createStateClone(firstState),
  userRole: "cross",
  isActive: true,
  gameField: [
    ["O", "O", "X"],
    ["X", "", "O"],
    ["O", "X", "X"],
  ],
};

export const statesAsset: IState[] = [
  firstState,
  secondState,
  thirdState,
  fourthState,
  fifthState,
  sixthState,
  seventhState,
  eighthState,
  ninthState,
  tenthState,
  eleventhState,
  twelveState,
  thirteenthState,
  fourteenthState,
  fifteenthState,
  sixteenthState,
  seventeenthState,
  eighteenthState,
];
