<template>
  <div>
    <ArticleComponent />
  </div>
</template>

<script>
import { ArticleComponent } from '../components';
import { ref } from 'vue';
export default defineComponent({
  name: 'areaTest',
  components: {
    ArticleComponent,
  },

  setup() {
    return {
      ArticleComponent,
    };
  },
});
</script>
