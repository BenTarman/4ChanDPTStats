import { eventBus } from '../../Events';
import {
  getAllDptThreads,
  getLatestDptThread,
  getActiveDptThreads,
  getThreadInfo
} from '../../utils/thread_utils';

const DptStats = Vue.component('dpt-stats', {
  template: dptStatsTemplate,

  data() {
    return {
      prevThreadStyle: 'next-thread__left--disable icon-arrows-square-left',
      nextThreadStyle: 'next-thread__right--active icon-arrows-square-right',
      allThreads: null,
      activeThreads: null
    };
  },

  async created() {
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
      /*
      this.currThreadIdx =
        this.currThreadIdx - 1 < 0 ? 0 : this.currThreadIdx - 1;

      this.setThreadData();
      */
    },

    nextThread() {
      eventBus.$emit('nextThread');

      /*
      this.currThreadIdx =
        this.currThreadIdx + 1 >= this.threads.length
          ? this.currThreadIdx
          : this.currThreadIdx + 1;

      this.setThreadData();
      */
    }
  }
});

export default DptStats;
