<template>
  <div>
    <q-form @submit="handleSubmit" class="q-gutter-md">
      <q-input filled v-model="profileUrl" label="Your profile url" lazy-rules
        :rules="[val => isValidURL(val) || 'Please enter a valid url']" />
      <div>

        <q-select v-model="selectedOption" :options="options" label="Select an Site Option" outlined dense />

        <q-btn class="q-mt-md" label="Submit" type="submit" color="primary" />
      </div>
    </q-form>

    <div class="q-pa-md">
    <q-uploader
      :factory="factoryFn"
      style="max-width: 300px"
    />
  </div>

  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useProfileStore } from '../stores/profile';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const profileStore = useProfileStore()
const profileUrl = ref('')
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

const factoryFn = async (files) => {
      // returning a Promise

      return new Promise((resolve) => {
        // simulating a delay of 2 seconds
        setTimeout(() => {
          handleSubmit()
          resolve(true);
        }, 2000)
      })
    }

const handleSubmit = async () => {
  $q.notify({
          color: 'positive',
          position: 'top-right',
          message: 'Profile created successfully!',
          icon: 'check_circle'
        });
  if (profileUrl.value == '' || selectedOption.value == '') return;

  $q.loading.show({
    delay: 0 // ms
  });

  const body = {
    url: profileUrl.value,
    option: selectedOption.value['value']
  }

  await profileStore.postCreateProfile(body);

  resetForm();

  $q.loading.hide()
}

const resetForm = () => {
  profileUrl.value = ''
  selectedOption.value = ''
}


</script>
