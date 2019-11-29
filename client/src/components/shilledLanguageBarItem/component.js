const ShilledLaunguageBar = Vue.component('shilled-language-bar', {
  props: {
    'max-bound': Number,
    'lang-count': Number,
    'lang-name': String
  },

  data() {
    return {
      test: 42
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
  }
});

export default ShilledLaunguageBar;
