import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
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
import "../types/types";

describe("Testing reducer", () => {
  let preloadedState: IState;
  let store: EnhancedStore;

  beforeEach(() => {
    preloadedState = {
      isActive: true,
      gameField: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      currentPlayer: { name: "" },
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

    store = configureStore({
      reducer,
      preloadedState,
    });
  });

  describe("Testing setState action", () => {
    it("Must correct change state", () => {
      const newState: IState = {
        isActive: false,
        gameField: [
          ["X", "", ""],
          ["", "O", ""],
          ["X", "O", ""],
        ],
        currentPlayer: { name: "Bob" },
        players: [
          {
            name: "Bob",
          },
          {
            name: "Bill",
          },
        ],
        userRole: "cross",
        watchers: [
          {
            name: "Jack",
          },
          {
            name: "Mike",
          },
        ],
        winner: {
          name: "Bob",
        },
      };

      store.dispatch(setState(newState));

      expect(store.getState()).toStrictEqual(newState);
    });
  });

  describe("Testing change state isActive property", () => {
    it("Must correct change property", () => {
      const currentIsActive = store.getState().isActive;

      store.dispatch(updateIsActive());

      expect(store.getState().isActive).toBe(!currentIsActive);
    });
  });

  describe("Testing change state gameField property", () => {
    it("Must correct change property", () => {
      const newGameField: IState["gameField"] = [
        ["X", "", ""],
        ["", "X", "O"],
        ["", "", "O"],
      ];

      store.dispatch(updateStateGameFiled(newGameField));

      expect(store.getState().gameField).toStrictEqual(newGameField);
    });
  });

  describe("Testing chagne state currentPlayer property", () => {
    it("Must correct change property", () => {
      const currentPlayer = {
        name: "Harry",
      };

      store.dispatch(updateStateCurrentPlayer(currentPlayer));

      expect(store.getState().currentPlayer).toStrictEqual(currentPlayer);
    });
  });

  describe("Testing change state players property", () => {
    it("Must correct change property", () => {
      const newPlayers: IState["players"] = [
        {
          name: "Bobby",
        },
        {
          name: "Ann",
        },
      ];

      store.dispatch(updateStatePlayers(newPlayers));

      expect(store.getState().players).toStrictEqual(newPlayers);
    });
  });

  describe("Testing change state userRole property", () => {
    it("Must correct change property", () => {
      const newUserRole: userRole = "zero";

      store.dispatch(updateStateUserRole(newUserRole));

      expect(store.getState().userRole).toBe(newUserRole);
    });
  });

  describe("Testing change state watchers players", () => {
    it("Must correct change property", () => {
      const newWatchers: IState["watchers"] = [
        {
          name: "Bill",
        },
        {
          name: "Kate",
        },
        {
          name: "Anton",
        },
      ];

      store.dispatch(updateStateWatchers(newWatchers));

      expect(store.getState().watchers).toStrictEqual(newWatchers);
    });
  });

  describe("Testing change state winner", () => {
    it("Must correct change property", () => {
      const winner: IState["winner"] = {
        name: "Bill",
      };

      store.dispatch(updateStateWinner(winner));

      expect(store.getState().winner).toBe(winner);
    });
  });
});
