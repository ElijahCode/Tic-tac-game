import React from "react";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: IState) => ({
    isActive: state.isActive,
    gameField: state.gameField,
    userRole: state.userRole,
    players: state.players,
    watchers: state.watchers
  });
  
const GameFiledConnector = connect(mapStateToProps);
  
type IGameFiledProps = ConnectedProps<typeof GameFiledConnector>;

export class GameField extends React.Component<IGameFiledProps, IState> {
    state = {
        isActive: this.props.isActive,
        gameField: this.props.gameField,
        players: this.props.players,
        userRole: this.props.userRole,
        watchers: this.props.watchers
    }

    render(): JSX.Element {
        const layout = <div>
            <div>
                <p>{`${this.state.players[0]}`}</p><p> vs </p><p>{`${this.state.players[1]}`}</p>
            </div>
            <table>
                <tbody>
                    {this.state.gameField.map((row, rowIndex) => {
                        const rowLayout = <tr key={`${rowIndex}`}>
                            {row.map((cell, cellIndex) => {
                                const probablyValues = ['X', 'O'];
                                const cellValue = probablyValues[cell];
                                return <td key={`${cellIndex}`}>{`${cellValue}`}</td>
                            })}
                        </tr>
                        return rowLayout
                    })}
                </tbody>
            </table>
            <ol>
                {this.state.watchers.map((watcher, index) => <ul key={`${index}`}>{`${watcher}`}</ul>)}
            </ol>
        </div>
        return layout;
    }
}