<template>
  <div>
    <!-- Sección que muestra la información del aplicante -->
    <div @click="handleSetDataToModal" class="onPress q-pa-md bg-s shadow-4 bg-grey-1 mb-1">
      <div class="row">
        <div v-if="!aplicant.premium" class="col-3 text-start">
          Premium 🏅
        </div>
        <div v-else class="col-3 text-start">
          NO Premium ❌
        </div>
        <div class="col q-mt-sm text-start text-grey">
          <div class="text-bold">{{ aplicant.title }}</div>
          <div class="text-bold">{{ aplicant.first_name }} {{ aplicant.last_name }}</div>
        </div>
      </div>
    </div>

    <!-- Diálogo que muestra la información del aplicante -->
    <q-dialog v-model="dialogVisible">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="text-grey-8">
          <h6 class="text-center">Applicant Profile</h6>
          <div v-if="selectedApplicant">
            <h6>First Name: {{ selectedApplicant.first_name }}</h6>
            <h6>Last Name: {{ selectedApplicant.last_name }}</h6>
            <h6>Cover Letter: {{ selectedApplicant.cover_letter }}</h6>
            <h6>Skills: {{ selectedApplicant.skills }}</h6>
            <h6>Area: {{ selectedApplicant.area }}</h6>
            <h6>Education: {{ selectedApplicant.education }}</h6>
            <h6>Experience: {{ selectedApplicant.experience }}</h6>
            <h6>Projects: {{ selectedApplicant.projects }}</h6>
            <h6>Contact: {{ selectedApplicant.contact }}</h6>
            <h6>Premium: {{ selectedApplicant.premium ? 'Yes' : 'No' }}</h6>
          </div>
          <q-btn v-if="!userStore.isAdmin" class="q-mt-md" color="primary" @click="handleStartChat">
            {{ theChatExist ? 'View Chat' : 'Start Chat' }}
          </q-btn>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Close" @click="dialogVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { defineProps } from 'vue';
import { useChatsStore } from '../stores/chat';
import { useUserStore } from '../stores/user';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const props = defineProps({
  aplicant: {
    type: Object,
    required: true,
  },
});

const dialogVisible = ref(false);
const selectedApplicant = ref(null);

const handleSetDataToModal = () => {
  selectedApplicant.value = props.aplicant;
  dialogVisible.value = true;
};

const $q = useQuasar();
const userStore = useUserStore();
const chatStore = useChatsStore();
const router = useRouter();
const theChatExist = ref(false);
const bodyData = ref({
  profile_aplicant_id: '',
  job_id: '',
});

const handleStartChat = () => {
  if (theChatExist.value) {
    router.push({ path: '/chats' });
    dialogVisible.value = false;
  } else {
    createChat();
  }
};

const createChat = async () => {
  if (!selectedApplicant.value) {
    // Asegúrate de que selectedApplicant tiene un valor válido antes de continuar
    console.error('No applicant selected');
    return;
  }

  $q.loading.show({
    delay: 0 // ms
  });

  bodyData.value.profile_aplicant_id = selectedApplicant.value.id;
  bodyData.value.job_id = ''; // Necesitas definir cómo obtener job_id aquí

  await chatStore.createChat(bodyData.value);

  $q.loading.hide();
  router.push({ path: '/chats' });
};

// Verifica si el chat existe al cambiar el aplicante seleccionado
watch(selectedApplicant, (newDetails) => {
  if (newDetails) {
    bodyData.value.profile_aplicant_id = newDetails.id;
    bodyData.value.job_id = ''; // Necesitas definir cómo obtener job_id aquí

    const { chat_exist, chat_id } = chatStore.chatExists(bodyData.value.profile_aplicant_id, bodyData.value.job_id);
    if (chat_exist) {
      theChatExist.value = chat_exist;
      chatStore.currentChatId = chat_id;
    }
  }
});
</script>

<style scoped>
.onPress {
  cursor: pointer;
}

.mb-1 {
  margin-bottom: 1em;
}
</style>
