<template>
  <div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :class="showProfile || showTableProfile ? 'shadow-4' : ''"
      style="height: 95vh; width: 100%"
    >
      <div class="q-pa-md flex-center">
        <div>
          <p>{{ position }}</p>
          <p>{{ provider }}</p>
          <div v-html="description"></div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'WidgetPage',
  props: {
    description: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(props);
    const loadedHtml = ref('');
    return {
      loadedHtml,
    };
  },
});
</script>
