import { ssrProductionExport } from 'quasar/wrappers'
import express, { Express } from 'express';
import compression from 'compression'

export default ssrProductionExport(({
                                      app, port, isReady, ssrHandler,
                                      resolve, publicPath, folders, render, serve
                                    }) => {
  // something to do with the server "app"
  // return whatever you want your webserver to export (handler for serverless?)
})
/**
 * Create your webserver and return its instance.
 * If needed, prepare your webserver to receive
 * connect-like middlewares.
 *
 * Should NOT be async!
 */
export function create( /* { ... } */ ): Express {
  const app: Express = express();

  // attackers can use this header to detect apps running Express
  // and then launch specifically-targeted attacks
  app.disable('x-powered-by');

  // place here any middlewares that
  // absolutely need to run before anything else
  if (process.env.PROD) {
    app.use(compression());
  }

  return app;
}

/**
 * You need to make the server listen to the indicated port
 * and return the listening instance or whatever you need to
 * close the server with.
 *
 * The "listenResult" param for the "close()" definition below
 * is what you return here.
 *
 * For production, you can instead export your
 * handler for serverless use or whatever else fits your needs.
 */
export async function listen({ app, port, isReady, ssrHandler }: { app: Express, port: number, isReady: () => Promise<void>, ssrHandler: any }): Promise<any> {
  await isReady();
  return app.listen(port, () => {
    if (process.env.PROD) {
      console.log('Server listening at port ' + port);
    }
  });
}

/**
 * Should close the server and free up any resources.
 * Will be used on development only when the server needs
 * to be rebooted.
 *
 * Should you need the result of the "listen()" call above,
 * you can use the "listenResult" param.
 *
 * Can be async.
 */
export async function close({ listenResult }: { listenResult: any }): Promise<void> {
  return listenResult.close();
}

const maxAge: number = process.env.DEV
  ? 0
  : 1000 * 60 * 60 * 24 * 30;

/**
 * Should return middleware that serves the indicated path
 * with static content.
 */
export function serveStaticContent(path: string, opts: any): Express {
  return <Express>express.static(path, {
    maxAge,
    ...opts
  });
}

const jsRE: RegExp = /\.js$/;
const cssRE: RegExp = /\.css$/;
const woffRE: RegExp = /\.woff$/;
const woff2RE: RegExp = /\.woff2$/;
const gifRE: RegExp = /\.gif$/;
const jpgRE: RegExp = /\.jpe?g$/;
const pngRE: RegExp = /\.png$/;

/**
 * Should return a String with HTML output
 * (if any) for preloading indicated file
 */
export function renderPreloadTag(file: string): string {
  if (jsRE.test(file)) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }

  if (cssRE.test(file)) {
    return `<link rel="stylesheet" href="${file}">`;
  }

  if (woffRE.test(file)) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }

  if (woff2RE.test(file)) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }

  if (gifRE.test(file)) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`;
  }

  if (jpgRE.test(file)) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  }

  if (pngRE.test(file)) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`;
  }

  return '';
}
