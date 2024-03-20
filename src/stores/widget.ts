import { defineStore } from 'pinia';

export const useWidgetStore = defineStore({
  id: 'widget',
  state: () => ({
    widgetData: {
      description: '',
      position: '',
      provider: '',
      title: '',
    },
    widgetAplicants: [],
    selectedApplicant: {},
    showAplicantDialog: false,
  }),
  getters: {
    getWidgetAplicants(): any {
      return this.widgetAplicants;
    },
    getSelectedAplicant(): any {
      return this.selectedApplicant;
    },
    getShowAplicantDialog(): boolean {
      return this.showAplicantDialog;
    },
  },
  actions: {
    updateWidgetData(newData: any) {
      console.log(newData, 'test2');
      this.widgetData = { ...this.widgetData, ...newData };
    },
    updateWidgetAplicants(newData: any) {
      console.log(' ACTUALIZANDO EL APLICANTS', newData);

      this.widgetAplicants = newData;
    },
    setSelectedAplicant(newData: any) {
      this.selectedApplicant = newData;
      this.setShowAplicantDialog(true);
    },
    setShowAplicantDialog(newData: boolean) {
      this.showAplicantDialog = newData;
    },
  },
});
