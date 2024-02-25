import { defineStore } from 'pinia';
import User from 'src/Interface/User';
import CV from 'src/Interface/CV';
import Subscription from 'src/Interface/Plan';
import View from 'src/Interface/View';
import Const from 'src/Interface/CONSTANTS';
import Profile from 'src/Interface/Profile';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    users: [] as User[],
    views: [] as View[],
    subscriptions: [] as Subscription[],
    cvs: [] as CV[],
    profiles: [] as Profile[],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getUser: (state) => (userId: string) =>
      state.users.find((user) => user._id === userId),
    getUsers: (state) => () => state.users,
    getView: (state) => (viewId: string) =>
      state.views.find((view) => view._id === viewId),
    getViews: (state) => () => state.views,
    getSubscription: (state) => (subscriptionId: string) =>
      state.subscriptions.find(
        (subscription) => subscription._id === subscriptionId
      ),
    getSubscriptions: (state) => () => state.subscriptions,
    getCV: (state) => (cvId: string) => state.cvs.find((cv) => cv._id === cvId),
    getCVs: (state) => () => state.cvs,
  },
  actions: {
    increment() {
      this.counter++;
    },
    addUser(user: User) {
      this.users.push(user);
    },
    modifyUser(userId: string, updatedUser: User) {
      const index = this.users.findIndex((user) => user._id === userId);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
    },
    removeUser(userId: string) {
      const index = this.users.findIndex((user) => user._id === userId);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
    addView(view: View) {
      this.views.push(view);
    },
    modifyView(viewId: string, updatedView: View) {
      const index = this.views.findIndex((view) => view._id === viewId);
      if (index !== -1) {
        this.views[index] = updatedView;
      }
    },
    removeView(viewId: string) {
      const index = this.views.findIndex((view) => view._id === viewId);
      if (index !== -1) {
        this.views.splice(index, 1);
      }
    },
    addSubscription(subscription: Subscription) {
      this.subscriptions.push(subscription);
    },
    modifySubscription(
      subscriptionId: string,
      updatedSubscription: Subscription
    ) {
      const index = this.subscriptions.findIndex(
        (subscription) => subscription._id === subscriptionId
      );
      if (index !== -1) {
        this.subscriptions[index] = updatedSubscription;
      }
    },
    removeSubscription(subscriptionId: string) {
      const index = this.subscriptions.findIndex(
        (subscription) => subscription._id === subscriptionId
      );
      if (index !== -1) {
        this.subscriptions.splice(index, 1);
      }
    },
    addCV(cv: CV) {
      this.cvs.push(cv);
    },
    modifyCV(cvId: string, updatedCV: CV) {
      const index = this.cvs.findIndex((cv) => cv._id === cvId);
      if (index !== -1) {
        this.cvs[index] = updatedCV;
      }
    },
    removeCV(cvId: string) {
      const index = this.cvs.findIndex((cv) => cv._id === cvId);
      if (index !== -1) {
        this.cvs.splice(index, 1);
      }
    },
    addProfile(profile: Profile) {
      this.profiles.push(profile);
    },
    modifyProfile(profileId: string, updatedProfile: Profile) {
      const index = this.profiles.findIndex(
        (profile) => profile._id === profileId
      );
      if (index !== -1) {
        this.profiles[index] = updatedProfile;
      }
    },
  },
});
