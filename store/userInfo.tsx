import { create } from 'zustand'
import { userRegDetails } from '@/types/userTypes'

interface UserStoreInterface {
    userDetails: userRegDetails | null;
    setUserDetails: (userDetails: userRegDetails | null) => void;
}

export const UserStore = create<UserStoreInterface>((set) => ({
    userDetails: null,
    setUserDetails: (userDetails) => set({ userDetails }),
}))