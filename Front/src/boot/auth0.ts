import { boot } from 'quasar/wrappers';
import { createAuth0 } from '@auth0/auth0-vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do
 const auth0 = createAuth0({
    domain: 'tech-iqjobs.us.auth0.com',
    clientId: 'szd18YgGw6dSQUGkmwXdw9Ew2mYJGInF',
    authorizationParams: {
      redirect_uri: '/',
    },
  });
  app.use(auth0);
});
