import { create } from 'zustand';

type HospitalMenuStore = {
    isOpen: boolean;
    toggleMenu: () => void;
};

export const hospitalMenuStore = create<HospitalMenuStore>((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));