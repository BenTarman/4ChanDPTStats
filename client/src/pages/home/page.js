import {
  getDptThreads,
  getLatestDptThread,
  getThreadInfo
} from '../../utils/thread_utils';

import { EventBus } from '../../Events';

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const homePage = {
  template: homePageTemplate,

  data() {
    return {
      languageCounts: [],
      threadInfo: {},
      posts: [],

      currTopThreadPos: 0
    };
  },

  async created() {
    /*
      this.store.findAll('threads')
      */
    // Get

    const dptThreads = await getDptThreads();
    const mostRecentThread = getLatestDptThread(dptThreads);
    const languageCountsObj = mostRecentThread.languageCounts;

    // languageCounts
    for (let key in languageCountsObj) {
      if (languageCountsObj[key] !== 0) {
        this.languageCounts.push({
          language: key,
          count: languageCountsObj[key]
        });
      }
    }

    // threadInfo
    this.threadInfo = await getThreadInfo(mostRecentThread.threadInfo);

    console.log(this.threadInfo);

    // posts
    this.posts = mostRecentThread.posts;
  },

  updated() {
    // TODO: figure out why mounted lifecycle wasn't working for this.
    if (this.posts[0] && document.getElementById(this.posts[0].no)) {
      this.currTopThreadPos = document
        .getElementById(this.posts[0].no)
        .getBoundingClientRect().top;
    }
  },

  methods: {
    adjustView() {
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
  }
};

export default homePage;
