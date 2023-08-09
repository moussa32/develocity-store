import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set({ items: [...get().items, item] }),
      removeItem: (itemId) => set({ items: get().items.filter((product) => product.id !== itemId) }),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
      store: createJSONStorage(() => AsyncStorage)
    }
  )
)

export default useCartStore
