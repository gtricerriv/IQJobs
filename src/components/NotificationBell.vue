<template>

  <q-btn class="q-mr-sm" v-if="!hasNotifications" flat dense round icon="notifications" aria-label="build_circle" />


  <q-btn-dropdown v-else flat color="red" icon="notifications_active">
    <div class="row no-wrap q-pa-md">
      <div class="column fit" style="justify-content: center; align-items: start">
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="notification in newJobs" :key="notification.id">
            <q-item-section>
              {{ notification.title }}
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn color="primary" label="Clear all" push size="sm" @click="handleClearNotifications" />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useJobsStore } from '../stores/jobs';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';


const jobsStore = useJobsStore();

onMounted(() => {
  jobsStore.getAllJobs();
  jobsStore.checkHasNotifications();
});

const { newJobs, hasNotifications } = storeToRefs(jobsStore)

const handleClearNotifications = () => {
  newJobs.value = [];
  jobsStore.hasNotifications = false;
}
</script>
