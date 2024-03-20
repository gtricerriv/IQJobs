<template>
  <div>
    <template v-if="userStore.isCurrentProfileSelected() && !userStore.getCurrentRole">
      <div class="text-h6 text-grey">Current Profile:</div>
      <div class="text-h6 text-grey">{{ userStore.currentProfile?.title }}</div>
      <div class="text-h6 text-grey">{{ userStore.getCurrentProfile?.area }}</div>
    </template>

    <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"
      :class="showProfile || showTableProfile ? 'shadow-4' : ''" style="height: 95vh; width: 100%">
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
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../stores/user';
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

    const userStore = useUserStore();
    console.log(props);
    const loadedHtml = ref('');
    return {
      loadedHtml,
      userStore
    };
  },
});
</script>
