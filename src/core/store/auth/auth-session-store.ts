import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from '@pheralb/toast'

import { Actions, GlobalState } from './types'

export const useAuthSessionStore = create(
  persist<GlobalState & Actions>(
    (set, get) => ({
      isAuth: false,
      token: null,
      token_expires_at: null,
      user: null,

      //   VERIFY SESSION
      verifySession: () => {
        const expired = get().token_expires_at! ? Date.now() > new Date(get().token_expires_at!).getTime() : false
        if (expired) {
          set((state) => ({
            ...state,
            isAuth: false,
            user: null,
            token: null,
            token_expires_at: null
          }))

          toast.warning({
            text: 'Advertencia',
            description: 'Tu session ha expirado, vuelve a iniciar session'
          })
        }
      },

      //   USER SESSION
      setLogin: ({ token, token_expires_at, user }) => {

        set((state) => ({
          ...state,
          isAuth: true,
          token,
          token_expires_at,
          user
        }))
      },
      setLogout: () => {
        set((state) => ({
          ...state,
          isAuth: false,
          token: null,
          token_expires_at: null,
          user: null
        }))
      },
    }),
    { name: 'reclamaciones-session' }
    // { name: 'auth-session-store' }
  )
)
