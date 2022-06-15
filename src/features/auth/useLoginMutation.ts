import { useSetAtom } from 'jotai'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { currentUserAtom, User } from './currentUser'
import { jwtAtom } from './jwtAtom'
import fetch from 'cross-fetch'

export type LoginInput = {
  email: string
  password: string
}

export type LoginPayload = User & {
  jwt: string
}

export type LoginError = {
  error: string
  message: string
  statusCode: number // 400 403 404 200
}

export const loginInputSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
})

export const useLoginMutation = () => {
  const setCurrentUser = useSetAtom(currentUserAtom)
  const setJwt = useSetAtom(jwtAtom)

  return useMutation<
    LoginPayload,
    Error | LoginError,
    LoginInput
  >(async input => {
    return fetch('https://api.go1.co/user/account/login?allAccounts=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: input.email,
        password: input.password,
        portal: '',
      })
    })
    .then(async res => {
      if (res.status === 200) return res.json()
      throw await res.json()
    })
    .then((res: LoginPayload) => {
      setJwt(res.jwt)
      setCurrentUser({
        id: res.id,
        mail: res.mail,
        first_name: res.first_name,
        last_name: res.last_name,
        avatar: res.avatar,
      })
      return res
    })
  })
}
