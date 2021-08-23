import { createReducer } from "@reduxjs/toolkit";
import {
  setState,
  updateIsActive,
  updateStateGameFiled,
  updateStateCurrentPlayer,
  updateStatePlayers,
  updateStateUserRole,
  updateStateWatchers,
  updateStateWinner,
} from "./action";
import { createStateClone } from "../createStateClone/createCloneState";

const initState: IState = {
  isActive: true,
  gameField: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  currentPlayer: { name: "" },
  players: [{ name: "" }, { name: "" }],
  userRole: "watcher",
  watchers: [],
  winner: "none",
};

export const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(setState, (state: IState, action) => action.payload)
    .addCase(updateStateGameFiled, (state: IState, action) => {
      const newState = createStateClone(state);

      const newGameField = action.payload;

      newState.gameField = newGameField;

      return newState;
    })
    .addCase(updateIsActive, (state: IState) => {
      const newState = createStateClone(state);

      const newIsActive = !state.isActive;

      newState.isActive = newIsActive;

      return newState;
    })
    .addCase(updateStateCurrentPlayer, (state: IState, action) => {
      const newState = createStateClone(state);

      newState.currentPlayer = action.payload;

      return newState;
    })
    .addCase(updateStatePlayers, (state: IState, action) => {
      const newState = createStateClone(state);

      const newPlayers = action.payload;

      newState.players = newPlayers;

      return newState;
    })
    .addCase(updateStateUserRole, (state: IState, action) => {
      const newState = createStateClone(state);

      const newUserRole = action.payload;

      newState.userRole = newUserRole;

      return newState;
    })
    .addCase(updateStateWatchers, (state: IState, action) => {
      const newState = createStateClone(state);

      const newWatchers = action.payload;

      newState.watchers = newWatchers;

      return newState;
    })
    .addCase(updateStateWinner, (state: IState, action) => {
      const newState = createStateClone(state);

      const winner = action.payload;

      newState.winner = winner;

      return newState;
    });
});
