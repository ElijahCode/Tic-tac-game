/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { GameField } from "./GameField";
import { reducer } from "../../reducer/reducer";
import { statesAsset } from "./testData";
import { createStateClone } from "../../createStateClone/createCloneState";

describe("Testing GameField component", () => {
  let preloadedState: IState;
  let store: EnhancedStore;
  let stateAssetIndex = 0;

  beforeEach(() => {
    preloadedState = createStateClone(statesAsset[stateAssetIndex]);

    store = configureStore({
      preloadedState,
      reducer,
    });

    render(
      <Provider store={store}>
        <GameField />
      </Provider>
    );

    stateAssetIndex += 1;
  });

  describe("Markup testing", () => {
    it("Testing basic markup", () => {
      expect(screen.getByTestId("gameFieldBlockMain")).toBeInTheDocument();
      expect(screen.getByTestId("playerVersusBlock")).toBeInTheDocument();

      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("vs")).toBeInTheDocument();
      expect(screen.getByText("Bill")).toBeInTheDocument();

      expect(screen.queryByTestId("winnerBlock")).not.toBeInTheDocument();
      expect(screen.queryByTestId("drawBlock")).not.toBeInTheDocument();

      expect(screen.getByTestId("gameFieldTable")).toBeInTheDocument();

      expect(screen.queryByTestId("resetButton")).not.toBeInTheDocument();

      expect(screen.getByTestId("watchersList")).toBeInTheDocument();

      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.getByText("Kane")).toBeInTheDocument();
      expect(screen.getByText("Mike")).toBeInTheDocument();
    });

    it("Testing advanced markup. Test #1. Have winner. User is watcher.", () => {
      expect(screen.getByText("Bob is winner!!!")).toBeInTheDocument();
      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).not.toBeInTheDocument();
    });

    it("Testing advanced markup. Test #2. Have draw. User is watcher.", () => {
      expect(screen.getByText("The game ended in a draw")).toBeInTheDocument();
      expect(screen.queryByText("Bob is winner!!!")).not.toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).not.toBeInTheDocument();
    });

    it("Testing advanced markup. Test #3. Have winner. User is player.", () => {
      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bob is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Testing advanced markup. Test #4. Have draw. User is player.", () => {
      expect(screen.getByText("The game ended in a draw")).toBeInTheDocument();
      expect(screen.queryByText("Bob is winner!!!")).not.toBeInTheDocument();
      expect(screen.getByTestId("resetButton")).toBeInTheDocument();
    });
  });

  describe("Testing functionality", () => {
    it("Game field will chagne after click. Player gaming for cross", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[1]
          .cells[0]
      );

      expect((store.getState() as IState).gameField).toStrictEqual([
        ["", "", ""],
        ["X", "", ""],
        ["", "", ""],
      ]);

      expect(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[1]
          .cells[0].innerHTML
      ).toBe("X");
    });

    it("Game field will chagne after click. Player gaming for zero", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[2]
          .cells[1]
      );

      expect((store.getState() as IState).gameField).toStrictEqual([
        ["", "", ""],
        ["", "", ""],
        ["", "O", ""],
      ]);

      expect(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[2]
          .cells[1].innerHTML
      ).toBe("O");
    });

    it("Game field not change after click. User is watcher. isActive is true", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[0]
          .cells[2]
      );

      expect((store.getState() as IState).gameField).toStrictEqual([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);

      expect(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[2]
          .cells[1].innerHTML
      ).toBe("");
    });

    it("Game field not change after click. User is player. isActive is false", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[0]
          .cells[2]
      );

      expect((store.getState() as IState).gameField).toStrictEqual([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);

      expect(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[2]
          .cells[1].innerHTML
      ).toBe("");
    });

    it("Game must understand, what winner - cross player. Case: Vertical line #1.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[0]
          .cells[0]
      );

      expect((store.getState() as IState).winner).toStrictEqual({
        name: "Bob",
      });

      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bob is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Game must understand, what winner - cross player. Case: Vertical line #2.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[1]
          .cells[1]
      );

      expect((store.getState() as IState).winner).toStrictEqual({
        name: "Bob",
      });

      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bob is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Game must understand, what winner - cross player. Case: Vertical line #3.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[2]
          .cells[2]
      );

      expect((store.getState() as IState).winner).toStrictEqual({
        name: "Bob",
      });

      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bob is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Game must understand, what winner - zero player. Case: Horizontal line #1.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[0]
          .cells[0]
      );

      expect((store.getState() as IState).winner).toStrictEqual({
        name: "Bill",
      });

      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bill is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Game must understand, what winner - zero player. Case: Horizontal line #2.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[1]
          .cells[1]
      );

      expect((store.getState() as IState).winner).toStrictEqual({
        name: "Bill",
      });

      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bill is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Game must understand, what winner - zero player. Case: Horizontal line #3.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[2]
          .cells[2]
      );

      expect((store.getState() as IState).winner).toStrictEqual({
        name: "Bill",
      });

      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bill is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Game must understand, what winner - cross player. Case: Diagonal line #1.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[2]
          .cells[2]
      );

      expect((store.getState() as IState).winner).toStrictEqual({
        name: "Bob",
      });

      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bob is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Game must understand, what winner - cross player. Case: Diagonal line #2.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[2]
          .cells[0]
      );

      expect((store.getState() as IState).winner).toStrictEqual({
        name: "Bob",
      });

      expect(
        screen.queryByText("The game ended in a draw")
      ).not.toBeInTheDocument();
      expect(screen.getByText("Bob is winner!!!")).toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });

    it("Game must understand, what it end in a draw.", () => {
      userEvent.click(
        (screen.getByTestId("gameFieldTable") as HTMLTableElement).rows[1]
          .cells[1]
      );

      expect((store.getState() as IState).winner).toStrictEqual("Draw");

      expect(screen.getByText("The game ended in a draw")).toBeInTheDocument();
      expect(screen.queryByText("Bob is winner!!!")).not.toBeInTheDocument();
      expect(screen.queryByTestId("resetButton")).toBeInTheDocument();
    });
  });
});
