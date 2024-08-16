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

              <q-btn color="primary" label="Logout" push size="sm" v-close-popup @click="handleLogout" />
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
        <q-btn @Click="notify()" color="primary" class="fit" :label="userStore.getCurrentRole ? '' : 'Postular a Oferta'" />
      </div>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Chat Popup should be outside the drawers to ensure it is on top -->
    <AplicantDialog></AplicantDialog>
  </q-layout>
</template>

<style>
@media screen and (max-width: 767px) {
  .q-drawer--right {
    width: 80% !important;
  }
}



</style>

<script lang="ts">
import { setCssVar, useQuasar } from 'quasar';
import { defineComponent, ref, onMounted, watch } from 'vue';
import MenuComponent from 'components/Menu.vue';
import NotificationBell from '../components/NotificationBell.vue';
import GoogleTraslate from '../components/GoogleTraslate.vue';
import SearchBar from 'components/SearchBar.vue';
import WidgetComponent from 'pages/Widget.vue';
import { useRouter } from 'vue-router';
import { useWidgetStore } from '../stores/widget';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import AplicantDialog from '../components/AplicantDialog.vue';

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
    const $q = useQuasar();
    const router = useRouter();
    const showChat = ref(false);
    const widgetStore = useWidgetStore();
    const userStore = useUserStore();
    const recruiter = ref(userStore.getCurrentRole);
    const leftDrawerOpen = ref(false);
    const { currentRole, isAdmin, userData } = storeToRefs(userStore);
    const user = userData;
    const { showRightSidebar } = storeToRefs(widgetStore);
    const rightDrawerOpen = ref(showRightSidebar);

    onMounted(() => {
      setTimeout(() => {
        updateUserData();
      }, 5000);
      handleLayoutColor();
    });

    const updateUserData = async () => {
      await userStore.fetchUserData(user);
      if (userStore.isAdmin) {
        router.push('/admin/users');
      }
    };

    const handleLogout = () => {
      $q.localStorage.remove('userId');
      logout();
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const toggleRightDrawer = () => {
      widgetStore.setShowRightSidebar(!rightDrawerOpen.value);
    };

    const handleRoleToggle = () => {
      userStore.setRole(recruiter.value);
      widgetStore.cleanWidgetData();
    };

    const handleLayoutColor = () => {
      if (isAdmin.value) {
        setCssVar('primary', '#f04f4f');
      } else if (userStore.getCurrentRole) {
        setCssVar('primary', '#00897B');
      } else {
        setCssVar('primary', '#1976d2');
      }
    };

    const notify = async () => {
      $q.notify({
        color: 'positive',
        position: 'top-left',
        message: 'You applied for the job!',
        icon: 'check_circle',
        onDismiss: () => {
          showChat.value = true; // Show the chat when notification is dismissed
        }
      });
    };

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
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer,
      toggleRightDrawer,
      widgetStore,
      updateUserData,
      user,
      recruiter,
      handleLogout,
      handleRoleToggle,
      currentRole,
      userStore,
      notify,
      showChat
    };
  },
});
</script>
