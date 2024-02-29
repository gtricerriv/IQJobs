<template>
  <div class="flex flex-center q-pa-xl">
    <q-card style="width:80%;" class="my-card flex">
  <q-card-section class="bg-dark fit">
    <div class="text-title">
      {{ title }}
    </div>
    <div class="text-title">
      {{ profile_name }}
    </div>
  </q-card-section>
    <div v-if="firstName" class="fit">
      <q-card-section class="text-h6 text-grey-8">
        {{firstName + ' ' + lastName }}
      </q-card-section>
    </div>
    <div style="width:50%;" class="shadow-4" v-if="area">
      <q-card-section class="text-h6 text-grey-8">
        Area
      </q-card-section>
      <q-card-section>
        {{ area }}
      </q-card-section>
    </div>
    <div style="width:50%;" class="shadow-4" v-if="coverLetter">
      <q-card-section class="text-h6 text-grey-8">
        Cover Letter section
      </q-card-section>
      <q-card-section>
        Cover Letter: {{ coverLetter }}
      </q-card-section>
    </div>
    <div class="shadow-4" v-if="skills">
      <q-card-section class="text-h6 text-grey-8">
        Skills section
      </q-card-section>
      <q-card-section>
        Skills: {{ skills }}
      </q-card-section>
    </div>
    <div class="shadow-4" v-if="education">
      <q-card-section class="text-h6 text-grey-8">
        Education section
      </q-card-section>
      <q-card-section>
        Education: {{ education }}
      </q-card-section>
    </div>
    <div class="shadow-4" v-if="experience">
      <q-card-section class="text-h6 text-grey-8">
        Experience section
      </q-card-section>
      <q-card-section>
        Experience: {{ experience }}
      </q-card-section>
    </div>
    <div class="shadow-4" v-if="projects">
      <q-card-section class="text-h6 text-grey-8">
        Projects section
      </q-card-section>
      <q-card-section v-html="projects">
      </q-card-section>
    </div>
</q-card>


  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CVPage',
  setup() {
    return {
      lorem: `Passionate and dedicated professional with a strong background in multiple industries including technology, marketing, and project management.`,
      title: `Professional Profile - Giancarlo Tricerri`,
      name: `Giancarlo Tricerri`,
      firstName: `Giancarlo`,
      lastName: `Tricerri`,
      area: `Experienced in cross-functional collaboration, strategic planning, and delivering results in fast-paced environments.`,
      coverLetter: `Excellent communicator with the ability to lead and motivate teams towards achieving organizational goals while maintaining a customer-centric approach.`,
      skills: `Proficient in problem-solving, critical thinking, data analysis, and presentation skills. Skilled in various software tools and technologies.`,
      education: `Bachelor's Degree in Business Administration with a focus on Marketing. Additional certifications in project management and leadership development.`,
      experience: `Extensive work history in roles that have honed leadership, project management, and client relationship skills. Recognized for consistently exceeding performance targets.`,
      projects: `Led multiple successful projects from conception to completion, demonstrating strong organizational skills, attention to detail, and ability to adapt to changing circumstances.`
    }
  }
});
</script>
