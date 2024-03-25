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

          <q-btn class="q-mt-md" color="primary" @click="handleStartChat">Start Chart</q-btn>
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
const widgetStore = useWidgetStore();


const handleStartChat = () => {
  // TODO: aca enviar una peticion al backend con un mensaje o saludo predeterminado, para asi crear el chat con este aplicant
  // luego de creado el chat, redigir a la vista chat, con el id del chat que se acaba de crear, para que el chat se abra automaticamente
  //  y asi mostrar esta conversación
}
</script>

<style scoped>
h6 {
  margin: 0;
  padding: 0;
}
</style>
