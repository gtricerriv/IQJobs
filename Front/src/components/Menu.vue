<template>
  <q-list>
    <q-item-label header> Menu </q-item-label>

    <EssentialLink
      v-for="link in essentialLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>
</template>
<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
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
    return {
      essentialLinks: menuApplicants,
    };
  },
});
</script>
