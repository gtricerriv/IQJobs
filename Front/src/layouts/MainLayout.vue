<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-pa-md" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <SearchBar style="width: 40vw" />

        <q-toolbar-title>
          <q-img width="100px" src="~assets/iqjobs.png" />
        </q-toolbar-title>

        <div>
          {{ $q.version }}
        </div>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleRightDrawer"
        />
        <q-btn-dropdown
      flat
      color=""
      icon="account_circle"
    >
      <div class="row no-wrap q-pa-md">
        <div class="column fit" style="justify-content: center; align-items: center;">
          <q-avatar size="72px">
            <q-icon name="account_circle" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ user ? user.given_name : 'Account'}}</div>

          <q-btn
            color="primary"
            :label="isAuthenticated ? 'Logout' : 'Login'"
            push
            size="sm"
            v-close-popup
            @click="loginOrLogout"
          />
          <q-toggle
            v-model="recruiter"
            color="pink"
            icon="supervised_user_circle"
            label="Recruiter"
          />

        </div>
    </div>
    </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <MenuComponent />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <iframe
        class="fit"
        title="W3Schools Free Online Web Tutorials"
        src="/widget-jobs"
        frameborder="0"
      ></iframe>
      <div class="absolute-bottom">
        <q-btn color="primary" class="fit" label="Aceptar Oferta" />
      </div>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, beforeUnmount } from 'vue';
import MenuComponent from 'components/Menu.vue';
import SearchBar from 'components/SearchBar.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

const menuAdmin = [
   { title: 'Users', icon: 'people', color: 'red', }, { title: 'Applicants', icon: 'translate', color: 'admin', },
   { title: 'Recruiters', icon: 'monitoring', color: 'admin', }, { title: 'Jobs', icon: 'list', color: 'admin', },
   { title: 'Settings', icon: 'list', color: 'admin', }, ];
export default defineComponent({
  name: 'MainLayout',
  components: {
    SearchBar,
    MenuComponent,
  },

  setup() {
  const router = useRouter();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const leftDrawerOpen = ref(false);
  const rightDrawerOpen = ref(true);

  const login = () => {
    loginWithRedirect();
  };

  const loginOrLogout = () => {
    console.log(isAuthenticated.value)
    if (isAuthenticated.value) {
      logout();
    } else {
      login();
    }
  };

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  const toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value;
  };
    return {
      essentialLinks: menuAdmin,
      isAuthenticated,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer,
      toggleRightDrawer,
      login,
      user,
      recruiter: ref(false),
      loginOrLogout
    };
  },

});
</script>