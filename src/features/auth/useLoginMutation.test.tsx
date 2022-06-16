import { it, expect } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { useLoginMutation } from './useLoginMutation'
import { QueryProvider } from '../../../renderer/providers/query'

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryProvider>
    {children}
  </QueryProvider>
)

it('should return jwt, user if success login', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useLoginMutation(), { wrapper })
  
  result.current.mutate({
    email: 'email@gmail.com',
    password: 'password',
  })
  await waitForNextUpdate()
  expect(result.current.status).toBe('loading')
  expect(result.current.variables?.email).toBe('email@gmail.com')
  expect(result.current.variables?.password).toBe('password')

  await waitForNextUpdate()
  expect(result.current.status).toBe('success')
  expect(result.current.data?.jwt).toBe('some_jwt')
  expect(result.current.data?.id).toBe(1)
  expect(result.current.data?.mail).toBe('email@gmail.com')
})

it('should return error with wrong credentials', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useLoginMutation(), { wrapper })
  
  result.current.mutate({
    email: 'email@gmail.com',
    password: 'not_password',
  })
  await waitForNextUpdate()
  expect(result.current.status).toBe('loading')

  await waitForNextUpdate()
  expect(result.current.error?.message).toBe('Wrong credentials')
})
