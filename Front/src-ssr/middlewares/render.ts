import { RenderError } from '@quasar/app-webpack';
import { ssrMiddleware } from 'quasar/wrappers';
import puppeteer from 'puppeteer';
import { Express, Request, Response, NextFunction } from 'express';

import helmet from 'helmet';
import axios from 'axios';

// Esta función middleware permite mostrar iframes de cualquier origen

const allowAllIframes = (_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Security-Policy', "frame-ancestors *");
  next();
};

function isValidUrl(input:string) {
  try {
    new URL(input);
    return true;
  } catch (error) {
    return false;
  }
}

interface MiddlewareParams {
  app: Express;
  resolve: {
    urlPath: (path: string) => string;
  };
  render: (options: { req: Request, res: Response }) => Promise<string>;
  serve: {
    error: (options: { err: Error, req: Request, res: Response }) => void;
  };
}

export default ({ app, resolve, render, serve }: MiddlewareParams) => {
  app.use(helmet()); // Agregar configuraciones de seguridad por defecto

  app.all(resolve.urlPath('*'), (req: Request, res: Response, next: NextFunction) => {
    console.log('someone requested:', req.url);
    next();
  });
  // Utilizamos el middleware recién creado para permitir iframes de cualquier origen
  app.use(allowAllIframes);

  app.get('/proxy', async (req, res) => {
    const { url } = req.query as { url: string };

    if (!url) {
      return res.status(400).send('Falta la URL');
    }

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');


      await page.goto(url);

      const html = await page.content();

      await browser.close();

      res.send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar la página');
    }
  });


  app.get('/loadPage', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).send('Falta la URL');
    }

    const options = {
      waitForTimeout: 30000, // Tiempo máximo de espera en milisegundos
    };

    try {
      const response = await axios.get(url as string, { timeout: options.waitForTimeout });
      const html = response.data;

      const checkPageLoaded = async (): Promise<void> => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000); // Espera 2 segundos como ejemplo antes de resolver
        });
      };


      await checkPageLoaded();

      res.send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar la página');
    }
  });




  app.get(resolve.urlPath('*'), (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html');

    render({ req, res })
      .then(html => {
        res.send(html);
      })
      .catch(err => {
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url);
          } else {
            res.redirect(err.url);
          }
        } else if (err.code === 404) {
          res.status(404).send('404 | Page Not Found');
        } else if (process.env.DEV) {
          serve.error({ err, req, res });
        } else {
          res.status(500).send('500 | Internal Server Error');
        }
      });
  });
};
