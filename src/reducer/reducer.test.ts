import { configureStore, EnhancedStore } from '@reduxjs/toolkit' 
import { reducer } from './reducer'
import { setState, updateIsActive,updateStateGameFiled, updateStatePlayers, updateStateUserRole,updateStateWatchers } from './action'
import '../types/types'

describe('Testing reducer', () => {

    let preloadedState: IState;
    let store: EnhancedStore;

    beforeEach(() => {
        preloadedState = {
            isActive: true,
            gameField: [
                [0,0,0],
                [0,0,0],
                [0,0,0],
            ],
            players: [
                {
                    name: ''
                },
                {
                    name: ''
                }
            ],
            userRole: 0,
            watchers: []
        }
    
        store = configureStore(
            {
                reducer,
                preloadedState
            }
        )
    })

    describe('Testing setState action', () => {
        it('Must correct change state', () => {
            const newState: IState = {
                isActive: false,
                gameField: [
                    [1,0,0],
                    [0,1,2],
                    [0,0,2],
                ],
                players: [
                    {
                        name: 'Bob'
                    },
                    {
                        name: 'Bill'
                    }
                ],
                userRole: 0,
                watchers: [
                    {
                    name: 'Jack'
                    },
                    {
                        name: 'Mike'
                    }
                ]
            }
    
            store.dispatch(setState(newState));
    
            expect(store.getState()).toStrictEqual(newState)
        })
    })

    describe('Testing change state isActive property', () => {
        it('Must correct change property', () => {

            const currentIsActive = store.getState().isActive;
            
            store.dispatch(updateIsActive());

            expect(store.getState().isActive).toBe(!(currentIsActive))
        })
    })

    describe('Testing change state gameField property', () => {
        it('Must correct change property', () => {
            const newGameField: IState['gameField'] =  [
                [1,0,0],
                [0,1,2],
                [0,0,2],
            ]

            store.dispatch(updateStateGameFiled(newGameField));

            expect(store.getState().gameField).toStrictEqual(newGameField)
        })
    })

    describe('Testing change state players property', () => {
        it('Must correct change property', () => {
            const newPlayers: IState['players'] = [
                {
                    name : "Bobby"
                },
                {
                    name: 'Ann'
                }
            ]

            store.dispatch(updateStatePlayers(newPlayers));

            expect(store.getState().players).toStrictEqual(newPlayers);
        })
    })

    describe('Testing change userRole', () => {
        it("Must correct change property", () => {
            const newUserRole = 1;

            store.dispatch(updateStateUserRole(newUserRole));

            expect(store.getState().userRole).toBe(newUserRole);
        })
    })
    
    describe('Testing change state watchers players', () => {
        it('Must correct change property', () => {
            const newWatchers: IState['watchers'] = [
                {
                    name: 'Bill'
                },
                {
                    name: 'Kate'
                },
                {
                    name: 'Anton'
                }
            ]
            
            store.dispatch(updateStateWatchers(newWatchers))

            expect(store.getState().watchers).toStrictEqual(newWatchers);
        })
    })
})