<template>
  <div>
    <q-input @keydown.enter="searchJobs" dense bg-color="white" rounded outlined v-model="params.body">
      <template v-slot:append>
        <q-icon v-if="params.body === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="handleResetSearch" />
      </template>
    </q-input>


    <!-- Checkboxes for query params -->
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <q-checkbox v-model="params.title" label="title" color="teal" />
        <q-checkbox v-model="params.companies" label="companies" color="teal" />
        <q-checkbox v-model="params.premiun" label="Premiun" color="teal" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '../stores/jobs';
export default defineComponent({
  name: 'IndexPage',
  components: {
  },
  setup() {
    const router = useRouter();
    const jobsStore = useJobsStore();
    const route = useRoute();
    const path = computed(() => route.path)
    const params = ref({
      premiun: false,
      companies: false,
      description: false,
      title: false,
      body: ''
    })

    const handleResetSearch = () => {
      params.value = {
        premiun: false,
        companies: false,
        description: false,
        title: false,
        body: ''
      }

      jobsStore.setShowJobFilter(false);
      jobsStore.resetJobListFiltered();
    }

    const searchJobs = () => {

      if (path.value != '/jobs') {
        router.push({ path: '/jobs' });
      }

      jobsStore.searchJobs(params.value);

    };
    return { searchJobs, params, handleResetSearch };
  },
});
</script>
