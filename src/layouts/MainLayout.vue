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
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <MenuComponent />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <iframe
        class="full-height"
        src="https://google.co.ve"
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
import { defineComponent, ref } from 'vue';
import MenuComponent from 'components/Menu.vue';

import SearchBar from 'components/SearchBar.vue';

const menuAdmin = [
  {
    title: 'Users',
    icon: 'people',
    color: 'red',
  },
  {
    title: 'Applicants',
    icon: 'translate',
    color: 'admin',
  },
  {
    title: 'Recruiters',
    icon: 'monitoring',
    color: 'admin',
  },
  {
    title: 'Jobs',
    icon: 'list',
    color: 'admin',
  },
  {
    title: 'Settings',
    icon: 'list',
    color: 'admin',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    SearchBar,
    MenuComponent,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(true);

    return {
      essentialLinks: menuAdmin,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
