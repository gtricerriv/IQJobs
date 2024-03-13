<template>
  <div class="q-pa-md">
    <q-table
      title="List Profile"
      flat bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :loading="loading"
      selection="multiple"
      v-model:selected="selected"
    >

      <template v-slot:top>
        <div class="text-h6 text-grey">
          List Profiles
        </div>
        <q-btn v-if="selected.length > 0" class="q-ml-sm" color="negative" :disable="loading" label="Remove Profile" @click="removeRow" />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useProfileStore } from '../stores/profile';
const columns = [
  { name: 'name', align: 'center', label: 'Name', field: 'title', sortable: true },
  { name: 'area', label: 'Area', field: 'area', sortable: true },
  { name: 'createdAt', label: 'Created At', align: 'center', field: 'createdAt', sortable: true }
]

export default {
  setup() {
    const loading = ref(false);
    const filter = ref('');
    const rows = ref([]);
    const selected = ref([]);

    const profileStore = useProfileStore(); // Accede a la store de 'profile'

    onMounted(async () => {
      setTimeout( async ()=>{
        loading.value = true;
        try {
          rows.value = await profileStore.profiles; // Obtiene los perfiles de la store y los asigna a 'rows'
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      },4000)
    });

    return {
      selected,
      columns,
      rows,
      loading,
      filter,

      removeRow() {
        loading.value = true;
        setTimeout(() => {
          if (selected.value.length > 0) {
            selected.value.forEach(s => {
              const index = rows.value.findIndex(row => row.name === s.name);
              rows.value.splice(index, 1);
            });
          }
          loading.value = false;
        }, 500);
      }
    };
  }
}
</script>
