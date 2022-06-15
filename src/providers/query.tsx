import { QueryClient, QueryClientProvider } from 'react-query'

// ssr client can be setup here
export const queryClient = new QueryClient()

export type QueryProviderProps = {
  children: React.ReactNode
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
