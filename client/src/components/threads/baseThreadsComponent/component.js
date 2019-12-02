import {
  getDptThreads,
  getLatestDptThread,
  getThreadInfo
} from '../../../utils/thread_utils';

const BaseThreadsComponent = {
  data() {
    return {
      languageCounts: [],
      threadInfo: {},
      posts: [],
      currTopThreadPos: 0,
      threads: null,
      currThreadIdx: 0,
      prevThreadStyle: 'next-thread__left--disable icon-arrows-square-left',
      nextThreadStyle: 'next-thread__right--active icon-arrows-square-right'
    };
  },

  props: {
    mode: {
      default: '',
      type: String
    }
  },

  async created() {
    this.threads = await getDptThreads();
    this.setThreadData();
  },

  updated() {
    // TODO: figure out why mounted lifecycle wasn't working for this.
    if (this.posts[0] && document.getElementById(this.posts[0].no)) {
      this.currTopThreadPos = document
        .getElementById(this.posts[0].no)
        .getBoundingClientRect().top;
    }
  },

  beforeRouteEnter(to, from, next) {
    console.log('WTF');
    next(vm => {
      console.log('mode: ', vm.mode);
    });
  },

  watch: {
    currThreadIdx() {
      if (this.currThreadIdx === 0) {
        this.prevThreadStyle =
          'next-thread__left--disable icon-arrows-square-left';
        this.nextThreadStyle =
          'next-thread__right--active icon-arrows-square-right';
      } else if (this.currThreadIdx === this.threads.data.length - 1) {
        this.prevThreadStyle =
          'next-thread__left--active icon-arrows-square-left';
        this.nextThreadStyle =
          'next-thread__right--disable icon-arrows-square-right';
      } else {
        this.prevThreadStyle =
          'next-thread__left--active icon-arrows-square-left';
        this.nextThreadStyle =
          'next-thread__right--active icon-arrows-square-right';
      }
    }
  },

  methods: {
    async setThreadData() {
      const mostRecentThread = this.threads.data[this.currThreadIdx];

      const languageCountsObj = mostRecentThread.languageCounts;

      // languageCounts
      const langCounts = [];
      for (let key in languageCountsObj) {
        if (languageCountsObj[key] !== 0) {
          langCounts.push({
            language: key,
            count: languageCountsObj[key]
          });
        }
      }

      this.languageCounts = langCounts;

      // threadInfo
      this.threadInfo = await getThreadInfo(mostRecentThread.threadInfo);

      // posts
      this.posts = mostRecentThread.posts;
    },

    prevThread() {
      this.currThreadIdx =
        this.currThreadIdx - 1 < 0 ? 0 : this.currThreadIdx - 1;

      this.setThreadData();
    },

    nextThread() {
      this.currThreadIdx =
        this.currThreadIdx + 1 >= this.threads.data.length
          ? this.currThreadIdx
          : this.currThreadIdx + 1;

      this.setThreadData();
    },

    adjustView() {
      // TODO: actually I think vue router can do this scrolling easier.
      const container = document.querySelector('.chanThread');
      let postToScrollToId = null;

      for (let post of this.posts) {
        const postElem = document.getElementById(post.no);

        if (
          postElem.getBoundingClientRect().bottom - this.currTopThreadPos >
          container.clientHeight
        ) {
          postToScrollToId = post.no;
          break;
        }
      }

      // just leave view the same if we are at end of thread
      if (postToScrollToId !== null) {
        document.getElementById(postToScrollToId).scrollIntoView();
      }
    }
  },

  template: threadsTemplate
};

export default BaseThreadsComponent;
