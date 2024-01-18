import { create } from 'zustand'
import { University } from '../types/university'

type Store = {
  data: {
    selectedUniversity: University
  }
  setData: (paylad : University) => void
}

const useUniversityStore = create<Store>()((set) => ({
  data: {
    selectedUniversity: null
  },
  setData: (payload) => set((state) => {
    localStorage.setItem('selectedUniversity', JSON.stringify(payload))
    return { ...state, data: {selectedUniversity:{...payload}}}
  }),
}))

export default useUniversityStore