const ThreadTypeSelect = Vue.component('thread-type-select', {
  data() {
    return {
      value: ''
    };
  },

  template: threadTypeSelectTemplate
});

export default ThreadTypeSelect;
