import { eventBus } from '../../Events';

const ShilledLanguageBarGraph = Vue.component('shilled-language-bar-graph', {
  data() {
    return {
      currentSort: 'random'
    };
  },

  created() {
    eventBus.$on('sortGraph', sortValue => {
      this.currentSort = sortValue;
    });
  },

  beforeUpdate() {
    if (this.currentSort === 'ascending') {
      this.sortAscending();
    } else if (this.currentSort === 'descending') {
      this.sortDescending();
    } else if (this.currentSort === 'alphabetical') {
      this.sortAlphebetical();
    } else {
      this.sortRandom();
    }
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

  watch: {
    currentSort: function() {
      if (this.currentSort === 'ascending') {
        this.sortAscending();
      } else if (this.currentSort === 'descending') {
        this.sortDescending();
      } else if (this.currentSort === 'alphabetical') {
        this.sortAlphebetical();
      } else {
        this.sortRandom();
      }
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
