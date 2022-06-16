import { Provider } from 'jotai'

type JotaiProviderProps = {
  children: React.ReactNode
}

// use initial value if needed for SSR
export const JotaiProvider: React.FC<JotaiProviderProps> = ({ children }) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
