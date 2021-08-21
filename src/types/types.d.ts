interface User {
    name: string;
}

type CellValue = '' | 'X' | 'O';

type userRole = {
    crossPlayer: 0,
    zeroPlayer: 1,
    watcher: 2
}

interface IState {
    isActive: boolean;
    gameField: [number[], number[], number[]];
    players: [User, User];
    userRole: userRole['crossPlayer'] | userRole['zeroPlayer'] | userRole['watcher'];
    watchers: User[];
}