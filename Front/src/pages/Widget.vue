<template>
  <div>
    <div class="fixed-center window-height window-width" v-html="loadedHtml"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'WidgetPage',
  setup() {
    return {
      loadedHtml: ref('')
    }
  },
  async mounted() {
    try {
      const response = await axios.get('/proxy?url=https://www.linkedin.com/jobs/search/?currentJobId=3839646094&f_TPR=r604800&f_WT=2&geoId=103644278&origin=JOBS_HOME_REMOTE_JOBS'); // Endpoint de tu servidor proxy
      this.loadedHtml = response.data;

    } catch (error) {
      console.log(error);

    }
  }
});
</script>
