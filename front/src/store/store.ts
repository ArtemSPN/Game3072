import { createSlice, configureStore, PayloadAction, Slice } from '@reduxjs/toolkit'
import { getInitialValue } from '../function/getInitialValue';

const init: UserSchema = getInitialValue();

const userSlice: Slice<any> = createSlice({
    name: 'user',
    initialState: init,
    reducers: {
      setBestScore: (state, actions: PayloadAction<number>) => {
        if(state.bestScore < actions.payload){
          state.bestScore = actions.payload
          window.localStorage.setItem('user', JSON.stringify({
          username: state.username,
          password: state.password,
          _id: state.id,
          avatar: state.avatar,
          bestScore: state.bestScore,
          gameCount: state.gameCount
        }));
        }
      },
      setUser: (state, actions: PayloadAction<UserSchema>) => {
        console.log(actions.payload)

        state.username = actions.payload.username
        state.password = actions.payload.password
        state.avatar = actions.payload.avatar
        state.bestScore = actions.payload.bestScore
        state.id= actions.payload.id
        state.gameCount = actions.payload.gameCount
      },
      incrementGameCount: state => {
        state.gameCount++;
        window.localStorage.setItem('user', JSON.stringify({
          username: state.username,
          password: state.password,
          _id: state.id,
          avatar: state.avatar,
          bestScore: state.bestScore,
          gameCount: state.gameCount
        }));
      }
    }
})

export const userAction = userSlice.actions

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
  })

interface UserSchema {
    username: string;
    bestScore: number;
    avatar: string;
    password: string;
    gameCount: number;
    id: string;
};

export interface StateShame {
  user: UserSchema
}