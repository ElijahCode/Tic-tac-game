import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  setState,
  updateIsActive,
  updateStateGameFiled,
  updateStatePlayers,
  updateStateUserRole,
  updateStateWatchers,
  updateStateWinner,
} from "../../reducer/action";
import { createStateClone } from "../../createStateClone/createCloneState";

interface HTMLTableCellWithKey extends HTMLTableCellElement {
  key: number;
}

interface HTMLTableRowWithKey extends HTMLTableRowElement {
  key: number;
}

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
  updateStatePlayers,
  updateStateUserRole,
  updateStateWatchers,
  updateStateWinner,
};

const GameFieldConnector = connect(mapStateToProps, mapDispatchToProps);

type IGameFiledProps = ConnectedProps<typeof GameFieldConnector>;

class GameFieldWithoutConnect extends React.Component<IGameFiledProps, IState> {
  state = {
    isActive: this.props.isActive,
    gameField: this.props.gameField,
    currentPlayer: this.props.currentPlayer,
    players: this.props.players,
    userRole: this.props.userRole,
    watchers: this.props.watchers,
    winner: this.props.winner,
  };

  onTableClick = (event: React.MouseEvent) => {
    if (
      this.state.userRole === "watcher" ||
      !this.state.isActive ||
      this.state.winner !== "none" ||
      (event.target as HTMLTableCellWithKey).innerHTML !== ""
    ) {
      return;
    }

    const cellIndex = Number((event.target as HTMLTableCellWithKey).id);
    const rowIndex = Number(
      (
        (event.target as HTMLTableCellWithKey).closest(
          "tr"
        ) as HTMLTableRowWithKey
      ).id
    );

    const newGameField = createStateClone(this.state).gameField;
    newGameField[rowIndex][cellIndex] =
      this.state.userRole === "cross" ? "X" : "O";

    this.props.updateStateGameFiled(newGameField);
    this.props.updateIsActive();

    this.setState({
      gameField: newGameField,
      isActive: false,
    });

    this.isGameEnd(newGameField);
  };

  onResetButtonClick = () => {
    const emptyField: IState["gameField"] = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.props.updateStateGameFiled(emptyField);
    this.setState({
      gameField: emptyField,
    });
  };

  isGameEnd(inputGameField: IState["gameField"]): void {
    let isPlayerWin = false;
    const userSign = this.state.userRole === "cross" ? "X" : "O";

    const gameField = inputGameField;

    gameField.forEach((row: CellValue[]) => {
      const isAllCellContainsUserSign: boolean = row.every(
        (cell) => cell === userSign
      );
      if (isAllCellContainsUserSign) {
        isPlayerWin = true;
      }
    });

    const verticalRows = [
      [gameField[0][0], gameField[1][0], gameField[2][0]],
      [gameField[0][1], gameField[1][1], gameField[2][1]],
      [gameField[0][2], gameField[1][2], gameField[2][2]],
    ];
    verticalRows.forEach((row: CellValue[]) => {
      const isAllCellContainsUserSign: boolean = row.every(
        (cell) => cell === userSign
      );
      if (isAllCellContainsUserSign) {
        isPlayerWin = true;
      }
    });

    const diagonals = [
      [gameField[0][0], gameField[1][1], gameField[2][2]],
      [gameField[2][0], gameField[1][1], gameField[0][2]],
    ];
    diagonals.forEach((row: CellValue[]) => {
      const isAllCellContainsUserSign: boolean = row.every(
        (cell) => cell === userSign
      );
      if (isAllCellContainsUserSign) {
        isPlayerWin = true;
      }
    });

    if (isPlayerWin) {
      this.props.updateStateWinner(this.state.currentPlayer);
      this.setState({
        winner: this.state.currentPlayer,
      });
      return;
    }

    const isDraw =
      gameField[0]
        .concat(gameField[1], gameField[2])
        .filter((cell: CellValue) => cell === "").length === 0;
    if (isDraw) {
      this.props.updateStateWinner("Draw");
      this.setState({
        winner: "Draw",
      });
    }
  }

  render(): JSX.Element {
    const layout = (
      <div data-testid="gameFieldBlockMain">
        <div data-testid="playerVersusBlock">
          <p>{`${this.state.players[0].name}`}</p>
          <p> vs </p>
          <p>{`${this.state.players[1].name}`}</p>
        </div>
        {this.state.winner !== "none" && this.state.winner !== "Draw" && (
          <div data-testid="winnerBlock">
            <p>{`${this.state.winner.name}`} is winner!!!</p>
          </div>
        )}
        {this.state.winner === "Draw" && (
          <div data-testid="drawBlock">
            <p>The game ended in a draw</p>
          </div>
        )}
        <table onClick={this.onTableClick} data-testid="gameFieldTable">
          <tbody>
            {this.state.gameField.map((row, rowIndex) => {
              const rowLayout = (
                <tr key={`${rowIndex}`} id={`${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${cellIndex}`}
                      id={`${cellIndex}`}
                    >{`${cell}`}</td>
                  ))}
                </tr>
              );
              return rowLayout;
            })}
          </tbody>
        </table>
        {this.state.userRole !== "watcher" && this.state.winner !== "none" && (
          <button onClick={this.onResetButtonClick} data-testid="resetButton">
            New Game
          </button>
        )}
        <ol data-testid="watchersList">
          {this.state.watchers.map((watcher, index) => (
            <ul key={`${index}`}>{`${watcher.name}`}</ul>
          ))}
        </ol>
      </div>
    );
    return layout;
  }
}

export const GameField = GameFieldConnector(GameFieldWithoutConnect);
