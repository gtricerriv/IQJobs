<template>
  <q-layout class="bg-blue-2">
    <q-page-container
      class="fit row wrap justify-center items-start content-start"
    >
      <div class="bound" style="position: absolute; top: 40%">
        <q-img width="15em" src="~assets/iqjobs.png" />
        <div class="mt-5 text-center text-bold">Coming Soon</div>
        <q-btn @click="login">login</q-btn>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: 'LoginButton',
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
  },
};
</script>
<style>
.container {
  position: relative;
  width: 100%;
  height: 300px;
}

/*アニメーション指定
文字数に合わせてleftや開始時間（2つ目のs）を設定する*/
.bound {
  animation: bound-anim 2.8s 0s infinite;
}

@keyframes bound-anim {
  0%,
  100% {
    top: 38%;
    transform: scale(1);
  }
  30% {
    top: 40%;
  }
  50% {
    transform: scale(1);
  }
  90% {
    top: 42%;
    transform: scale(1.2, 0.8);
  }
}
</style>
