import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { University } from '../../types/university'

interface UniversityState {
  universities: University[]
}

const initialState: UniversityState = {
    universities: [],
}

export const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
    emptyUniversities: (state) => {
      state.universities = []
    },
    setUniversities: (state, action: PayloadAction<University[]>) => {
      state.universities = action.payload
    },
  },
})

export const { setUniversities, emptyUniversities } = universitySlice.actions

export default universitySlice.reducer