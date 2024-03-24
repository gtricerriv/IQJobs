<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="widgetStore.getShowAplicantDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <pre>{{ widgetStore.selectedApplicant }}</pre>
        </q-card-section>

        <q-card-section class="q-pt-none">

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Close" @click="widgetStore.setShowAplicantDialog(false)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useWidgetStore } from 'stores/widget';

const widgetStore = useWidgetStore();

</script>
