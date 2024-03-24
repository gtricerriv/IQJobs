<template>

  <q-btn class="q-mr-sm" v-if="!hasNotifications" flat dense round icon="notifications" aria-label="build_circle" />

  <q-btn-dropdown v-else flat color="red" icon="notifications_active">
    <div class="row no-wrap q-pa-md">
      <div class="column fit " style="justify-content: center; align-items: center">
        <q-list separator>
          <q-item clickable v-ripple v-for="notification in notifications" :key="notification.id">
            <q-item-section @click="handleClickNotification(notification)">
              {{ notification.title }}
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn class="q-mt-md" color="primary" label="Clear all" push size="sm" @click="handleClearNotifications" />
      </div>
    </div>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useJobsStore } from '../stores/jobs';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const jobsStore = useJobsStore();
const router = useRouter();

onMounted(() => {
  jobsStore.getAllJobs();
  jobsStore.checkHasNotifications();
});

const { notifications, hasNotifications } = storeToRefs(jobsStore)

const handleClearNotifications = () => {
  notifications.value = [];
  jobsStore.hasNotifications = false;
}

const handleClickNotification = (notification: any) => {
  // TODO: remove la notificacion clickeada del array de notificaciones
  switch (notification.type) {
    case 'chat':
      router.push({ path: '/chat' })
      break;
    case 'job':
      router.push({ path: '/jobs' })
      break;

    default:
      break;
  }
}
</script>
