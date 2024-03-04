<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useAuth0 } from '@auth0/auth0-vue';

export default defineComponent({
  name: 'App',
  setup(){
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const restrictedRoutes = ['/admin', '/settingss', '/test']; // Lista de rutas restringidas

    onMounted(() => {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          console.log(isAuthenticated, 'auth')
          const currentRoute = window.location.pathname;
          console.log(isAuthenticated.value)
          if (!isAuthenticated.value && restrictedRoutes.includes(currentRoute)) {
            loginWithRedirect();
          }
        }, 1000);
      });
    });
  }
})
</script>
