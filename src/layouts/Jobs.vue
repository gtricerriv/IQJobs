<template>
  <div class="q-pa-xl q-gutter-lg" style="width: 100%">
    <div v-for="(job, index) in paginatedJobs" :key="index">
      <ArticleComponent
        :description="job.description.value"
        :position="job.position.value"
        :provider="job.provider.value"
        :title="job.title.value"
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
s
<script>
import ArticleComponent from 'components/ArticleComponent.vue';
import { useStore } from 'stores/index';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'JobComponent',
  components: {
    ArticleComponent,
  },
  setup() {
    const store = useStore();

    const fetchJobs = async () => {
      try {
        const jobs = await store.$fetchJobs(1, 10); // Ejemplo de llamada para obtener la primera página con 10 trabajos
        console.log(jobs);
      } catch (error) {
        console.error(error);
        // Manejar el error según sea necesario
      }
    };

    const current = ref(1);
    const itemsPerPage = 6;

    const paginatedJobs = computed(() => {
      const start = (current.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const result = store.$fetchJobs(1, 10);
      return result;
    });

    const totalPages = computed(() =>
      Math.ceil(store.jobs.length / itemsPerPage)
    );

    fetchJobs(); // Llamada inicial para obtener los trabajos al cargar el componente

    return {
      fetchJobs,
      current,
      paginatedJobs,
      totalPages,
    };
  },
});
</script>
