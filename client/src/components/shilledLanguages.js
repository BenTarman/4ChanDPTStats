
const ShilledLaunguageBar = Vue.component('shilled-language-bar', {
  props: {
    'max-bound': Number,
    'lang-count': Number,
    'lang-name': String,
  },

  data(){
    return {
      test: 42
    }
  },

  template: `
  <div class="bar-element">
    <div class="row">
      <div class="langName">
        <div>{{langName}}</div>
      </div>

      <div class="barGraph">
        <div class=shilledLanguage-bar :style="barWidth"></div>
      </div>

      <div class="languageCount">
        <div> {{langCount}}</div>
      </div>
    </div>
  </div>
    `,

  computed: {
    barWidth: function() {
      const width = (this.langCount / this.maxBound) * 100;
      return {
        width: width + '%'
      };
    }
  }
})


export default ShilledLaunguageBar;