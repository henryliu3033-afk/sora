import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBookingStore = create(
  persist(
    (set, get) => ({
      reservations: [],

      book: (data) => {
        const res = {
          id: `RES-${Date.now()}`,
          ...data,
          status: '已確認',
          createdAt: new Date().toISOString(),
        }
        set({ reservations: [res, ...get().reservations] })
        return res
      },

      cancel: (id) =>
        set({ reservations: get().reservations.map(r => r.id === id ? { ...r, status: '已取消' } : r) }),
    }),
    { name: 'sora-bookings' }
  )
)
