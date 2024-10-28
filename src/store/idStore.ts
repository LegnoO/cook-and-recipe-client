import { create } from "zustand";

type ModalState = {
  ids: string[];
  addId: (newId: string) => void;
  removeId: (newId: string) => void;
  toggleId: (newId: string) => void;
};

export const idStore = create<ModalState>((set) => ({
  ids: [],
  addId: (newId) =>
    set(({ ids }) => {
      if (!ids.includes(newId)) {
        return { ids: [...ids, newId] };
      }

      return { ids };
    }),
  removeId: (newId) =>
    set(({ ids }) => {
      return {
        ids: ids.filter((id) => id !== newId),
      };
    }),
  toggleId: (newId) =>
    set(({ ids }) => {
      return {
        ids: ids.includes(newId)
          ? ids.filter((id) => id !== newId)
          : [...ids, newId],
      };
    }),
}));

idStore.subscribe(() => {});
