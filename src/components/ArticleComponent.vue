<template>
  <div class="onPress" @click="redirect">
    <div class="row" style="width: 20rem">
      <div class="col-3 text-start">
        <q-icon color="grey" size="xl" name="newspaper" />
      </div>
      <div class="col q-mt-sm">
        <div>google.co.ve</div>
        <div>https://google.co.ve</div>
      </div>
    </div>
    <div class="text-primary text-bold">Google</div>
    <div class="q-pt-sm text-grey" style="width: 30rem">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation
    </div>
  </div>
</template>

<style>
.onPress {
  cursor: pointer;
}
</style>

<script lang="ts">
import { Todo } from 'components/models';
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const $q = useQuasar();
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

    const redirect = () => {
      if ($q.platform.is.mobile) {
        $q.dialog({
          title: 'Job Title',
          message:
            '<iframe style="height: 86vh" class="full-width" src="https://google.co.ve" frameborder="0"></iframe>',
          cancel: true,
          persistent: true,
          html: true,
          maximized: true,
        })
          .onOk(() => {
            console.log('>>>> OK');
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } else {
        window.open('https://google.co.ve', '_blank');
      }
    };
    const confirm = function () {
      $q.dialog({
        title: 'Job Title',
        message:
          '<iframe style="height: 86vh" class="full-width" src="https://google.co.ve" frameborder="0"></iframe>',
        cancel: true,
        persistent: true,
        html: true,
        maximized: true,
      })
        .onOk(() => {
          console.log('>>>> OK');
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };
    return { redirect, todos, text, confirm };
  },
});
</script>
