<template>
  <div @click="handleSetDataToModal" class="onPress q-pa-md bg-s shadow-4 bg-grey-1 mb-1">
    <div class="row">
      <div v-if="!aplicant.premiun == true" class="col-3 text-start">
        Premiun 🏅
      </div>
      <div v-else class="col-3 text-start">
        NO Premiun ❌
      </div>
      <div class="col q-mt-sm text-start text-grey">
        <div class="text-bold">{{ aplicant.title }}</div>
        <div class="text-bold">{{ aplicant.first_name }} {{ aplicant.last_name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useWidgetStore } from '../stores/widget';

const props = defineProps({
  aplicant: {
    type: Object,
    required: true,
  },
});

const widgetStore = useWidgetStore();
const handleSetDataToModal = () => {
  widgetStore.setSelectedAplicant(props.aplicant);
}

</script>

<style scoped>
.onPress {
  cursor: pointer;
}

.mb-1 {
  margin-bottom: 1em;
}
</style>
