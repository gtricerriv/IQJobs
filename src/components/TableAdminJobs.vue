<template>
    <div class="q-pa-md">
      <q-table
        flat bordered
        title="Users"
        :rows="rows"
        :columns="columns"
        row-key="_id"
      >
        <template v-slot:body="props" >
          <q-tr :props="props" @click="openProfileModal(props.row)">
            <q-td key="name" :props="props">
              {{ props.row.profile[0].first_name }} {{ props.row.profile[0].last_name }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="customer_id" :props="props">
              {{ props.row.customer_id }}
            </q-td>
            <q-td key="auth0_id" :props="props">
              {{ props.row.auth0_id }}
            </q-td>
            <!-- Agrega más columnas según la información que se desea mostrar en la tabla -->
          </q-tr>
        </template>
      </q-table>
  
      <q-dialog v-model="profileModal" position="standard">
        <q-card>
          <q-card-section v-if="selectedProfile">
            <div>First Name: {{ selectedProfile.first_name }}</div>
            <div>Last Name: {{ selectedProfile.last_name }}</div>
            <div>Email: {{ selectedProfile.email }}</div>
            <div>Area: {{ selectedProfile.area }}</div>
            <!-- Agrega más campos del perfil que deseas mostrar en el modal -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Close" @click="closeProfileModal" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const rows = ref([]);
      const profileModal = ref(false);
      const selectedProfile = ref(null);
  
      const openProfileModal = (rowData) => {
        selectedProfile.value = rowData.profile[0];
        profileModal.value = true;
      };
  
      const closeProfileModal = () => {
        selectedProfile.value = null;
        profileModal.value = false;
      };
  
      const fetchUsers = async () => {
        try {
          const response = await axios.get('https://getusersadminroute-7mlffi3t2a-uc.a.run.app/');
          rows.value = response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchUsers();
  
      const columns = [
        { name: 'name', align: 'left', label: 'User Name', field: 'name', sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
        { name: 'customer_id', align: 'left', label: 'customer_id', field: 'customer_id', sortable: true },
        { name: 'auth0_id', align: 'left', label: 'auth0_id', field: 'auth0_id', sortable: true },

        // Puedes agregar más columnas según la información que deseas mostrar en la tabla
      ];
  
      return {
        rows,
        profileModal,
        selectedProfile,
        openProfileModal,
        closeProfileModal,
        columns
      };
    }
  };
  </script>
  