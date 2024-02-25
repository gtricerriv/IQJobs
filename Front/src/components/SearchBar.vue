<template>
  <div>
    <q-input
      v-on:keyup.enter="searchJobs"
      bg-color="white"
      rounded
      outlined
      v-model="text"
    >
      <template v-slot:append>
        <q-icon v-if="text === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { Todo } from 'components/models';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const text = ref('');
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref({
      totalCount: 1200,
    });
    const searchJobs = () => {
      // this.router.push({ path: '/' });
    };
    return { todos, meta, text, searchJobs };
  },
});
</script>
