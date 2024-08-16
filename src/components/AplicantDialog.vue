<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="widgetStore.getShowAplicantDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="text-grey-8">
          <h6 class="text-center">Applicant Profile</h6>
          <div v-if="widgetStore.getSelectedAplicant">
            <h6>First Name: {{ widgetStore.getSelectedAplicant.first_name }}</h6>
            <h6>Last Name: {{ widgetStore.getSelectedAplicant.last_name }}</h6>
            <h6>Cover Letter: {{ widgetStore.getSelectedAplicant.cover_letter }}</h6>
            <h6>Skills: {{ widgetStore.getSelectedAplicant.skills }}</h6>
            <h6>Area: {{ widgetStore.getSelectedAplicant.area }}</h6>
            <h6>Education: {{ widgetStore.getSelectedAplicant.education }}</h6>
            <h6>Experience: {{ widgetStore.getSelectedAplicant.experience }}</h6>
            <h6>Projects: {{ widgetStore.getSelectedAplicant.projects }}</h6>
            <h6>Contact: {{ widgetStore.getSelectedAplicant.contact }}</h6>
            <h6>Premium: {{ widgetStore.getSelectedAplicant.premium ? 'Yes' : 'No' }}</h6>
          </div>
          <q-btn v-if="!userStore.isAdmin" class="q-mt-md" color="primary" @click="handleStartChat">
            {{ theChatExist ? 'View Chat' : 'Start Chat' }}
          </q-btn>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Close" @click="widgetStore.setShowAplicantDialog(false)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useWidgetStore } from '../stores/widget';
import { useChatsStore } from '../stores/chat';
import { useUserStore } from '../stores/user';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const $q = useQuasar();
const widgetStore = useWidgetStore();
const userStore = useUserStore();
const chatStore = useChatsStore();
const router = useRouter();

const { getShowAplicantDialog, getSelectedAplicant } = storeToRefs(widgetStore);
const theChatExist = ref(false);
const bodyData = ref({
  profile_aplicant_id: '',
  job_id: '',
});

const handleStartChat = () => {
  if (theChatExist.value) {
    router.push({ path: '/chats' });
    widgetStore.setShowAplicantDialog(false);
  } else {
    createChat();
  }
}

const createChat = async () => {
  $q.loading.show({
    delay: 0 // ms
  });

  bodyData.value.profile_aplicant_id = getSelectedAplicant.value.id;
  bodyData.value.job_id = widgetStore.widgetData.title; // Asumiendo que title es el job_id

  await chatStore.createChat(bodyData.value);

  $q.loading.hide();
  router.push({ path: '/chats' });
}

watch(getSelectedAplicant, (newDetails) => {
  bodyData.value.profile_aplicant_id = newDetails.id;
  bodyData.value.job_id = widgetStore.widgetData.title; // Asumiendo que title es el job_id
  
  const { chat_exist, chat_id } = chatStore.chatExists(bodyData.value.profile_aplicant_id, bodyData.value.job_id);

  if (chat_exist) {
    theChatExist.value = chat_exist;
    chatStore.currentChatId = chat_id;
  }
});
</script>

<style scoped>
h6 {
  margin: 0;
  padding: 0;
}
</style>
