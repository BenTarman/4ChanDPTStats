function dynamicSort(property) {
  let sortOrder = 1;
  // allow negative sorting
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

const ShilledLanguageBarGraph = Vue.component('shilled-language-bar-graph', {
  data() {
    return {
      componentKey: 0
    };
  },

  template: shilledLanguageBarGraphTemplate,

  props: ['languageCounts'],

  computed: {
    // Give highestCount for language most shilled. This is used as reference.
    // highestcount will have width 100% and other will be relative to it.
    highestCount: function() {
      let max = 0;
      for (let lang of this.languageCounts) {
        const freq = lang.count;
        if (freq > max) {
          max = freq;
        }
      }
      return max;
    }
  },

  methods: {
    sortByLangCounts() {},

    forceRerender() {
      this.componentKey += 1;
    }
  }
});

export default ShilledLanguageBarGraph;