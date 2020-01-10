import { eventBus } from '../../Events';

const ThreadSelect = Vue.component('thread-select', {
  data() {
    return {
      value: ''
    };
  },

  props: ['currentThreads', 'showThread'],

  components: {
    Multiselect: window.VueMultiselect.default
  },

  watch: {
    value() {
      eventBus.$emit('goToThread', this.value.split(':')[0]);
    },

    // Manually select from dropdown list if thread view changed in some other way besides using dropdown
    // (ie press arrow or initial page load).
    showThread() {
      this.value = `${this.showThread.threadInfo.threadID}: ${this.showThread.posts[0].now}`;
    }
  },

  computed: {
    options() {
      return this.currentThreads
        ? this.currentThreads.map(
            thread => `${thread.threadInfo.threadID}: ${thread.posts[0].now}`
          )
        : [];
    }
  },

  template: threadSelectTemplate
});

export default ThreadSelect;
