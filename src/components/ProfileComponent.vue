<template>
  <div class="q-pa-md q-gutter-lg" style="width:100%;">
    <q-form @submit="handleSubmit" class="q-gutter-md">
      <q-input label="Profile Name" v-model="profileName" />
      <q-input label="First Name" v-model="firstName" />
      <q-input label="Last Name" v-model="lastName" />
      <q-select label="Area" :options="optionsArea" option-label="label" option-value="value" v-model="area" />
      <q-input v-model="coverLetter" type="textarea" label="Cover Letter" />
      <q-select v-model="selectedType" label="Select Type" :options="options" option-label="label" option-value="value" />
      <q-select v-model="selectedSite" label="Select Site" :options="siteOptions" option-label="label" option-value="value" />
      <q-editor flat content-class="bg-grey-3" toolbar-text-color="white" toolbar-toggle-color="yellow-8"
        toolbar-bg="primary" @paste="pasteCapture" @drop="dropCapture" :toolbar="toolbarOptions" :fonts="editorFonts" v-model="selectedContent" aria-label="content" max-height="300px" />

      <q-btn class="q-mt-md" label="Submit" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { useProfileStore } from '../stores/profile'; // Asegúrate de que la ruta sea correcta
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ProfileComponent',
  setup() {
    const $q = useQuasar();
    const profileStore = useProfileStore();
    
    // Reactive variables
    const profileName = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const area = ref('');
    const coverLetter = ref('');
    const selectedContent = ref('');
    const selectedType = ref('Skills');
    const selectedSite = ref('Linkedin');
    
    // Options for selects
    const options = [
      { label: 'Skills', value: 'Skills' },
      { label: 'Education', value: 'Education' },
      { label: 'Experience', value: 'Experience' },
      { label: 'Projects', value: 'Projects' }
    ];
    const siteOptions = [
      { label: 'Linkedin', value: 'Linkedin' },
      { label: 'Glassdoor', value: 'Glassdoor' }
    ];
    const optionsArea = [
      { label: 'Software development', value: 'Software development' },
      { label: 'Graphic design', value: 'Graphic design' },
      { label: 'Data analyst ', value: 'Data analyst' },
      // ...otras opciones
    ];

    // Handlers for paste and drop events
    const dropCapture = (evt: DragEvent) => {
      evt.preventDefault();
      const files = Array.from((evt.dataTransfer as DataTransfer).files);
      files.forEach((file: File | null) => {
        if (file && file.type.includes('image')) {
          const reader = new FileReader();
          reader.onload = () => {
            selectedContent.value += `<img src="${reader.result}" alt="paste-image" width="250" height="auto" style="margin-right: 5px;"/>`;
          };
          reader.readAsDataURL(file);
        }
      });
    };

    const pasteCapture = (evt: ClipboardEvent) => {
      evt.preventDefault();
      if (evt.clipboardData?.items) {
        Array.from(evt.clipboardData.items).forEach((item: DataTransferItem) => {
          const file = item.getAsFile();
          if (file && file.type.includes('image')) {
            const reader = new FileReader();
            reader.onload = () => {
              selectedContent.value += `<img src="${reader.result}" alt="past-image" width="250" height="auto" style="margin-right: 5px;"/>`;
            };
            reader.readAsDataURL(file);
          }
        });
      }
    };

    // Handle form submission
    const handleSubmit = async () => {
      $q.notify({
          color: 'positive',
          position: 'top-right',
          message: 'Profile created successfully!',
          icon: 'check_circle'
        });
      if (profileName.value === '' || firstName.value === '' || lastName.value === '' || area.value === '' || coverLetter.value === '' || selectedContent.value === '') {
        $q.notify({
          color: 'negative',
          position: 'top-right',
          message: 'Please complete all fields!',
          icon: 'warning'
        });
        return;
      }

      const body = {
        title: profileName.value,
        first_name: firstName.value,
        last_name: lastName.value,
        cover_letter: coverLetter.value,
        skills: selectedType.value,
        area: area.value,
        education: '', // Puedes llenar estos campos si lo deseas
        experience: '',
        projects: '',
        contact: selectedSite.value,
        content: selectedContent.value,
        isRecruiter: false,
        premium: false
      };

      try {
        // Llamada al store para crear un perfil
        profileStore.postCreateProfile(body);

        // Notificación de éxito
        $q.notify({
          color: 'positive',
          position: 'top-right',
          message: 'Profile created successfully!',
          icon: 'check_circle'
        });

        // Opcionalmente, puedes limpiar el formulario después de guardar
        profileName.value = '';
        firstName.value = '';
        lastName.value = '';
        area.value = '';
        coverLetter.value = '';
        selectedContent.value = '';
        selectedType.value = 'Skills';
        selectedSite.value = 'Linkedin';
      } catch (error) {
        $q.notify({
          color: 'negative',
          position: 'top-right',
          message: 'Error creating profile.',
          icon: 'error'
        });
      }
    };

    // Toolbar options for the editor
    const toolbarOptions = [
      [
        {
          label: 'Align',
          icon: 'align',
          fixedLabel: true,
          options: ['left', 'center', 'right', 'justify']
        }
      ],
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
      ['token', 'hr', 'link', 'custom_btn'],
      ['print', 'fullscreen'],
      [
        {
          label: 'Formatting',
          icon: 'format',
          list: 'no-icons',
          options: [
            'p',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'code'
          ]
        },
        {
          label: 'Font Size',
          icon: 'font_size',
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7'
          ]
        },
        {
          label: 'Font',
          icon: 'font',
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana'
          ]
        },
        'removeFormat'
      ],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
      ['undo', 'redo'],
      ['viewsource']
    ];

    // Font options for the editor
    const editorFonts = {
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana'
    };

    return {
      profileName,
      firstName,
      lastName,
      area,
      coverLetter,
      selectedContent,
      selectedType,
      selectedSite,
      options,
      siteOptions,
      optionsArea,
      toolbarOptions,
      editorFonts,
      dropCapture,
      pasteCapture,
      handleSubmit
    };
  }
});
</script>
