/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { App } from "./App";
import { reducer } from "../../reducer/reducer";
import { statesAsset } from "./testData";
import { createStateClone } from "../../createStateClone/createCloneState";

describe("Testing App component", () => {
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
        <App />
      </Provider>
    );

    stateAssetIndex += 1;
  });

  describe("Markup testing", () => {
    it('InputNameMenu renders then currentPlayer name is ""', () => {
      expect(screen.getByTestId("inputNameMenu_block")).toBeInTheDocument();
      expect(screen.queryByTestId("loader_block")).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("gameFieldBlockMain")
      ).not.toBeInTheDocument();
    });
    it('Loader renders then players names is ""', () => {
      expect(
        screen.queryByTestId("inputNameMenu_block")
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("loader_block")).toBeInTheDocument();
      expect(
        screen.queryByTestId("gameFieldBlockMain")
      ).not.toBeInTheDocument();
    });
    it("GameFiled renders then players and current player names is known", () => {
      expect(
        screen.queryByTestId("inputNameMenu_block")
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("loader_block")).not.toBeInTheDocument();
      expect(screen.getByTestId("gameFieldBlockMain")).toBeInTheDocument();
    });
  });
});
