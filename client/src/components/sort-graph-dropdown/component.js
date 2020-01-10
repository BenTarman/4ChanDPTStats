import { eventBus } from '../../Events';

const SortGraphDropdown = Vue.component('sort-graph-dropdown', {
  data() {
    return {
      value: '',
      options: ['ascending', 'descending', 'alphabetical', 'random']
    };
  },

  components: {
    Multiselect: window.VueMultiselect.default
  },

  watch: {
    value() {
      eventBus.$emit('sortGraph', this.value);
    }
  },

  template: sortGraphDropdownTemplate
});

export default SortGraphDropdown;
