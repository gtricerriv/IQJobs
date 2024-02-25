<template>
  <div class="q-pa-md">
    <q-table
      flat bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :loading="loading"
      selection="multiple"
      v-model:selected="selected"
    >

      <template v-slot:top>
        <q-btn color="primary" :disable="loading" label="Add Profile" @click="addRow" />
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
import { ref } from 'vue'

const columns = [
  { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
  { name: 'area', label: 'area', field: 'area', sortable: true },
  { name: 'createdAt', label: 'created', align: 'center', 'field': 'createdAt', sortable: true }
]

const originalRows = [
  {
    name: 'Giancarlo Profile Standard',
    area: 'FrontEnd Developer',
    createdAt: '2022-05-02'
  },
  {
    name: 'Maria Profile Pro',
    area: 'Full Stack Developer',
    createdAt: '2021-11-15'
  },
  {
    name: 'John Doe',
    area: 'UI/UX Designer',
    createdAt: '2023-01-30'
  },
  {
    name: 'Elena Rodriguez',
    area: 'Data Scientist',
    createdAt: '2022-08-20'
  },
  {
    name: 'Samuel Lee',
    area: 'Mobile App Developer',
    createdAt: '2022-02-10'
  },
  {
    name: 'Sophie Johnson',
    area: 'Digital Marketing Specialist',
    createdAt: '2021-09-05'
  },
  {
    name: 'Alexandra Smith',
    area: 'Project Manager',
    createdAt: '2023-03-18'
  },
  {
    name: 'Michael Brown',
    area: 'Software Engineer',
    createdAt: '2021-06-12'
  }
]

export default {
  setup() {
    const loading = ref(false)
    const filter = ref('')
    const rowCount = ref(10)
    const rows = ref([...originalRows])
    const selected = ref([]);

    return {
      selected,
      columns,
      rows,
      loading,
      filter,
      rowCount,

      addRow() {
        loading.value = true
        setTimeout(() => {
          const index = Math.floor(Math.random() * (rows.value.length + 1))
          const row = originalRows[Math.floor(Math.random() * originalRows.length)]

          if (rows.value.length === 0) {
            rowCount.value = 0
          }

          row.id = ++rowCount.value
          const newRow = { ...row }
          rows.value = [...rows.value.slice(0, index), newRow, ...rows.value.slice(index)]
          loading.value = false
        }, 500)
      },

      removeRow() {
        loading.value = true
        setTimeout(() => {
          if (selected.value.length > 0) {
            selected.value.forEach(s => {
              const index = rows.value.findIndex(row => row.name === s.name)
              rows.value.splice(index, 1)
            })
          }
          loading.value = false
        }, 500)
      }
    }
  }
}
</script>
