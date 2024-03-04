<template>
  <div class="q-pa-xl">
    <div class="q-mb-lg q-gutter-md">
      <q-btn label="Add Profile" color="primary" @click="()=>{showProfile = true; showTableProfile = false}" />
      <q-btn label="View Profiles" color="secondary" @click="()=>{showTableProfile = true; showProfile = false}" />
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      :class=" showProfile || showTableProfile ? 'shadow-4' : '' "
      style="height: 65vh; width: 80vw"
    >
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
    </q-scroll-area>
  </div>
</template>
<script>
import ProfileComponent from 'components/ProfileComponent.vue';
import TableProfileComponent from 'components/TableProfileComponent.vue';
import { ref } from 'vue';

export default {
  name: 'ProfilePage',
  components: { TableProfileComponent, ProfileComponent },
  setup(){
    return{
      showProfile: ref(false),
      showTableProfile: ref(false),
      thumbStyle: {
        right: '4px',
          borderRadius: '5px',
          backgroundColor: '#027be3',
          width: '5px',
          opacity: 0.75
      },

      barStyle: {
        right: '2px',
          borderRadius: '9px',
          backgroundColor: '#027be3',
          width: '9px',
          opacity: 0.2
      }
    }
  }
};
</script>
