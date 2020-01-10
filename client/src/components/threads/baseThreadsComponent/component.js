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
      filteredPosts: [],
      highlightLangs: false,
      currFilters: []
    };
  },

  props: ['prevThreadStyle', 'nextThreadStyle'],

  async created() {
    eventBus.$on('filterPosts', filters => {
      this.updatePostsByFilter(filters);
      this.currFilters = filters;
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

    // Go to specefic thread selected from dropdown control
    eventBus.$on('goToThread', threadID => {
      this.currThreadIdx = this.threads.indexOf(
        this.threads.find(thread => thread.threadInfo.threadID === threadID)
      );
      this.setThreadData();
    });

    this.threads =
      this.$route.name === 'all-threads'
        ? await getAllDptThreads()
        : await getActiveDptThreads();
    this.setThreadData();

    eventBus.$emit('setMode', this.$route.name);
    eventBus.$emit('setCurrentThreads', this.threads);

    debugger;
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

    if (this.highlightLangs) {
      this.filteredPosts.forEach(post => {
        // highlight the shown language in the comment
        const elemToStyle = document.getElementById(post.no);
        if (elemToStyle && this.currFilters) {
          this.currFilters.forEach(lang => {
            elemToStyle.querySelector(`.${lang}`).style.color = '#00b277';
          });
        }
      });
    }
  },

  beforeRouteLeave(to, from, next) {
    eventBus.$emit('resetArrows');
    next();
  },

  watch: {
    currThreadIdx() {
      // emit to change the thread info.
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

      // Make sure dropdown sets correct thread on display
      eventBus.$emit('setShowThread', currThread);

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

      // Thread date is on the first post
      eventBus.$emit('setThreadDate', this.posts[0].now);

      // by default show whole thread
      this.filteredPosts = this.posts;
    },

    updatePostsByFilter(filter) {
      if (filter.length === 0) {
        this.filteredPosts = this.posts;
        this.highlightLangs = false;
      } else {
        this.highlightLangs = true;

        this.filteredPosts = this.posts.filter(post => {
          const languages = post.languageMentions.split(';');

          let ret = [];
          filter.forEach(lang => {
            ret.push(languages.includes(lang));
          });

          // elemToStyle.querySelector(`.${languages[0]}`).style.color = 'green';

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
