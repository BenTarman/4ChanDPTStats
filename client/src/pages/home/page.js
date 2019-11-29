import {
  getDptThreads,
  getLatestDptThread,
  getThreadInfo
} from '../../utils/thread_utils';

const homePage = {
  template: homePageTemplate,

  data() {
    return {
      languageCounts: [],
      threadInfo: {},
      posts: []
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
    debugger;
    this.posts = mostRecentThread.posts;
  }
};

export default homePage;
