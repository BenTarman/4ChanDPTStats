import { eventBus } from '../../Events';

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
  created() {
    eventBus.$on('sortGraph', sortValue => {
      if (sortValue === 'ascending') {
        this.sortAscending();
      } else if (sortValue === 'descending') {
        this.sortDescending();
      } else if (sortValue === 'alphabetical') {
        this.sortAlphebetical();
      } else {
        this.sortRandom();
      }
    });
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
    sortAscending() {
      this.languageCounts = this.languageCounts.sort(
        (a, b) => a.count < b.count
      );
    },

    sortDescending() {
      this.languageCounts = this.languageCounts.sort(
        (a, b) => a.count > b.count
      );
    },

    sortAlphebetical() {
      this.languageCounts = this.languageCounts.sort(
        (a, b) => a.language > b.language
      );
    },

    sortRandom() {
      // need to shallow copy before shuffling.
      const shuffleArr = [...this.languageCounts];
      for (let i = shuffleArr.length - 1; i > 0; i--) {
        // randomly get index to swap places with.
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
      }

      this.languageCounts = shuffleArr;
    }
  }
});

export default ShilledLanguageBarGraph;
