import { create } from 'zustand';

type UserMenuStore = {
    isOpen: boolean;
    toggleMenu: () => void;
};

export const userMenuStore = create<UserMenuStore>((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));