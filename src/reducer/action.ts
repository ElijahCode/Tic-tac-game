import { createAction } from "@reduxjs/toolkit";

export const setState = createAction<IState>("state/set");
export const updateIsActive = createAction("state/isActive/toggle");
export const updateStateGameFiled = createAction<IState["gameField"]>(
  "state/gameFiled/update"
);
export const updateStateCurrentPlayer = createAction<IState["currentPlayer"]>(
  "state/currentPlayer/update"
);
export const updateStatePlayers = createAction<IState["players"]>(
  "state/players/update"
);
export const updateStateUserRole = createAction<IState["userRole"]>(
  "state/userRole/update"
);
export const updateStateWatchers = createAction<IState["watchers"]>(
  "state/watcher/update"
);
export const updateStateWinner = createAction<IState["winner"]>(
  "state/winner/update"
);
