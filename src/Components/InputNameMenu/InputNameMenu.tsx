import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { updateStateCurrentPlayer } from "../../reducer/action";

const mapStateToProps = (state: IState) => ({
  currentPlayer: state.currentPlayer,
});

const mapDispatchToProps = {
  updateStateCurrentPlayer,
};

const InputNameMenuConnector = connect(mapStateToProps, mapDispatchToProps);

type InputNameMenuWithoutConnectorProps = ConnectedProps<
  typeof InputNameMenuConnector
>;

class InputNameMenuWithoutConnector extends React.Component<
  InputNameMenuWithoutConnectorProps,
  Pick<IState, "currentPlayer">
> {
  state = {
    currentPlayer: this.props.currentPlayer,
  };

  getName = () => {
    const name = (document.querySelector(".nameMenu_input") as HTMLInputElement)
      .value;

    this.props.updateStateCurrentPlayer({
      name,
    });
  };

  onButtonCLick = () => {
    this.getName();
  };

  onInputEnterKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      this.getName();
    }
  };

  render() {
    const layout = (
      <div data-testid="inputNameMenu_block">
        <p data-testid="inputNameMenu_parag">
          Hello! Before you come in game as player or watcher, please, enter
          your name:
        </p>
        <input
          type="text"
          className="nameMenu_input"
          onKeyDown={this.onInputEnterKeyDown}
          data-testid="inputNameMenu_input"
        />{" "}
        <button
          className="nameMenu_button"
          onClick={this.onButtonCLick}
          data-testid="inputNameMenu_button"
        >
          Enter
        </button>
      </div>
    );

    return layout;
  }
}

export const InputNameMenu = InputNameMenuConnector(
  InputNameMenuWithoutConnector
);
