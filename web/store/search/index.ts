import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { University } from '../user/types'
import { SearchState } from './types'

const initialState: SearchState = {
  search: '',
  result: []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setResult: (state, action: PayloadAction<University[]>) => {
      state.result = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateSearch, setResult } = searchSlice.actions

export default searchSlice.reducer