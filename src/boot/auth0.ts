import { boot } from 'quasar/wrappers';
import { createAuth0 } from '@auth0/auth0-vue';

import { Auth0Client } from '@auth0/auth0-spa-js';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do
  const auth0 = await createAuth0({
    domain: 'tech-iqjobs.us.auth0.com',
    clientId: 'szd18YgGw6dSQUGkmwXdw9Ew2mYJGInF',
    authorizationParams: {
      // redirect_uri: window.location.origin
      redirect_uri: '127.0.0.1:8080',
    },
  });
  app.use(auth0);

  app.config.globalProperties.$auth0 = auth0;
});
