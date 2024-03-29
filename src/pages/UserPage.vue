<template>
  <div class="q-pa-md">
    <q-table title="List Profile" flat bordered :rows="rows" :columns="columns" row-key="_id" :filter="filter"
      :loading="loading" selection="single" v-model:selected="selected">

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

const rows = [
  {
    _id: Date.now(),
    email: 'example@iqjobs1.com',
    profiles: [
      {
        _id: Date.now(),
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
      },
      {
        _id: Date.now(),
        title: 'example',
        first_name: 'John',
        last_name: 'Doe',
        cover_letter: 'I am a backend programmer',
        skills: 'PHP, Node',
        area: 'Backend Developer',
        education: 'Bachelor Degree',
        experience: '1 years',
        projects: 'Project A, Project B',
        contact: '1234567890',
        isRecruiter: false,
        premium: false
      }
    ]
  },
  {
    _id: Date.now() + 100,
    email: 'example@iqjobs2.com',
    profiles: [
      {
        _id: Date.now(),
        title: 'example',
        first_name: 'John2',
        last_name: 'Doe2',
        cover_letter: 'I am a programmer',
        skills: 'Java, Python',
        area: 'FrontEnd Developer',
        education: 'Bachelor Degree',
        experience: '5 years',
        projects: 'Project 1, Project 2',
        contact: '1234567890',
        isRecruiter: false,
        premium: false
      },
      {
        _id: Date.now(),
        title: 'example',
        first_name: 'John2',
        last_name: 'Doe2',
        cover_letter: 'I am a backend programmer',
        skills: 'PHP, Node',
        area: 'Backend Developer',
        education: 'Bachelor Degree',
        experience: '1 years',
        projects: 'Project A, Project B',
        contact: '1234567890',
        isRecruiter: false,
        premium: false
      }
    ]
  },
  {
    _id: Date.now() + 101,
    email: 'example@iqjobs3.com',
    profiles: [
      {
        _id: Date.now(),
        title: 'example',
        first_name: 'John3',
        last_name: 'Doe3',
        cover_letter: 'I am a programmer',
        skills: 'Java, Python',
        area: 'FrontEnd Developer',
        education: 'Bachelor Degree',
        experience: '5 years',
        projects: 'Project 1, Project 2',
        contact: '1234567890',
        isRecruiter: false,
        premium: false
      },
      {
        _id: Date.now(),
        title: 'example',
        first_name: 'John3',
        last_name: 'Doe3',
        cover_letter: 'I am a backend programmer',
        skills: 'PHP, Node',
        area: 'Backend Developer',
        education: 'Bachelor Degree',
        experience: '1 years',
        projects: 'Project A, Project B',
        contact: '1234567890',
        isRecruiter: false,
        premium: false
      }
    ]
  }
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
