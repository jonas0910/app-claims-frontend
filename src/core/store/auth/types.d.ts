import { UserAuth } from "@/modules/auth/login/types/login"

export type GlobalState = {
  isAuth: boolean
  token: string | null
  token_expires_at: string | null
  user: UserAuth | null
}

export type Actions = {
  verifySession: () => void

  setLogin: ({
    token,
    token_expires_at,
    user
  }: {
    token: string
    token_expires_at: string | null
    user: UserAuth
  }) => void
  setLogout: () => void
}
