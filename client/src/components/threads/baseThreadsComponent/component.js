import {
  getAllDptThreads,
  getActiveDptThreads,
  getThreadInfo
} from '../../../utils/thread_utils';

import { eventBus } from '../../../Events';

const BaseThreadsComponent = {
  data() {
    return {
      languageCounts: [],
      threadInfo: {},
      posts: [],
      currTopThreadPos: 0,
      threads: null,
      currThreadIdx: 0,
      filteredPosts: []
    };
  },

  props: ['prevThreadStyle', 'nextThreadStyle'],

  async created() {
    eventBus.$on('filterPosts', filters => {
      this.updatePostsByFilter(filters);
    });

    eventBus.$on('nextThread', () => {
      this.currThreadIdx =
        this.currThreadIdx + 1 >= this.threads.length
          ? this.currThreadIdx
          : this.currThreadIdx + 1;

      this.setThreadData();
    });

    eventBus.$on('prevThread', () => {
      this.currThreadIdx =
        this.currThreadIdx - 1 < 0 ? 0 : this.currThreadIdx - 1;

      this.setThreadData();
    });

    this.threads =
      this.$route.name === 'all-threads'
        ? await getAllDptThreads()
        : await getActiveDptThreads();
    this.setThreadData();

    if (this.threads.length <= 1) {
      eventBus.$emit('disableBothArrows');
    }
  },

  updated() {
    // TODO: figure out why mounted lifecycle wasn't working for this.
    if (this.posts[0] && document.getElementById(this.posts[0].no)) {
      this.currTopThreadPos = document
        .getElementById(this.posts[0].no)
        .getBoundingClientRect().top;
    }
  },

  beforeRouteLeave(to, from, next) {
    eventBus.$emit('resetArrows');
    next();
  },

  watch: {
    currThreadIdx() {
      if (this.currThreadIdx === 0) {
        eventBus.$emit('disableLeftArrow');
      } else if (this.currThreadIdx === this.threads.length - 1) {
        eventBus.$emit('disableRightArrow');
      } else {
        eventBus.$emit('enableBothArrows');
      }
    }
  },

  methods: {
    async setThreadData() {
      const currThread = this.threads[this.currThreadIdx];

      const languageCountsObj = currThread.languageCounts;

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
      this.threadInfo = await getThreadInfo(currThread.threadInfo);

      // posts
      this.posts = currThread.posts;

      // by default show whole thread
      this.filteredPosts = this.posts;
    },

    updatePostsByFilter(filter) {
      if (filter.length === 0) {
        this.filteredPosts = this.posts;
      } else {
        this.filteredPosts = this.posts.filter(post => {
          const languages = post.languageMentions.split(';');

          let ret = [];
          filter.forEach(lang => {
            ret.push(languages.includes(lang));
          });
          return !ret.includes(false);
        });
      }
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
