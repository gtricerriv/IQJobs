<template>
  <q-layout>
    <q-page-container class="q-pa-md">
      <q-page class="my-padding-x q-ml-sm q-pa-xl">
        <div class="row q-col-gutter-md justify-center">
          <div class="col-md-9 col-xs-12">
            <q-card class="my-card">
              <img src="../assets/iqjobs.png" height="230">
              <q-card-section class="row justify-around">
                <div class="text-h3 col-sm-5 col-xs-12 text-weight-bold">Welcome to the IQJobs platform.</div>

                <div class="q-gutter-sm col-md-5 col-xs-12">
                  <div class="text-caption">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quasi eaque
                    illo unde ratione, explicabo cum iste dolore, saepe neque, mollitia maxime. Non deserunt labore
                    nostrum ad facilis excepturi maiores!</div>
                  <q-btn class="bg-primary text-white q-mt-lg" label="Log In" unelevated flat />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-md-3 col-xs-12">
            <q-card class="my-card text-white q-pa-none q-ma-none bg-green">
              <q-card-section class="q-mb-lg q-pb-none">
                <div class="text-h4 text-weight-bold text-white">New Features 🎖️</div>
              </q-card-section>
              <q-card-section class="q-pa-none q-ma-none">
                <q-card-section v-for="(mytext, i) in mytexts" :key="i">
                  <h6 class="q-my-none q-px-none text-white font-weight-bold titleCard">{{ mytext.title
                    }}
                  </h6>
                  <div class="text-subtitle2 q-my-none q-px-none">{{ mytext.content }}</div>
                  <q-separator size="1px" color="grey-5" class="q-mt-md q-pb-none q-mb-none"
                    v-if="i < mytexts.length - 1" />
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>

        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>

import { ref } from 'vue'

const mytexts = ref([
  {
    title: 'Chat with Recruiters',
    content: 'Lorem ipsun dolor sit amet consectetur adipisicing elit.!'
  },
  {
    title: 'Import your profile from LinkedIn and Glassdoor',
    content: 'What are the possible adverse effetcs of on-demand AI image generation?'
  },
  {
    title: 'Create jobs with just a few clicks',
    content: 'Private funding by VC firms is down 50% YOY. We take a look at what that means.'
  }
])

</script>

<style lang="scss" scoped>
.q-page-container {
  background-color: #fffffffc !important;
}

.titleCard {
  cursor: pointer;
  margin-top: -15px;

  &:hover {
    color: $amber-4 !important;
  }
}

.title-card-2 {
  cursor: pointer;

  &:hover {
    color: rgb(203, 78, 78);
  }
}

.my-btn-color {
  background-color: #141129;
}

.my-card {
  max-width: 100%;
  border-radius: none !important;
}

.my-card-2 {
  width: 35%;
}

.my-card-text-color {
  color: #141129;

  &:hover {
    color: rgb(203, 78, 78) !important;
  }
}

.q-card {
  border-radius: 0 !important;
}

.q-btn:hover {
  background-color: rgb(203, 78, 78) !important;
}
</style>