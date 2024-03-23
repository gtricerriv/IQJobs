<template>
  <GoogleTranslateSelect default-language-code="en" default-page-language-code="en" :fetch-browser-language="false"
    trigger="click" @select="handleGoogleTranslateSelect" />
</template>
<script setup lang="ts">
import GoogleTranslateSelect from '@google-translate-select/vue3';

const handleGoogleTranslateSelect = (language: any) => {
  console.log(language)
}
</script>