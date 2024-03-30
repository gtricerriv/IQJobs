<template>
  <div>
    <GoogleTranslateSelect 
    default-language-code="fr"
    default-page-language-code="fr"
    :fetch-browser-language="false"
    trigger="click"
    @select="handleGoogleTranslateSelect"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted,
} from 'vue';
import GoogleTranslateSelect from '@google-translate-select/vue3';

export default defineComponent({
  name: 'GoogleTraslate',
  components: { GoogleTranslateSelect },
  setup() {
    const validDomains = ['en-', 'es-', 'fr-'];
    const currentDomain = window.location.hostname;
    let selectedLanguage = 'en';

    if (validDomains.some(domain => currentDomain.includes(domain))) {
      selectedLanguage = currentDomain.substring(0, 2);
      setTimeout(() => {
        // Obtener el elemento del componente GoogleTranslateSelect
        const googleTranslateSelect = document.querySelector('.google-translate-select');

        // Encontrar el elemento del idioma francés en la lista de idiomas
        const frenchLanguageElement = googleTranslateSelect.querySelector(`[data-language-code='${selectedLanguage}']`);

        // Seleccionar el idioma francés
        if (frenchLanguageElement) {
            frenchLanguageElement.click();
            document.body.click();
        }
  
      }, 2000);
    } else {
      console.log("Domain does not match the specified patterns.");
      // Imprime o maneja el caso donde el dominio no coincide
      setTimeout(() => {
        // Obtener el elemento del componente GoogleTranslateSelect
        const googleTranslateSelect = document.querySelector('.google-translate-select');

        // Encontrar el elemento del idioma francés en la lista de idiomas
        const frenchLanguageElement = googleTranslateSelect.querySelector(`[data-language-code='${selectedLanguage}']`);

        // Seleccionar el idioma francés
        if (frenchLanguageElement) {
            frenchLanguageElement.click();
            document.body.click();
        }
  
      }, 2000);
    }

    const showGoogleTranslateSelect = selectedLanguage !== 'fr';
    
    const handleGoogleTranslateSelect = (language: any) => {
      console.log(language);
    }

    return { selectedLanguage, showGoogleTranslateSelect, handleGoogleTranslateSelect };
  },
});
</script>
