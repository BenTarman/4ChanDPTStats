import { eventBus } from '../../Events';

const DptStats = Vue.component('dpt-stats', {
  template: dptStatsTemplate,

  data() {
    return {
      prevThreadStyle: 'next-thread__left--disable icon-arrows-square-left',
      nextThreadStyle: 'next-thread__right--active icon-arrows-square-right',
      threadDate: '',
      currentThreads: [],
      mode: 'all-threads'
    };
  },

  mounted() {
    if (this.mode === 'all-threads') {
      document.querySelector('.all-threads').style.backgroundColor = '#733e39';
    } else {
      document.querySelector('.active-threads').style.backgroundColor =
        '#733e39';
    }
  },

  async created() {
    eventBus.$on('setThreadDate', date => {
      this.threadDate = date;
    });

    eventBus.$on('setCurrentThreads', threads => {
      this.currentThreads = threads;
    });

    eventBus.$on('disableLeftArrow', () => {
      this.prevThreadStyle =
        'next-thread__left--disable icon-arrows-square-left';
      this.nextThreadStyle =
        'next-thread__right--active icon-arrows-square-right';
    });

    eventBus.$on('disableRightArrow', () => {
      this.prevThreadStyle =
        'next-thread__left--active icon-arrows-square-left';
      this.nextThreadStyle =
        'next-thread__right--disable icon-arrows-square-right';
    });

    eventBus.$on('resetArrows', () => {
      this.prevThreadStyle =
        'next-thread__left--disable icon-arrows-square-left';
      this.nextThreadStyle =
        'next-thread__right--active icon-arrows-square-right';
    });

    eventBus.$on('enableBothArrows', () => {
      this.prevThreadStyle =
        'next-thread__left--active icon-arrows-square-left';
      this.nextThreadStyle =
        'next-thread__right--active icon-arrows-square-right';
    });

    eventBus.$on('disableBothArrows', () => {
      this.prevThreadStyle =
        'next-thread__left--disable icon-arrows-square-left';
      this.nextThreadStyle =
        'next-thread__right--disable icon-arrows-square-right';
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
