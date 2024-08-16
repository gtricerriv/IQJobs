<template>
  <div class="q-pa-md">
    <q-table title="List Profile" flat bordered :rows="rows" :columns="columns" row-key="_id" :filter="filter"
      :loading="loading" selection="single" v-model:selected="selected">
      
      <template v-slot:top>
        <div class="text-h6 text-grey">
          List Profiles
        </div>
        <q-btn v-if="selected.length > 0" class="q-ml-sm" color="negative" :disable="loading" label="Remove Profile"
          @click="removeRow" />
        <q-space />

        <q-btn v-if="selected.length > 0" class="q-ml-sm" color="primary" :disable="loading"
          label="Set As Current Profile" @click="handleSetCurrentProfile" />
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

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useProfileStore } from '../stores/profile';
import { useUserStore } from '../stores/user';

const columns = [
  { name: 'title', align: 'center', label: 'Name', field: 'title', sortable: true },
  { name: 'area', label: 'Area', field: 'area', sortable: true },
  { name: 'createdAt', label: 'Created At', align: 'center', field: 'createdAt', sortable: true }
];

export default {
  setup() {
    const loading = ref(false);
    const filter = ref('');
    const rows = ref([]);
    const selected = ref([]);

    const profileStore = useProfileStore(); // Accede al store de perfiles
    const userStore = useUserStore(); // Accede al store de usuarios

    // Cargar perfiles al montar el componente
    onMounted(async () => {
      loading.value = true;
      await profileStore.fetchProfiles();
      rows.value = profileStore.profiles; // Asigna los perfiles obtenidos a 'rows'
      loading.value = false;
    });

    // Función para eliminar perfiles
    const removeRow = async () => {
      if (selected.value.length > 0) {
        loading.value = true;
        await Promise.all(selected.value.map(async (profile) => {
          await profileStore.deleteProfile(profile._id); // Suponiendo que `deleteProfile` es una acción en el store
        }));
        // Actualizar la lista de perfiles después de eliminar
        await profileStore.fetchProfiles();
        rows.value = profileStore.profiles;
        selected.value = [];
        loading.value = false;
      }
    };

    // Función para establecer el perfil actual
    const handleSetCurrentProfile = () => {
      if (selected.value.length > 0) {
        userStore.setCurrentProfile(selected.value[0]);
      }
    };

    return {
      selected,
      columns,
      rows,
      loading,
      filter,
      handleSetCurrentProfile,
      removeRow
    };
  }
};
</script>
