interface User {
  name: string;
}

type CellValue = "" | "X" | "O";

type userRole = "cross" | "zero" | "watcher";

interface IState {
  isActive: boolean;
  gameField: [CellValue[], CellValue[], CellValue[]];
  currentPlayer: User;
  players: [User, User];
  userRole: userRole;
  watchers: User[];
  winner: User | "none" | "Draw";
}
