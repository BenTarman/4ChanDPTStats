import axios from 'axios';

const app = new Vue({
  el: '#shilledLanguageGraph',
  data: {
    test: 'Hello Vue!',
    languageCounts: {}
  },

  created() {
    // This is tempory. Should do api call in global file and just pass in languageCounts to this vue instance

    axios.get("http://localhost:8000/api/threads").then(activeThreads => {
      this.languageCounts = activeThreads.data[1].languageCounts;
      console.log(this.languageCounts);
     
    });

  },

  computed: {
    
    // Give highestCount for language most shilled. This is used as reference.
    // highestcount will have width 100% and other will be relative to it.
    highestCount: function() {
      let max = 0;
      for (let lang in this.languageCounts) {
        const freq = this.languageCounts[lang];
        if (freq > max) {
          max = freq;
        }
      }
      return max;
    },

    barWidth: function() {
      return {
        width: 100 + '%'
      }
    }
  },

  methods: {
    
  }
});




Vue.component('shilled-language-bar', {
  template: `
    <div class="shilledLanguage-bar">
    </div>`
})