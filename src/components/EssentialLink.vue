<template>
  <div>
    {{ }}
    <q-item v-if="submenu.length == 0" :to="link" clickable>
      <q-item-section avatar>
        <q-icon :name="icon" :color="color" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item v-else :label="title" :icon="icon" :color="color" header-class="text-secondary">
      <q-list>
        <q-item v-for="sublink in submenu" :key="sublink.title" :to="sublink.link" clickable>
          <q-item-section>
            <q-item-label>{{ sublink.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },

    color: {
      type: String,
      default: '',
    },

    submenu: {
      type: Array,
      default: () => [],
    },
  },
});
</script>
