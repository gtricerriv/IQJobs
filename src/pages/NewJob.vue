<template>
  <div class="q-pa-xl">
    <q-form @submit="handleSubmit" @reset="onReset" class="q-gutter-md">
      <q-input filled v-model="jobUrl" label="Your job url" lazy-rules
        :rules="[val => isValidURL(val) || 'Please enter a valid url']" />
      <div>

        <q-select v-model="selectedOption" :options="options" label="Select an Site Option" outlined dense />

        <q-btn class="q-mt-md" label="Submit" type="submit" color="primary" />
      </div>
    </q-form>

  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useJobsStore } from '../stores/jobs';

const jobsStore = useJobsStore()
const jobUrl = ref('')
const selectedOption = ref('')
const options = [
  {
    label: 'LinkedIn',
    value: 'linkedin',
  },
  {
    label: 'Glassdoor',
    value: 'glassdoor',
  },
];

const isValidURL = (url: string) => {
  // Expresión regular para validar URL
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  // Verificar si la URL cumple con el patrón
  return urlPattern.test(url);
}

const handleSubmit = () => {
  if (jobUrl.value == '' || selectedOption.value == '') return;
  const body = {
    url: jobUrl.value,
    option: selectedOption.value
  }

  jobsStore.postCreateJob(body);
}


</script>
