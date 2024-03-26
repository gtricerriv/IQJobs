<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="widgetStore.getShowAplicantDialog">
      <q-card style="width: 700px; max-width: 80vw;">

        <q-card-section class="text-grey-8">
          <h6 class="text-center">Aplicant Profile</h6>
          <h6>Fist Name: {{ widgetStore.selectedApplicant?.first_name }}</h6>
          <h6>Last Name: {{ widgetStore.selectedApplicant?.last_name }}</h6>
          <h6>Cover Letter: {{ widgetStore.selectedApplicant?.cover_letter }}</h6>
          <h6>Skills: {{ widgetStore.selectedApplicant?.skills }}</h6>
          <h6>Area: {{ widgetStore.selectedApplicant?.area }}</h6>
          <h6>Education: {{ widgetStore.selectedApplicant?.education }}</h6>
          <h6>Experience: {{ widgetStore.selectedApplicant?.experience }}</h6>
          <h6>Projects: {{ widgetStore.selectedApplicant?.projects }}</h6>
          <h6>contact: {{ widgetStore.selectedApplicant?.contact }}</h6>
          <h6>Premiun: {{ widgetStore.selectedApplicant?.premium ? 'Yes' : 'No' }}</h6>

          <q-btn class="q-mt-md" color="primary" @click="handleStartChat">{{ theChatExist ? 'View Chat' : 'Start Chat'
            }}</q-btn>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Close" @click="widgetStore.setShowAplicantDialog(false)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useWidgetStore } from '../stores/widget';
import { useChatsStore } from '../stores/chat';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue';

const $q = useQuasar();
const widgetStore = useWidgetStore();
const { selectedApplicant } = storeToRefs(widgetStore);
const chatStore = useChatsStore();
const router = useRouter();
const theChatExist = ref(false);
const bodyData = ref({
  profile_aplicant_id: '',
  job_id: '',
})
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

  bodyData.value.profile_aplicant_id = widgetStore.selectedApplicant._id;
  bodyData.value.job_id = widgetStore.selectedJoId;

  await chatStore.createChat(bodyData.value);

  $q.loading.hide();

  router.push({ path: '/chats' });

}

watch(selectedApplicant, () => {

  bodyData.value.profile_aplicant_id = widgetStore.selectedApplicant._id;
  bodyData.value.job_id = widgetStore.selectedJoId;

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
