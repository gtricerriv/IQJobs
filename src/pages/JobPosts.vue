<template>
  <div class="q-pa-xl q-gutter-lg" style="width: 100%">
    <div v-for="(job, index) in paginatedJobs" :key="index">
      <!-- Temporal, sirve para ver que jobs tienen aplicantes -->
      {{ job.user_applicants }}
      <ArticleComponent :description="job.description" :position="job.position"
        :provider="job.provider ? job.provider : ''" :title="job.title" :aplicants="job.user_applicants" />
    </div>
    <q-pagination v-if="showJobFilter" class="flex-center" v-model="current" :max="totalPagesFiltered"
      direction-links />
    <q-pagination v-else class="flex-center" v-model="current" :max="totalPages" direction-links />
  </div>
</template>

<script>
import ArticleComponent from 'components/ArticleComponent.vue';
import { useJobsStore } from 'stores/jobs'; // Ajusta la ruta de importación según la estructura de tu proyecto
import { computed, defineComponent, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'JobComponent',
  components: {
    ArticleComponent,
  },
  setup() {
    const jobsStore = useJobsStore();
    const current = ref(1);
    const itemsPerPage = 199;
    const { showJobFilter, jobListFiltered } = storeToRefs(jobsStore)

    const fetchJobs = () => {
      jobsStore.fetchJobList(current.value, itemsPerPage);
    };

    const paginatedJobs = computed(() => {
      const start = (current.value - 1) * 6;
      const end = start + 6;
      if (showJobFilter.value) {
        return jobListFiltered.value.slice(start, end);
      }
      return jobsStore.jobList.slice(start, end);
    });

    const totalPages = computed(() => Math.ceil(jobsStore.jobList.length / 6));
    const totalPagesFiltered = computed(() => Math.ceil(jobListFiltered.value.length / 6));

    onMounted(fetchJobs);

    return {
      current,
      paginatedJobs,
      totalPages,
      showJobFilter,
      totalPagesFiltered
    };
  },
});
</script>
