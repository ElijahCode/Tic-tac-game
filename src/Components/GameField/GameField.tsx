import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  setState,
  updateIsActive,
  updateStateGameFiled,
  updateStatePlayers,
  updateStateUserRole,
  updateStateWatchers,
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
      this.state.winner !== "none"
    ) {
      return;
    }

    const cellIndex = (event.target as HTMLTableCellWithKey).key;
    const rowIndex = (
      (event.target as HTMLTableCellWithKey).closest(
        "tr"
      ) as HTMLTableRowWithKey
    ).key;

    const newGameField = createStateClone(this.state).gameField;
    newGameField[rowIndex][cellIndex] =
      this.state.userRole === "cross" ? "X" : "O";

    this.props.updateStateGameFiled(newGameField);
    this.props.updateIsActive();

    this.setState({
      gameField: newGameField,
      isActive: false,
    });

    this.isGameEnd();
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

  isGameEnd(): void {
    let isPlayerWin = false;
    const userSign = this.state.userRole === "cross" ? "X" : "O";

    const { gameField } = this.state;

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
      this.setState({
        winner: "Draw",
      });
    }
  }

  render(): JSX.Element {
    const layout = (
      <div>
        <div>
          <p>{`${this.state.players[0]}`}</p>
          <p> vs </p>
          <p>{`${this.state.players[1]}`}</p>
        </div>
        {this.state.winner !== "none" && this.state.winner !== "Draw" && (
          <div>
            <p>{`${this.state.winner.name}`} is winner!!!</p>
          </div>
        )}
        {this.state.winner === "Draw" && (
          <div>
            <p>The game ended in a draw</p>
          </div>
        )}
        <table onClick={this.onTableClick}>
          <tbody>
            {this.state.gameField.map((row, rowIndex) => {
              const rowLayout = (
                <tr key={`${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cellIndex}`}>{`${cell}`}</td>
                  ))}
                </tr>
              );
              return rowLayout;
            })}
          </tbody>
        </table>
        {this.state.userRole !== "watcher" && this.state.winner !== "none" && (
          <button onClick={this.onResetButtonClick}>New Game</button>
        )}
        <ol>
          {this.state.watchers.map((watcher, index) => (
            <ul key={`${index}`}>{`${watcher}`}</ul>
          ))}
        </ol>
      </div>
    );
    return layout;
  }
}

export const GameFiled = GameFieldConnector(GameFieldWithoutConnect);
