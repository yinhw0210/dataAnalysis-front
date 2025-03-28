import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface Store {
  useInfo?: {
    name: string
    age: number
  }
  setUseInfo: (useInfo: Store['useInfo']) => void
  getUseInfo: () => Store['useInfo']
}

const useStore = createWithEqualityFn<Store>()(
  persist(
    immer((set, get) => ({
      useInfo: {
        name: '张三',
        age: 18,
      },
      setUseInfo: (useInfo: Store['useInfo']) => set({ useInfo }),
      getUseInfo: () => get().useInfo,
    })),
    {
      name: 'store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
  shallow,
)

export default useStore
