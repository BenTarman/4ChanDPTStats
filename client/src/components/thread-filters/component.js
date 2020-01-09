import { eventBus } from '../../Events';

const ThreadFilters = Vue.component('thread-filters', {
  template: threadFiltersTemplate,

  components: {
    Multiselect: window.VueMultiselect.default
  },

  data() {
    return {
      values: [],
      options: [
        'typescript',
        'swift',
        'scheme',
        'scala',
        'rust',
        'ruby',
        'python',
        'perl',
        'php',
        'lisp',
        'kotlin',
        'javascript',
        'java',
        'haskell',
        'go',
        'erlang',
        'elixir',
        'C++',
        'C#',
        'C'
      ]
    };
  },

  watch: {
    values() {
      eventBus.$emit('filterPosts', this.values);
    }
  }
});

export default ThreadFilters;
