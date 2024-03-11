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
  }),
  actions: {
    updateWidgetData(newData: any) {
      console.log(newData, 'test2');
      this.widgetData = { ...this.widgetData, ...newData };
    },
  },
});
