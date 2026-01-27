import { create } from 'zustand';

type DoctorMenuStore = {
    isOpen: boolean;
    toggleMenu: () => void;
};

export const doctorMenuStore = create<DoctorMenuStore>((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));