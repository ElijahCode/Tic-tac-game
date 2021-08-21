import { createReducer } from "@reduxjs/toolkit";
import { setState, updateIsActive,updateStateGameFiled, updateStatePlayers, updateStateUserRole, updateStateWatchers } from './action'
import { createStateClone } from '../createStateClone/createCloneState'

const initState: IState = {
    isActive: true,
    gameField: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    players: [{name: ''}, {name: ''}],
    userRole: 0,
    watchers: []
}

export const reducer = createReducer(initState, (builder) => {
    builder
        .addCase(setState, (state: IState, action) => action.payload)
        .addCase(updateStateGameFiled, (state: IState, action) => {
            const newState = createStateClone(state);
        
            const newGameField = action.payload;

            newState.gameField = newGameField;

            return newState;
        })
        .addCase(updateIsActive, (state: IState, action) => {
            const newState = createStateClone(state);

            const newIsActive = !(state.isActive);

            newState.isActive = newIsActive;

            return newState;
        })
        .addCase(updateStatePlayers, (state: IState, action) => {
            const newState = createStateClone(state);
        
            const newPlayers = action.payload;

            newState.players = newPlayers;

            return newState;
        })
        .addCase(updateStateUserRole, (state: IState, action) => {
            const newState = createStateClone(state);

            const newUserRole = action.payload;

            newState.userRole = newUserRole;

            return newState;
        })
        .addCase(updateStateWatchers, (state: IState, action) => {
            const newState = createStateClone(state);
        
            const newWatchers = action.payload;

            newState.watchers = newWatchers;

            return newState;
        })
})