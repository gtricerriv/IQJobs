<template>
  <div class="q-pa-md q-gutter-lg" style="width:100%;">
    <q-form @submit="handleSubmit" class="q-gutter-md">
      <q-input label="Profile name" v-model="profileName" />
      <q-input label="First Name" v-model="firstName" />
      <q-input label="Last Name" v-model="lastName" />
      <q-select label="Area" :options="optionsArea" option-label="label" option-value="value" v-model="area" />
      <q-input v-model="coverLetter" type="textarea" label="Cover Letter" />
      <q-select v-model="selectedType" label="Select Type" :options="options" option-label="label"
        option-value="value" />
      <q-select v-model="selectedSite" label="Select Site" :options="siteOptions" option-label="label"
        option-value="value" />
      <q-editor flat content-class="bg-grey-3" toolbar-text-color="white" toolbar-toggle-color="yellow-8"
        toolbar-bg="primary" @paste="pasteCapture" @drop="dropCapture" :toolbar="[
      [
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          options: ['left', 'center', 'right', 'justify']
        }
      ],
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
      ['token', 'hr', 'link', 'custom_btn'],
      ['print', 'fullscreen'],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
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
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
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
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
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
    ]" :fonts="{
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana'
    }" v-model="selectedContent" aria-label="content" max-height="300px" />

      <q-btn class="q-mt-md" label="Submit" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { useJobsStore } from '../stores/jobs';

export default defineComponent({
  name: 'profileComponent',
  setup: function () {
    const jobsStore = useJobsStore();
    const selectedType = ref('Skills');
    const selectedSite = ref('Linkedin');
    const coverLetter = ref('');
    const selectedContent = ref('');
    const profileName = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const area = ref('');
    const options = [
      'Skills',
      'Education',
      'Experience',
      'Projects'
    ];
    const siteOptions = [
      'Linkedin',
      'Glassdoor',
    ];
    const optionsArea = [
      'Software development',
      'Graphic design',
      'Digital marketing',
      'Civil engineering',
      'Human resources',
      'Medicine',
      'Education',
      'Finance',
      'Sales',
      'Market research',
      'Consulting',
      'Architecture',
      'Journalism',
      'Advertising',
      'Interior design',
      'Culinary arts',
      'Logistics',
      'Telecommunications',
      'Web design',
      'Psychology',
      'Law',
      'Art and culture',
      'Environmental engineering',
      'Tourism',
      'E-commerce',
      'Project management',
      'Data Science',
      'Biology',
      'Photography',
      'Archaeology'
    ]
    const content_values = [
      { label: 'Skills', value: 'Skills', content: '' },
      { label: 'Education', value: 'Education', content: '' },
      { label: 'Experience', value: 'Experience', content: '' },
      { label: 'Projects', value: 'Projects', content: '' }
    ];

    watch(selectedType, (newValue) => {
      const selectedTypeObj = content_values.find(type => type.value === newValue);
      if (selectedTypeObj) {
        selectedContent.value = selectedTypeObj.content;
      }
    });

    watch(selectedContent, (newValue) => {
      const selectedTypeObj = content_values.find(type => type.value === selectedType.value);
      if (selectedTypeObj) {
        selectedTypeObj.content = newValue;
      }
    });
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

    const handleSubmit = () => {
      if (profileName.value == '' || firstName.value == '' || lastName.value == '' || area.value == '' || coverLetter.value == '' || selectedContent.value == '') {
        return console.log('completa todos los campos', {
          profileName: profileName.value,
          firstName: firstName.value,
          lastName: lastName.value,
          area: area.value,
          coverLetter: coverLetter.value,
          content: selectedContent.value
        });
      }

      const body = {
        profileName: profileName.value,
        firstName: firstName.value,
        lastName: lastName.value,
        area: area.value,
        coverLetter: coverLetter.value,
        type: selectedType.value,
        site: selectedSite.value,
        content: selectedContent.value
      }

      jobsStore.postCreateJob(body);
    }

    return {
      selectedType,
      coverLetter,
      selectedContent,
      content_values,
      options,
      optionsArea,
      profileName,
      firstName,
      lastName,
      area,
      dropCapture,
      pasteCapture,
      selectedSite,
      siteOptions,
      handleSubmit
    };
  }
});
</script>
