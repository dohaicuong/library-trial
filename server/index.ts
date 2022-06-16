import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr'

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  app.use(compression())

  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  }
  else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: 'ssr' },
    })
    app.use(viteDevServer.middlewares)
  }

  app.get('*', async (req, res, next) => {
    renderPage({
      url: req.originalUrl,
      userAgent: req.headers['user-agent'],
    })
    .then(({ httpResponse }) => {
      if (!httpResponse) return next()

      const { contentType, statusCode } = httpResponse
      res.status(statusCode).type(contentType)
      httpResponse.pipe(res)
    })
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
