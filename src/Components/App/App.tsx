import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { GameField } from "../GameField/GameField";
import { InputNameMenu } from "../InputNameMenu/InputNameMenu";
import { Loader } from "../Loader/Loader";
import {
  setState,
  updateIsActive,
  updateStateGameFiled,
  updateStateCurrentPlayer,
  updateStatePlayers,
  updateStateUserRole,
  updateStateWatchers,
  updateStateWinner,
} from "../../reducer/action";

const mapStateToProps = (state: IState) => ({
  isActive: state.isActive,
  gameField: state.gameField,
  userRole: state.userRole,
  currentPlayer: state.currentPlayer,
  players: state.players,
  watchers: state.watchers,
  winner: state.winner,
});

const mapDispatchToProps = {
  setState,
  updateIsActive,
  updateStateGameFiled,
  updateStateCurrentPlayer,
  updateStatePlayers,
  updateStateUserRole,
  updateStateWatchers,
  updateStateWinner,
};

const AppConnector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof AppConnector>;

class AppWithoutConnect extends React.Component<
  AppProps,
  Pick<IState, "players" | "currentPlayer">
> {
  state = {
    currentPlayer: this.props.currentPlayer,
    players: this.props.players,
  };

  render() {
    const firstPlayerName = this.state.players[0].name;
    const secondPlayerName = this.state.players[1].name;
    const layout = (
      <div data-testid="App_mainBlock">
        {this.state.currentPlayer.name === "" && <InputNameMenu />}
        {this.state.currentPlayer.name !== "" &&
          firstPlayerName === "" &&
          secondPlayerName === "" && <Loader />}
        {this.state.currentPlayer.name !== "" &&
          firstPlayerName !== "" &&
          secondPlayerName !== "" && <GameField />}
      </div>
    );

    return layout;
  }
}

export const App = AppConnector(AppWithoutConnect);
