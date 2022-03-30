import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export const selectUser = (state: RootState) => state.userReducer.user
export const selectUniversities = (state: RootState) => state.userReducer.universities
export const selectUniversity = (state: RootState) => state.userReducer.university
