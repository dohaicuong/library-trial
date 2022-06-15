import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { jwtAtom } from '../features/auth/jwtAtom'

const Root = () => {
  const jwt = useAtomValue(jwtAtom)
  const navigate = useNavigate()

  useEffect(() => {
    if (!jwt) navigate('/login')
    // else navigate('/home')
  }, [jwt])

  return <Outlet />
}

export default Root
