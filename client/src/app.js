import axios from 'axios';

// components used
import ShilledLaunguageBar from "./components/shilledLanguages/component";

function dynamicSort(property) {
  let sortOrder = 1;
  // allow negative sorting
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return (a, b) => {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}



const app = new Vue({
  el: '#shilledLanguageGraph',
  data: {
    componentKey: 0,
    languageCounts: [],
  },

  components: {
    'shilled-language-bar': ShilledLaunguageBar,
  },

  created() {
    // This is tempory. Should do api call in global file and just pass in languageCounts to this vue instance

    axios.get("http://localhost:8000/api/threads").then(activeThreads => {
      const languageCountsObj = activeThreads.data[0].languageCounts;

      for (let key in languageCountsObj) {
        if (languageCountsObj[key] !== 0) {
          this.languageCounts.push({ 
              language: key,
              count: languageCountsObj[key] 
            });
        }
      }
    });

  },

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
    sortByLangCounts() {


    },

    forceRerender() {
      this.componentKey += 1;  
    }
    
  }
});


