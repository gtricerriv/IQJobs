<template>
  <div>
    <q-btn class="q-mr-sm" v-if="!hasNotifications" flat dense round icon="notifications" aria-label="notifications" />
  
    <q-btn-dropdown v-else flat color="red" icon="notifications_active">
      <div class="row no-wrap q-pa-md">
        <div class="column fit" style="justify-content: center; align-items: center">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// Setup
const router = useRouter();

const notifications = ref<Array<{ id: string, title: string, type: string }>>([]);
const hasNotifications = ref(false);

let notificationInterval: any = null;

// Simulate adding notifications
onMounted(() => {
  // Start generating notifications every 3 seconds
  notificationInterval = setInterval(() => {
    const types = ['job', 'chat'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const newNotification = {
      id: Date.now().toString(),
      title: randomType === 'job' ? `New job proposal! ${new Date().toLocaleTimeString()}` : `New chat message! ${new Date().toLocaleTimeString()}`,
      type: randomType,
    };
    notifications.value.push(newNotification);
    hasNotifications.value = true;
  }, 10000);
});

onUnmounted(() => {
  if (notificationInterval) {
    clearInterval(notificationInterval);
  }
});

const handleClearNotifications = () => {
  notifications.value = [];
  hasNotifications.value = false;
};

const handleClickNotification = (notification: any) => {
  switch (notification.type) {
    case 'chat':
      router.push({ path: '/chat' });
      break;
    case 'job':
      router.push({ path: '/jobs' });
      break;
    default:
      break;
  }
};
</script>

<style scoped>
.onPress {
  cursor: pointer;
}

.mb-1 {
  margin-bottom: 1em;
}
</style>
