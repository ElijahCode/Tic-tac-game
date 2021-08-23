export function createStateClone(state: IState): IState {
  return {
    isActive: state.isActive,
    gameField: [
      [...state.gameField[0]],
      [...state.gameField[1]],
      [...state.gameField[2]],
    ],
    players: [{ ...state.players[0] }, { ...state.players[1] }],
    userRole: state.userRole,
    watchers: [
      ...state.watchers.map((watcher: User) => ({
        ...watcher,
      })),
    ],
  };
}
