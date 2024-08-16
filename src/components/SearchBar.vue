<template>
  <div>
    <q-input @keydown.enter="searchJobs" dense bg-color="white" rounded outlined v-model="params.body">
      <template v-slot:append>
        <q-icon v-if="params.body === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="handleResetSearch" />
        <q-btn-dropdown flat color="" icon="account_circle">
          <div class="row no-wrap q-pa-md">
            <div class="column fit" style="justify-content: center; align-items: start">
              <q-checkbox v-model="params.title" label="title" color="teal" />
              <q-checkbox v-model="params.premiun" label="Premiun" color="teal" />
            </div>
          </div>
        </q-btn-dropdown>
        <!-- agregar un boton para desplegar un modal con los filtros de busqueda -->
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '../stores/jobs';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components: {
  },
  setup() {
    const $q = useQuasar();
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

    const searchJobs = async () => {

      if (path.value != '/jobs') {
        router.push({ path: '/jobs' });
      }

      $q.loading.show({
        delay: 0 // ms
      });


      await jobsStore.searchJobs(params.value);

      $q.loading.hide();

    };
    return { searchJobs, params, handleResetSearch };
  },
});
</script>
