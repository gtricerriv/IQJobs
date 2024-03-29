<template>
  <div class="q-pa-md">
    <q-table title="List Profile" flat bordered :rows="adminStore.usersList" :columns="columns" row-key="_id"
      :filter="filter" :loading="loading" selection="single" v-model:selected="selected">

      <template v-slot:top>
        <div class="text-h6 text-grey q-pa-md">
          Users
        </div>

        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useWidgetStore } from '../stores/widget';
import { useAdminStore } from '../stores/adminStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const widgetStore = useWidgetStore();
const adminStore = useAdminStore();
const selected = ref([{
  _id: 50,
  email: 'example@iqjobs1.com',
  profiles: [
    {
      _id: 50,
      title: 'example',
      first_name: 'John',
      last_name: 'Doe',
      cover_letter: 'I am a programmer',
      skills: 'Java, Python',
      area: 'FrontEnd Developer',
      education: 'Bachelor Degree',
      experience: '5 years',
      projects: 'Project 1, Project 2',
      contact: '1234567890',
      isRecruiter: false,
      premium: false
    }
  ]
}]);
const filter = ref('');
const loading = ref(false);

const columns = [
  { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
  { name: 'createdAt', label: 'Created At', align: 'center', field: 'createdAt', sortable: true }
]


onMounted(async () => {
  $q.loading.show({
    delay: 0 // ms
  });
  await adminStore.fetchUsers()
  $q.loading.hide();
})

const showUserProfiles = () => {
  const userProfiles: any = selected.value[0].profiles;
  widgetStore.showAdminProfiles(userProfiles);
}

watch(selected, showUserProfiles)
</script>
