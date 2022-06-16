import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const LoginPage = lazy(() => import('../src/pages/login'))
const NotFound = lazy(() => import('../src/pages/notfound'))

const Root = lazy(() => import('../src/pages/root'))
const HomePage = lazy(() => import('../src/pages/home'))
const PortalSelectionPage = lazy(() => import('../src/pages/portal_select'))

export { Page }
const Page = () => (
  <Routes>
    <Route path='/' element={<Root />}>
      <Route path='/home' element={<HomePage />} />
      <Route
        path='/portal-select'
        element={<PortalSelectionPage />}
      />
    </Route>

    <Route path='/login' element={<LoginPage />} />
    
    <Route path='*' element={<NotFound />} />
  </Routes>
)
