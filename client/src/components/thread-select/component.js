import { eventBus } from '../../Events';

const ThreadSelect = Vue.component('thread-select', {
  data() {
    return {
      value: ''
    };
  },

  props: ['currentThreads'],

  components: {
    Multiselect: window.VueMultiselect.default
  },

  watch: {
    value() {
      eventBus.$emit('goToThread', this.value.split(':')[0]);
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
