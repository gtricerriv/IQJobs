<template>
  <q-list>
    <q-item-label header> Menu </q-item-label>

    <EssentialLink v-for="link in menuToShow" :key="link.title" v-bind="link" />
  </q-list>
</template>
<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';

const menuRecruiters = [
  {
    title: 'Applicants',
    icon: 'people',
    color: 'teal-7',
    link: 'applicants',
  },
  {
    title: 'Jobs',
    icon: 'work',
    color: 'teal-7',
    link: 'jobs',
  },
  {
    title: 'Settings',
    icon: 'settings',
    color: 'teal-7',
    link: 'settings',
  },
];

const menuApplicants = [
  {
    title: 'Profiles',
    icon: 'people',
    color: 'primary',
    link: 'profile',
  },
  {
    title: 'Jobs',
    icon: 'work',
    color: 'primary',
    link: 'jobs',
  },
  {
    title: 'CV',
    icon: 'article',
    color: 'primary',
    link: 'cv',
  },
  {
    title: 'Settings',
    icon: 'settings',
    color: 'primary',
    link: 'settings',
  },
];

const menuAdmin = [
  {
    title: 'Users',
    icon: 'people',
    color: 'red-5',
    link: 'admin/users',
  },
  {
    title: 'Jobs',
    icon: 'work',
    color: 'red-5',
    link: 'admin/jobs',
  },
  {
    title: 'Settings',
    icon: 'settings',
    color: 'red-5',
    link: 'admin/settings',
  },
];

export default defineComponent({
  name: 'MenuComponent',

  components: {
    EssentialLink,
  },

  setup() {
    const userStore = useUserStore();
    const { currentRole } = storeToRefs(userStore)

    const menuToShow = ref([]);

    const handleMenuOptions = () => {
      if (currentRole.value == 'recruiter') {
        menuToShow.value = menuRecruiters;
      } else {
        menuToShow.value = menuApplicants;
      }
    }

    watch(currentRole, () => {
      handleMenuOptions();
    });

    onMounted(() => {
      handleMenuOptions();
    });

    return {
      menuToShow,
      currentRole,
      userStore
    };
  },
  computed: {
    tripleCounter() {
      return this.counterStore.counter * 3
    },
  },
});
</script>
