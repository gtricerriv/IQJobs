<template>
  <div @click="updateWidget(props)" class="onPress q-pa-md bg-s shadow-4 bg-grey-1">
    <div class="row">
      <div class="col-3 text-start">
        <q-icon color="grey" size="xl" name="newspaper" />
        <q-icon class="q-ml-md" color="primary" size="sm" name="group" /> {{ aplicants.length }}
      </div>
      <div class="col q-mt-sm text-right text-grey">
        <div class="text-bold">{{ title }}</div>
        <div class="text-info text-bold">{{ position }}</div>
      </div>
    </div>
    <div class="text-primary text-bold">{{ provider }}</div>
    <div class="q-pt-sm text-grey text-justify">{{ cleanDescription }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useWidgetStore } from '../stores/widget';

const widgetStore = useWidgetStore();
export default defineComponent({
  name: 'ArticleComponent',
  props: {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    aplicants: {
      type: Array,
      required: true,
    },
    job_id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const $q = useQuasar();

    const cleanDescription = ref('');

    // Función para limpiar las etiquetas HTML del texto
    const cleanHtmlTags = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    };

    // Limpiar las etiquetas HTML de la descripción
    cleanDescription.value = cleanHtmlTags(props.description);

    const redirect = () => {
      // Tu lógica de redirección aquí
    };

    const confirm = () => {
      // Tu lógica de confirmación aquí
    };

    const updateAplicants = () => {
      console.log('aplicantes desde la funcion', props.aplicants);
      widgetStore.updateWidgetAplicants(props.aplicants);
      widgetStore.selectedJoId = props.job_id;
    }

    const updateWidget = (props) => {
      widgetStore.updateWidgetData(props);
      updateAplicants();
    }

    return {
      redirect,
      confirm,
      props,
      cleanDescription,
      updateAplicants,
      updateWidget
    };
  },
});
</script>

<style scoped>
.onPress {
  cursor: pointer;
}
</style>
