import { create } from 'zustand'
import { User } from '../types/user';

type UserStore = {
  data: User | null
  set: (data) => void,
  clear: () => void,
}

export const useUserData = create<UserStore>()((set) => ({
  data: null,
  set: (data) => set((state) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
    return ({ ...state,data:{...data} })
  }),
clear: () => set((state) => ({})),
}))


