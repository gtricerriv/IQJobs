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
const linksList = [
  {
    title: 'dashboard',
    icon: 'people',
  },
  {
    title: 'Multi-Idioma',
    icon: 'translate',
  },
  {
    title: 'Metricas',
    icon: 'monitoring',
  },
  {
    title: 'Curriculum',
    icon: 'list',
  },
];

export default defineComponent({
  name: 'MenuComponent',

  components: {
    EssentialLink,
  },
  setup() {
    return {
      essentialLinks: linksList,
    };
  },
});
</script>
