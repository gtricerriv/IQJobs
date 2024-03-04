<template>
  <div class="q-pa-xl q-gutter-xl">
    <q-input label="email" v-model="email" />
    <q-input label="phone number" v-model="phone" />
    <q-input label="country" v-model="country" />
    <q-input label="subscription" v-model="subscription" disable />
    <q-btn label="add method pay" _blank="true" href="https://billing.stripe.com/p/session/test_YWNjdF8xT1dxTFNBYnBiaFUyUnBpLF9QZVpuT3BLUFFRRnNCVDF6UkpFc01la1NCVHVCb3Rw0100luWenhPr" />
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    return{
      email:'giancarlo.jobs2021@gmail.com',
      phone: '+584246974443',
      country: 'VE',
      subscription: 'Free'
    }
  }
};
</script>
