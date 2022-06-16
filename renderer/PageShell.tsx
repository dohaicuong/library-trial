import { Suspense } from 'react'
import { JotaiProvider } from './providers/jotai'
import { ThemeProvider } from './providers/mantine'
import { QueryProvider } from './providers/query'

export type PageShellProps = {
  children: React.ReactNode
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    // TODO: App level loader
    // TODO: App level error boundary
    <Suspense>
      <ThemeProvider>
        <JotaiProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </JotaiProvider>
      </ThemeProvider>
    </Suspense>
  )
}
