<template>
  <div class="q-pa-md">
    <h6 class="text-grey-8">New Job via Link</h6>
    <q-form @submit="handleSubmit" class="q-gutter-md">
      <q-input filled v-model="jobUrl" label="Your job url" lazy-rules
        :rules="[val => isValidURL(val) || 'Please enter a valid url']" />

      <q-select v-model="selectedOption" :options="options" label="Select an Site Option" outlined dense />

      <q-btn class="q-mt-md" label="Submit" type="submit" color="primary" />
    </q-form>


    <h6 class="text-grey-8">Import from CSV</h6>

    <q-form @submit="handleSubmitCsv" class="q-gutter-md">
      <q-file standout v-model="csvFile" accept=".csv" label="Selecct CSV" @input="handleFileUpload">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-btn class="q-mt-md" label="Submit" type="submit" color="primary" />
    </q-form>

  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useJobsStore } from '../stores/jobs';
import Papa from 'papaparse';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const jobsStore = useJobsStore()
const csvFile = ref(null)
const csvContent = ref([]);
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

const handleSubmit = async () => {
  if (jobUrl.value == '' || selectedOption.value == '') return;
  $q.loading.show({
    delay: 0 // ms
  });

  const body = {
    url: jobUrl.value,
    option: selectedOption.value['value']
  }

  await jobsStore.postCreateJob(body);

  resetForms();
  $q.loading.hide();
}

const handleSubmitCsv = async () => {
  if (csvContent.value.length == 0) return;

  $q.loading.show({
    delay: 0 // ms
  });

  const body = {
    csvContent: csvContent.value
  }

  await jobsStore.postCreateJobFromCsvData(body);

  resetForms();
  $q.loading.hide();
}

const handleFileUpload = (event: any) => {
  const file = event.target.files[0];

  if (file) {
    Papa.parse(file, {
      complete: (results) => {
        csvContent.value = results.data;
      },
      error: (error) => {
        console.error('Error al parsear el CSV:', error);
      },
    });
  }
};

const resetForms = () => {
  csvFile.value = null;
  csvContent.value = [];
  jobUrl.value = '';
  selectedOption.value = '';
}

</script>
