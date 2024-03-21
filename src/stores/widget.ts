import { defineStore } from 'pinia';
import { sortPremiunFirst } from '../helpers/sortPremiunFirst';
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
      return sortPremiunFirst(this.widgetAplicants);
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
      this.widgetData = { ...this.widgetData, ...newData };
    },
    updateWidgetAplicants(newData: any) {
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
