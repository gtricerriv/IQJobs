<template>
  <div>
    <!-- Información del perfil actual -->
    <template v-if="userStore.isCurrentProfileSelected() && !getCurrentRole">
      <div class="text-h6 text-grey">Current Profile:</div>
      <div class="text-h6 text-grey">{{ userStore.currentProfile?.title }}</div>
      <div class="text-h6 text-grey">{{ userStore.getCurrentProfile?.area }}</div>
    </template>

    <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"
      :class="showProfile || showTableProfile ? 'shadow-4' : ''" style="height: 95vh; width: 100%">
      <div class="q-pa-md flex-center">
        <!-- Información del widget -->
        <div v-if="!getCurrentRole">
          <p>{{ position }}</p>
          <p>{{ provider }}</p>
          <div v-html="description"></div>
        </div>

        <!-- Mostrar los perfiles de los candidatos para administradores -->
        <div v-else-if="showAdminProfiles">
          <AplicantCard :aplicant="item" v-for="item in widgetStore.widgetProfiles" :key="item._id" />
        </div>

        <!-- Mostrar los candidatos aplicantes -->
        <div v-else>
          <AplicantCard :aplicant="item" v-for="item in widgetStore.getWidgetAplicants" :key="item.id" />
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user';
import AplicantCard from '../components/AplicantCard.vue';
import { useWidgetStore } from '../stores/widget';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'WidgetPage',
  components: {
    AplicantCard
  },
  props: {
    description: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const widgetStore = useWidgetStore();
    const { showAdminProfiles } = storeToRefs(widgetStore);
    const { getCurrentRole } = storeToRefs(userStore);

    // Fetch applicants data on component mount
    onMounted(() => {
      widgetStore.fetchApplicants(); // Fetching applicant data
    });

    return {
      userStore,
      widgetStore,
      showAdminProfiles,
      getCurrentRole,
    };
  },
});
</script>
