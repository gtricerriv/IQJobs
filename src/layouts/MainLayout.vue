<template>
  <q-layout view="hHr lpR fFr">
    <q-header class="q-pa-md" elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <SearchBar style="width: 40vw" />

        <q-toolbar-title>
          <q-img width="100px" src="~assets/iqjobs.png" />
        </q-toolbar-title>

        <GoogleTraslate></GoogleTraslate>

        <NotificationBell></NotificationBell>

        <div>
          {{ $q.version }}
        </div>
        <q-btn flat dense round icon="build_circle" aria-label="build_circle" @click="toggleRightDrawer" />
        <q-btn-dropdown flat color="" icon="account_circle">
          <div class="row no-wrap q-pa-md">
            <div class="column fit" style="justify-content: center; align-items: center">
              <q-avatar size="72px">
                <q-icon name="account_circle" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">
                {{ user ? user.nickname : 'Account' }}
              </div>

              <q-btn color="primary" :label="isAuthenticated ? 'Logout' : 'Login'" push size="sm" v-close-popup
                @click="loginOrLogout" />
              <q-toggle v-if="!userStore.isAdmin" v-model="recruiter" @click="handleRoleToggle" color="pink"
                icon="supervised_user_circle" :label="recruiter ? 'Recruiter' : 'Aplicant'" />
            </div>
          </div>
        </q-btn-dropdown>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <MenuComponent />
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <WidgetComponent :description="widgetStore.widgetData.description" :position="widgetStore.widgetData.position"
        :provider="widgetStore.widgetData.provider" :title="widgetStore.widgetData.title" />
      <div class="absolute-bottom">
        <q-btn color="primary" class="fit" :label="userStore.getCurrentRole ? '' : 'Postular a Oferta'" />
      </div>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <AplicantDialog></AplicantDialog>

</template>
<style>
@media screen and (max-width: 767px) {
  .q-drawer--right {
    width: 80% !important;
  }
}
</style>
<script lang="ts">
import { setCssVar, LocalStorage } from 'quasar'
import { defineComponent, ref, onUpdated, onMounted, watch } from 'vue';
import MenuComponent from 'components/Menu.vue';
import NotificationBell from '../components/NotificationBell.vue';
import GoogleTraslate from '../components/GoogleTraslate.vue';
import SearchBar from 'components/SearchBar.vue';
import WidgetComponent from 'pages/Widget.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';
import { useWidgetStore } from '../stores/widget';
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia';
import AplicantDialog from '../components/AplicantDialog.vue'
const menuAdmin = [
  { title: 'Users', icon: 'people', color: 'red' },
  { title: 'Applicants', icon: 'translate', color: 'admin' },
  { title: 'Recruiters', icon: 'monitoring', color: 'admin' },
  { title: 'Jobs', icon: 'list', color: 'admin' },
  { title: 'Settings', icon: 'list', color: 'admin' },
];
export default defineComponent({
  name: 'MainLayout',
  components: {
    SearchBar,
    MenuComponent,
    WidgetComponent,
    AplicantDialog,
    NotificationBell,
    GoogleTraslate
  },

  setup() {
    const router = useRouter();
    const widgetStore = useWidgetStore();
    const userStore = useUserStore();
    const recruiter = ref(userStore.getCurrentRole);
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const leftDrawerOpen = ref(false);
    const { currentRole, isAdmin } = storeToRefs(userStore)
    const { showRightSidebar } = storeToRefs(widgetStore)
    const rightDrawerOpen = ref(showRightSidebar);
    onUpdated(() => {
      setTimeout(() => {
        if (!isAuthenticated.value) {
          // loginWithRedirect();
        }
      }, 1000)
    })

    onMounted(() => {
      // console.log(isAuthenticated, 'mounted')
      setTimeout(() => {
        // LocalStorage.set('userId', 'auth0|65edb8ef5822600f8660eb4b')
        const userId = LocalStorage.getItem('userId'); // Utiliza LocalStorage de Quasar para obtener el ID del usuario
        if (!isAuthenticated.value && !userId) {
          loginWithRedirect();
        } else {
          updateUserData();
        }
      }, 2000)
      //updateUserData();
      handleLayoutColor()
    })

    const updateUserData = () => {
      // Aquí puedes llamar a una acción en la store de 'user' para actualizar los datos del
      LocalStorage.set('userId', user.value?.sub)
      userStore.fetchUserData('auth0|65edb8ef5822600f8660eb4b');
    };

    const loginOrLogout = () => {
      if (isAuthenticated.value) {
        logout();
        LocalStorage.remove('userId');
      } else {
        const userId = LocalStorage.getItem('userId');
        if (!userId) {
          loginWithRedirect();
        }
      }
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const toggleRightDrawer = () => {
      widgetStore.setShowRightSidebar(!rightDrawerOpen.value);
    };

    const handleRoleToggle = () => {
      userStore.setRole(recruiter.value);
    }
    const handleLayoutColor = () => {
      if (isAdmin.value) {
        return setCssVar('primary', '#f04f4f');
      }
      if (userStore.getCurrentRole) {
        setCssVar('primary', '#00897B');
      } else {
        setCssVar('primary', '#1976d2');
      }
    }

    watch(currentRole, () => {
      handleLayoutColor();
      router.push({ path: '/' });
    });

    watch(isAdmin, () => {
      handleLayoutColor();
      router.push({ path: '/' });
    });

    return {
      essentialLinks: menuAdmin,
      isAuthenticated,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer,
      toggleRightDrawer,
      widgetStore,
      updateUserData,
      user,
      recruiter,
      loginOrLogout,
      handleRoleToggle,
      currentRole,
      userStore
    };
  },
});
</script>
