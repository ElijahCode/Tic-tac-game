/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { InputNameMenu } from "./InputNameMenu";
import { reducer } from "../../reducer/reducer";
import { statesAsset } from "./testData";
import { createStateClone } from "../../createStateClone/createCloneState";

describe("Testing InputNameMenu component", () => {
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
        <InputNameMenu />
      </Provider>
    );

    stateAssetIndex += 1;
  });

  describe("Testing basic markup", () => {
    it("Testing basic markup", () => {
      expect(screen.getByTestId("inputNameMenu_block")).toBeInTheDocument();
      expect(screen.getByTestId("inputNameMenu_parag")).toBeInTheDocument();
      expect(screen.getByTestId("inputNameMenu_input")).toBeInTheDocument();
      expect(screen.getByTestId("inputNameMenu_button")).toBeInTheDocument();
    });
  });

  describe("Testing funcionality", () => {
    it("Must change current player after click on button", () => {
      userEvent.type(screen.getByTestId("inputNameMenu_input"), "Bob");

      userEvent.click(screen.getByTestId("inputNameMenu_button"));

      expect(store.getState().currentPlayer).toStrictEqual({
        name: "Bob",
      });
    });

    it('Must change current player after push on "Enter" button', () => {
      userEvent.type(screen.getByTestId("inputNameMenu_input"), "Bob");

      userEvent.keyboard("[Enter]");

      expect(store.getState().currentPlayer).toStrictEqual({
        name: "Bob",
      });
    });
  });
});
