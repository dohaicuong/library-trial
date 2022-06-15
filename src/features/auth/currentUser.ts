import { atomWithStorage } from 'jotai/utils'

export const currentUserAtom = atomWithStorage<User | undefined>('user', undefined)

export type User = {
  // instance: string
  // instance_name: string

  id: number
  mail: string
  first_name: string
  last_name: string
  avatar: UserAvatar
}

type UserAvatar = {
  email: string
  image_color: string
  image_initials: string
  image_style: string
  uri?: string | null
}
