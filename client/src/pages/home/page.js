import getDptThreads from '../../utils/thread_utils';

const homePage = {
  template: homePageTemplate,

  data() {
    return {
      languageCounts: [],
      dptThreads: []
    };
  },

  async created() {
    /*
      this.store.findAll('threads')
      */
    // Get
    this.dptThreads = await getDptThreads();

    const languageCountsObj = this.dptThreads.data[0].languageCounts;

    for (let key in languageCountsObj) {
      if (languageCountsObj[key] !== 0) {
        this.languageCounts.push({
          language: key,
          count: languageCountsObj[key]
        });
      }
    }
  }
};

export default homePage;
