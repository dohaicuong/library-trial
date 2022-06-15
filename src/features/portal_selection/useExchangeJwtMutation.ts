import { useAtom } from 'jotai'
import { useMutation } from 'react-query'
import { jwtAtom } from '../auth/jwtAtom'
import fetch from 'cross-fetch'

type ExchangeJwtInput = {
  portal: string
}

type ExchangeJwtPayload = {
  jwt: string
}

export const useExchangeJwtMutation = () => {
  const [jwt, setJwt] = useAtom(jwtAtom)
  return useMutation<ExchangeJwtPayload, any, ExchangeJwtInput>(async input => {
    return fetch('https://api.go1.co/user/jwt-exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({ portal: input.portal })
    })
    .then(async res => {
      if (res.status === 200) return res.json()
      throw await res.json()
    })
    .then(data => {
      setJwt(data.jwt)
      return data
    })
  })
}