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
        <q-tab v-for="(cv, index) in cvs" :key="index" :name="'cv' + index" :label="'CV ' + cv.name" />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
      >
        <q-tab-panel v-for="(cv, index) in cvs" :key="index" :name="'cv' + index">
          <q-card class="flex">
            <q-card-section class="bg-secondary fit text-title">
              <div class="text-h5 text-white">Professional Profile - {{ cv.name }}</div>
            </q-card-section>
            <div style="width:50%;" class="shadow-4" v-if="cv.area">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Area</q-card-section>
              <q-card-section style="text-align: justify;">{{ cv.area }}</q-card-section>
            </div>
            <div style="width:50%;" class="shadow-4" v-if="cv.coverLetter">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Cover Letter</q-card-section>
              <q-card-section style="text-align: justify;">Cover Letter: {{ cv.coverLetter }}</q-card-section>
            </div>
            <div style="width:50%;" class="shadow-4" v-if="cv.skills">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Skills</q-card-section>
              <q-card-section style="text-align: justify;">
                <ul>
                  <li v-for="skill in cv.skills.split(',')" :key="skill">{{ skill }}</li>
                </ul>
              </q-card-section>
            </div>
            <div style="width:50%;" class="shadow-4" v-if="cv.education">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Education</q-card-section>
              <q-card-section style="text-align: justify;">Education: {{ cv.education }}</q-card-section>
            </div>
            <div class="shadow-4" v-if="cv.experience">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Experience</q-card-section>
              <q-card-section style="text-align: justify;">Experience: {{ cv.experience }}</q-card-section>
            </div>
            <div class="shadow-4" v-if="cv.projects">
              <q-card-section class="text-h6 text-grey-8" style="text-align: justify;">Projects</q-card-section>
              <q-card-section v-html="cv.projects" style="text-align: justify;"></q-card-section>
            </div>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </template>

  </q-splitter>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const cvs = [
      {
        name: 'FrontEnd',
        area: `Experienced in cross-functional collaboration, strategic planning, and delivering results in fast-paced environments.`,
        coverLetter: `Excellent communicator with the ability to lead and motivate teams towards achieving organizational goals while maintaining a customer-centric approach.`,
        skills: `Problem-solving, Critical thinking, Data analysis, Presentation skills, Various software tools and technologies`,
        education: `Bachelor's Degree in Business Administration with a focus on Marketing. Additional certifications in project management and leadership development.`,
        experience: `Extensive work history in roles that have honed leadership, project management, and client relationship skills. Recognized for consistently exceeding performance targets.`,
        projects: `Led multiple successful projects from conception to completion, demonstrating strong organizational skills, attention to detail, and ability to adapt to changing circumstances.`
      },
      {
        name: 'Backend',
        area: `Experienced in cross-functional collaboration, strategic planning, and delivering results in fast-paced environments.`,
        coverLetter: `Excellent communicator with the ability to lead and motivate teams towards achieving organizational goals while maintaining a customer-centric approach.`,
        skills: `Problem-solving, Critical thinking, Data analysis, Presentation skills, Various software tools and technologies`,
        education: `Bachelor's Degree in Business Administration with a focus on Marketing. Additional certifications in project management and leadership development.`,
        experience: `Extensive work history in roles that have honed leadership, project management, and client relationship skills. Recognized for consistently exceeding performance targets.`,
        projects: `Led multiple successful projects from conception to completion, demonstrating strong organizational skills, attention to detail, and ability to adapt to changing circumstances.`
      },
      {
        name: 'DevOps',
        area: `Experienced in cross-functional collaboration, strategic planning, and delivering results in fast-paced environments.`,
        coverLetter: `Excellent communicator with the ability to lead and motivate teams towards achieving organizational goals while maintaining a customer-centric approach.`,
        skills: `Problem-solving, Critical thinking, Data analysis, Presentation skills, Various software tools and technologies`,
        education: `Bachelor's Degree in Business Administration with a focus on Marketing. Additional certifications in project management and leadership development.`,
        experience: `Extensive work history in roles that have honed leadership, project management, and client relationship skills. Recognized for consistently exceeding performance targets.`,
        projects: `Led multiple successful projects from conception to completion, demonstrating strong organizational skills, attention to detail, and ability to adapt to changing circumstances.`
      },
      {
        name: 'Recluiter',
        area: `Experienced in cross-functional collaboration, strategic planning, and delivering results in fast-paced environments.`,
        coverLetter: `Excellent communicator with the ability to lead and motivate teams towards achieving organizational goals while maintaining a customer-centric approach.`,
        skills: `Problem-solving, Critical thinking, Data analysis, Presentation skills, Various software tools and technologies`,
        education: `Bachelor's Degree in Business Administration with a focus on Marketing. Additional certifications in project management and leadership development.`,
        experience: `Extensive work history in roles that have honed leadership, project management, and client relationship skills. Recognized for consistently exceeding performance targets.`,
        projects: `Led multiple successful projects from conception to completion, demonstrating strong organizational skills, attention to detail, and ability to adapt to changing circumstances.`
      },
      
      // Add more CV objects here as needed
    ]

    const tab = ref('cv0')
    const splitterModel = ref(20)

    return { cvs, tab, splitterModel }
  }
}
</script>
