<template>
  <div class="q-pa-xl q-gutter-lg" style="width: 100%">
    <div v-for="(job, index) in paginatedJobs" :key="index">
      <ArticleComponent
        :description="job.description"
        :position="job.position"
        :provider="job.provider ? job.provider : ''"
        :title="job.title"
      />
    </div>
    <q-pagination
      class="flex-center"
      v-model="current"
      :max="totalPages"
      direction-links
    />
  </div>
</template>

<script>
import ArticleComponent from 'components/ArticleComponent.vue';
import { useJobsStore } from 'stores/jobs'; // Ajusta la ruta de importación según la estructura de tu proyecto
import { computed, defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'JobComponent',
  components: {
    ArticleComponent,
  },
  setup() {
    const jobsStore = useJobsStore();
    const current = ref(1);
    const itemsPerPage = 199;

    const fetchJobs = async () => {
      try {
        await jobsStore.fetchJobList(current.value, itemsPerPage);
      } catch (error) {
        console.error(error);
        // Manejar el error según sea necesario
      }
    };

    const paginatedJobs = computed(() => {
      const start = (current.value - 1) * 6;
      const end = start + 6;
      return jobsStore.jobList.slice(start, end);
    });

    const totalPages = computed(() => Math.ceil(jobsStore.jobList.length / 6));

    onMounted(fetchJobs); // Llama a fetchJobs cuando el componente se monta

    return {
      current,
      paginatedJobs,
      totalPages,
    };
  },
});
</script>
