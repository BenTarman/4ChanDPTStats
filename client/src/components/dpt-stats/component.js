import { eventBus } from '../../Events';

const DptStats = Vue.component('dpt-stats', {
  template: dptStatsTemplate,

  data() {
    return {
      prevThreadStyle: 'icon icon-keyboard_arrow_left--active',
      nextThreadStyle: 'icon icon-keyboard_arrow_right--active',
      threadDate: '',
      currentThreads: [],
      showThread: null
    };
  },

  async created() {
    eventBus.$on('setMode', mode => {
      if (mode === 'all-threads') {
        document.querySelector('.all-threads').style.backgroundColor =
          '#733e39';
        document.querySelector('.active-threads').style.backgroundColor =
          '#353535';
      } else {
        document.querySelector('.active-threads').style.backgroundColor =
          '#733e39';
        document.querySelector('.all-threads').style.backgroundColor =
          '#353535';
      }
    });

    eventBus.$on('setThreadDate', date => {
      this.threadDate = date;
    });

    eventBus.$on('setCurrentThreads', threads => {
      this.currentThreads = threads;
    });

    eventBus.$on('setShowThread', thread => {
      this.showThread = thread;
    });

    eventBus.$on('disableLeftArrow', () => {
      this.prevThreadStyle = 'icon icon-keyboard_arrow_left--disable';
      this.nextThreadStyle = 'icon icon-keyboard_arrow_right--active';
    });

    eventBus.$on('disableRightArrow', () => {
      this.prevThreadStyle = 'icon icon-keyboard_arrow_left--active';
      this.nextThreadStyle = 'icon icon-keyboard_arrow_right--disable';
    });

    eventBus.$on('resetArrows', () => {
      this.prevThreadStyle = 'icon icon-keyboard_arrow_left--disable';
      this.nextThreadStyle = 'icon icon-keyboard_arrow_right--active';
    });

    eventBus.$on('enableBothArrows', () => {
      this.prevThreadStyle = 'icon icon-keyboard_arrow_left--active';
      this.nextThreadStyle = 'icon icon-keyboard_arrow_right--active';
    });

    eventBus.$on('disableBothArrows', () => {
      this.prevThreadStyle = 'icon icon-keyboard_arrow_left--disable';
      this.nextThreadStyle = 'icon icon-keyboard_arrow_right--disable';
    });
  },

  methods: {
    prevThread() {
      eventBus.$emit('prevThread');
    },

    nextThread() {
      eventBus.$emit('nextThread');
    }
  }
});

export default DptStats;
