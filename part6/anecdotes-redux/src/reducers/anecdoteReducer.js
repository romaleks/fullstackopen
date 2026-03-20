import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map((anecdote) =>
        anecdote.id === id ? action.payload : anecdote,
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

const { createAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdoteService.updateVotes(anecdote)
    dispatch(updateAnecdote(changedAnecdote))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
