/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 **/

import { join } from 'path'
import express from 'express'
import { renderToString } from '@vue/server-renderer'
import createRenderer from '@quasar/ssr-helpers/create-renderer'

import renderTemplate from './render-template.js'
import serverManifest from './quasar.server-manifest.json'
import clientManifest from './quasar.client-manifest.json'
import injectMiddlewares from './ssr-middlewares.js'

import productionExport from 'src-ssr/production-export'

const app = express()
const port = process.env.PORT || 3000

const doubleSlashRE = /\/\//g
const publicPath = `/`
const resolveUrlPath = publicPath === '/'
  ? url => url || '/'
  : url => url ? (publicPath + url).replace(doubleSlashRE, '/') : publicPath

const rootFolder = __dirname
const publicFolder = join(__dirname, 'www')

function resolvePublicFolder () {
  return join(publicFolder, ...arguments)
}

const serveStatic = (path, opts = {}) => {
  return express.static(resolvePublicFolder(path), {
    ...opts,
    maxAge: opts.maxAge === void 0
      ? 2592000000
      : opts.maxAge
  })
}

// create the renderer
const render = createRenderer({
  vueRenderToString: renderToString,
  basedir: __dirname,
  serverManifest,
  clientManifest,
  manualStoreSerialization: false
})



// serve "www" folder (includes the "public" folder)
app.use(resolveUrlPath('/'), serveStatic('.'))

const middlewareParams = {
  app,
  resolve: {
    urlPath: resolveUrlPath,
    root () { return join(rootFolder, ...arguments) },
    public: resolvePublicFolder
  },
  publicPath,
  folders: {
    root: rootFolder,
    public: publicFolder
  },
  render: ssrContext => render(ssrContext, renderTemplate),
  serve: {
    static: serveStatic
  }
}

// inject custom middleware
const appPromise = injectMiddlewares(middlewareParams)

const isReady = () => appPromise

const ssrHandler = (req, res, next) => {
  return isReady().then(() => app(req, res, next))
}

export default productionExport({
  port,
  isReady,
  ssrHandler,
  ...middlewareParams
})
