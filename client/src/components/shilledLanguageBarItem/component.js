const ShilledLaunguageBar = Vue.component('shilled-language-bar', {
  props: {
    'max-bound': Number,
    'lang-count': Number,
    'lang-name': String
  },

  data() {
    return {
      isSelected: false
    };
  },

  template: shilledLanguagesTemplate,

  computed: {
    barWidth: function() {
      const width = (this.langCount / this.maxBound) * 100;
      return {
        width: width + '%'
      };
    }
  },

  methods: {
    // TODO: When a bar is selected, we will treat is a "filter"
    showUsageInThread() {}
  }
});

export default ShilledLaunguageBar;
