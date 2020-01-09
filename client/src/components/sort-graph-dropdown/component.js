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

  template: sortGraphDropdownTemplate
});

export default SortGraphDropdown;
