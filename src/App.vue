<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useAuth0 } from '@auth0/auth0-vue';
export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
    const restrictedRoutes = ['/admin', '/settingss', '/test']; // Lista de rutas restringidas

    onMounted(() => {
      setTimeout(() => {
        const currentRoute = window.location.pathname;
        if (restrictedRoutes.includes(currentRoute)) {
          console.log('sera aca?');

          loginWithRedirect();
        } else if (isAuthenticated.value) {
          console.log('entro al segundo if')
          $q.localStorage.set('userId', user.value?.sub)
        } else if (!$q.localStorage.getItem('userId') || $q.localStorage.getItem('userId') == 'undefined') {
          console.log('El local storage era undefined', $q.localStorage.getItem('userId'));
          console.log('El local storage era undefined', $q.localStorage.getItem('userId'), user.value?.sub);
          loginWithRedirect();
        }
      }, 6000)
    });
  }
})
</script>
