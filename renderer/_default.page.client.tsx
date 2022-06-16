import { Root, createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { type PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { PageShell } from './PageShell'

export const clientRouting = true

let containerRoot: Root | null = null
export const render = (pageContext: PageContextBuiltInClient) => {
  const container = document.getElementById('page-view')
  if (!container) throw new Error('Element with id "page-view" not found.')

  if (containerRoot) return

  const { Page, isHydration } = pageContext
  const page = (
    <BrowserRouter>
      <PageShell>
        <Page />
      </PageShell>
    </BrowserRouter>
  )

  if (isHydration) {
    containerRoot = hydrateRoot(container, page)
    return
  }
  
  containerRoot = createRoot(container)
  containerRoot.render(page)
}
