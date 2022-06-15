import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JotaiProvider } from './providers/jotai'
import { QueryProvider } from './providers/query'
import { ThemeProvider } from './providers/mantine'
import { lazy, Suspense } from 'react'

// import LoginPage from './pages/login'
// import NotFound from './pages/notfound'

// import Root from './pages/root'
// import HomePage from './pages/home'
// import PortalSelectionPage from './pages/portal_select'

const LoginPage = lazy(() => import('./pages/login'))
const NotFound = lazy(() => import('./pages/notfound'))

const Root = lazy(() => import('./pages/root'))
const HomePage = lazy(() => import('./pages/home'))
const PortalSelectionPage = lazy(() => import('./pages/portal_select'))

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <JotaiProvider>
        <QueryProvider>
          <Suspense>
            <Routes>
              <Route path='/' element={<Root />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/portal-select' element={<PortalSelectionPage />} />
              </Route>

              <Route path='/login' element={<LoginPage />} />
              
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </QueryProvider>
      </JotaiProvider>
    </ThemeProvider>
  </BrowserRouter>
)
