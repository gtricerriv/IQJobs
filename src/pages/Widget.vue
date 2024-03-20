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

        <div v-if="!userStore.getCurrentRole">
          <p>{{ position }}</p>
          <p>{{ provider }}</p>
          <div v-html="description"></div>
        </div>

        <div v-else>
          <AplicantCard :aplicant="item" v-for="item in widgetStore.getWidgetAplicants" :key="item.id" />
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../stores/user';
import AplicantCard from '../components/AplicantCard.vue';
import { useWidgetStore } from '../stores/widget';

export default defineComponent({
  name: 'WidgetPage',
  components: {
    AplicantCard
  },
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

    const fakeData = {
      title: 'Fake Title',
      first_name: 'Fake Name',
      last_name: 'Fake Last Name',
      premiun: false
    };

    const userStore = useUserStore();
    const widgetStore = useWidgetStore();
    const loadedHtml = ref('');

    return {
      loadedHtml,
      userStore,
      fakeData,
      widgetStore
    };
  },
});
</script>
