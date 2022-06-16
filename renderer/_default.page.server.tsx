import {
  dangerouslySkipEscape,
  escapeInject,
  type PageContextBuiltIn,
} from 'vite-plugin-ssr'
import { renderToStream } from 'react-streaming/server'
import { StaticRouter } from 'react-router-dom/server'

import { createStylesServer, ServerStyles } from '@mantine/ssr'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'

import { PageShell } from './PageShell'

export type PageContext = PageContextBuiltIn & {
  userAgent: string
}

export const render = async (pageContext: PageContext) => {
  const { Page, url, userAgent } = pageContext
  const page = (
    <StaticRouter location={url}>
      <PageShell>
        <Page />
      </PageShell>
    </StaticRouter>
  )
  
  const stream = await renderToStream(page, { userAgent })
  const styles = getServerStyles(page)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Go1 SSR streaming app</title>
        ${dangerouslySkipEscape(styles)}
      </head>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>
  `

  return {
    documentHtml,
    pageContext: {}
  }
}

// ssr style to solve the style flashing problem
const stylesServer = createStylesServer()
const getServerStyles = (page: JSX.Element) => {
  const content = renderToString(page)
  return renderToStaticMarkup(<ServerStyles html={content} server={stylesServer} />)
}
