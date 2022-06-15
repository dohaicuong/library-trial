import { atomWithInfiniteQuery } from 'jotai/query'
import { jwtAtom } from '../auth/jwtAtom'
import fetch from 'cross-fetch'

export const portalAtom = atomWithInfiniteQuery(get => ({
  queryKey: [get(jwtAtom), 'me', 'portals'],
  queryFn: async ({ queryKey: [jwt] }) => {
    const url = 'https://api.go1.co/user/account/me?x-expensive=1&addPortalConfig=false'
    return fetch(`${url}&offset=0&limit=100`, {
      headers: {
        authorization: `Bearer ${jwt}`
      }
    })
    .then(res => res.json())
    .then(data => data.accounts)
  },
}))
