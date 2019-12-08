import { eventBus } from '../../Events';

const ThreadFilters = Vue.component('thread-filters', {
  template: threadFiltersTemplate,

  components: {
    Multiselect: window.VueMultiselect.default
  },

  data() {
    return {
      values: [],
      options: ['python', 'javascript']
    };
  },

  watch: {
    values() {
      eventBus.$emit('filterPosts', this.values);
    }
  }
});

export default ThreadFilters;
