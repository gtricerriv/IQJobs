<template>
  <div class="q-pa-xl">
    <div class="q-mb-lg q-gutter-md">
      <q-btn label="Add Profile" color="primary" @click="() => { showProfile = true; showTableProfile = false }" />
      <q-btn label="View Profiles" color="secondary" @click="() => { showTableProfile = true; showProfile = false }" />
      <q-btn label="Import Profile" color="accent"
        @click="() => { showImportProfile = true; showTableProfile = false; showProfile = false }" />
    </div>
    <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"
      :class="showProfile || showTableProfile ? 'shadow-4' : ''" style="height: 65vh; min-width: 60vw">
      <div class="q-pa-md" v-if="showTableProfile">
        <table-profile-component />
      </div>
      <div class="q-pa-md" v-if="showProfile">
        <div class="text-h6 text-grey">
          Profile
          <q-btn to="/" class="float-right" round color="secondary" icon="visibility" />
        </div>
        <profile-component />
      </div>

      <div class="q-pa-md" v-if="showImportProfile">
        <ImportProfile></ImportProfile>
      </div>

    </q-scroll-area>
  </div>
</template>
<script>
import ProfileComponent from 'components/ProfileComponent.vue';
import TableProfileComponent from 'components/TableProfileComponent.vue';
import ImportProfile from '../components/ImportProfile.vue'
import { ref } from 'vue';

export default {
  name: 'ProfilePage',
  components: { TableProfileComponent, ProfileComponent, ImportProfile },
  setup() {
    const showProfile = ref(false);
    const showTableProfile = ref(false);
    const showImportProfile = ref(false);
    const thumbStyle = {
      right: '4px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75,
    }

    const barStyle = {
      right: '2px',
      borderRadius: '9px',
      backgroundColor: '#027be3',
      width: '9px',
      opacity: 0.2
    }

    return {
      showProfile,
      showTableProfile,
      thumbStyle,
      barStyle,
      showImportProfile
    }
  }
};
</script>
