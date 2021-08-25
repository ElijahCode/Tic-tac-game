export function createStateClone(state: IState): IState {
  const winner =
    typeof state.winner === "string" ? state.winner : { ...state.winner };
  return {
    isActive: state.isActive,
    gameField: [
      [...state.gameField[0]],
      [...state.gameField[1]],
      [...state.gameField[2]],
    ],
    currentPlayer: { ...state.currentPlayer },
    players: [{ ...state.players[0] }, { ...state.players[1] }],
    userRole: state.userRole,
    watchers: [
      ...state.watchers.map((watcher: User) => ({
        ...watcher,
      })),
    ],
    winner,
  };
}
