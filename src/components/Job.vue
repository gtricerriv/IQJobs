<template>
  <div class="q-pa-xl q-gutter-lg" style="width:100%;">
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
<script>
import ArticleComponent from 'components/ArticleComponent.vue';
import { computed, defineComponent, ref } from 'vue';
const jobs = [
  {
    title: ref('Software Engineer'),
    description: ref('Develop and maintain software applications'),
    position: ref('Full-time'),
    provider: ref('Tech Solutions Inc.')
  },
  {
    title: ref('Data Scientist'),
    description: ref('Analyze and interpret complex data sets'),
    position: ref('Remote'),
    provider: ref('Data Analytics Corp')
  },
  {
    title: ref('Cybersecurity Analyst'),
    description: ref('Protect systems and networks from cyber threats'),
    position: ref('Contract'),
    provider: ref('SecureTech Solutions')
  },
  {
    title: ref('UI/UX Designer'),
    description: ref('Create intuitive user interfaces and interactions'),
    position: ref('Part-time'),
    provider: ref('Design Innovations Lab')
  },
  {
    title: ref('IT Project Manager'),
    description: ref('Oversee technology projects from initiation to completion'),
    position: ref('Full-time'),
    provider: ref('Tech Projects International')
  },
  {
    title: ref('Machine Learning Engineer'),
    description: ref('Design and implement machine learning algorithms'),
    position: ref('Full-time'),
    provider: ref('AI Innovations Co.')
  },
  {
    title: ref('Cloud Solutions Architect'),
    description: ref('Design and implement cloud computing solutions'),
    position: ref('Remote'),
    provider: ref('CloudTech Enterprises')
  },
  {
    title: ref('Systems Administrator'),
    description: ref('Manage and optimize IT systems for efficiency'),
    position: ref('Full-time'),
    provider: ref('System Admin Solutions')
  },
  {
    title: ref('Software Engineer'),
    description: ref('Develop and maintain software applications'),
    position: ref('Full-time'),
    provider: ref('Tech Solutions Inc.')
  },
  {
    title: ref('Data Scientist'),
    description: ref('Analyze and interpret complex data sets'),
    position: ref('Remote'),
    provider: ref('Data Analytics Corp')
  },
  {
    title: ref('Cybersecurity Analyst'),
    description: ref('Protect systems and networks from cyber threats'),
    position: ref('Contract'),
    provider: ref('SecureTech Solutions')
  },
  {
    title: ref('UI/UX Designer'),
    description: ref('Create intuitive user interfaces and interactions'),
    position: ref('Part-time'),
    provider: ref('Design Innovations Lab')
  },
  {
    title: ref('IT Project Manager'),
    description: ref('Oversee technology projects from initiation to completion'),
    position: ref('Full-time'),
    provider: ref('Tech Projects International')
  },
  {
    title: ref('Machine Learning Engineer'),
    description: ref('Design and implement machine learning algorithms'),
    position: ref('Full-time'),
    provider: ref('AI Innovations Co.')
  },
  {
    title: ref('Cloud Solutions Architect'),
    description: ref('Design and implement cloud computing solutions'),
    position: ref('Remote'),
    provider: ref('CloudTech Enterprises')
  },
  {
    title: ref('Systems Administrator'),
    description: ref('Manage and optimize IT systems for efficiency'),
    position: ref('Full-time'),
    provider: ref('System Admin Solutions')
  }
]

export default defineComponent({
  name: 'JobComponent',
  components: {
    ArticleComponent,
  },
  setup() {
    const current = ref(1);
    const itemsPerPage = 6;

    const paginatedJobs = computed(() => {
      const start = (current.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return jobs.slice(start, end);
    });

    const totalPages = computed(() => Math.ceil(jobs.length / itemsPerPage));

    return {
      current,
      paginatedJobs,
      totalPages
    };
  },
});
</script>
