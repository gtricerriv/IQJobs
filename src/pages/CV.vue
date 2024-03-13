<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 80%"
  >

    <template v-slot:before>
      <q-tabs
        v-model="tab"
        vertical
        class="text-teal"
      >
        <q-tab v-for="(profile, index) in profiles" :key="index" :name="'profile' + index" :label="profile.name">
          {{ profile.title }}
        </q-tab>
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
      >
        <q-tab-panel v-for="(profile, index) in profiles" :key="index" :name="'profile' + index">
          <q-card class="flex">
            <q-card-section class="bg-secondary fit text-title">
              <div class="text-h5 text-white">Professional Profile - {{ profile.title }}</div>
            </q-card-section>
            <div style="width:50%;" class="shadow-4" v-if="profile.area">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Area</q-card-section>
              <q-card-section style="text-align: justify;">{{ profile.area }}</q-card-section>
            </div>
            <div style="width:50%;" class="shadow-4" v-if="profile.coverLetter">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Cover Letter</q-card-section>
              <q-card-section style="text-align: justify;">Cover Letter: {{ profile.coverLetter }}</q-card-section>
            </div>
            <div style="width:50%;" class="shadow-4" v-if="profile.skills">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Skills</q-card-section>
              <q-card-section style="text-align: justify;">
                <ul>
                  <li v-for="skill in profile.skills.split(',')" :key="skill">{{ skill }}</li>
                </ul>
              </q-card-section>
            </div>
            <div style="width:50%;" class="shadow-4" v-if="profile.education">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Education</q-card-section>
              <q-card-section style="text-align: justify;">Education: {{ profile.education }}</q-card-section>
            </div>
            <div class="shadow-4" v-if="profile.experience">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Experience</q-card-section>
              <q-card-section style="text-align: justify;">Experience: {{ profile.experience }}</q-card-section>
            </div>
            <div class="shadow-4" v-if="profile.projects">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Projects</q-card-section>
              <q-card-section v-html="profile.projects" style="text-align: justify;"></q-card-section>
            </div>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </template>

  </q-splitter>
</template>

<script>
import { ref, onMounted, onUpdated } from 'vue';
import { useProfileStore } from '../stores/profile';

export default {
  setup() {
    const profiles = ref([]);
    const tab = ref('profile0');
    const splitterModel = ref(20);

    const profileStore = useProfileStore(); // Accede a la store de 'profile'

    onMounted(async () => {
      setTimeout(()=>{
        profiles.value = profileStore.profiles; // Asigna los perfiles de la store a la variable local
      },4000);
    });


    return { profiles, tab, splitterModel };
  }
}
</script>
