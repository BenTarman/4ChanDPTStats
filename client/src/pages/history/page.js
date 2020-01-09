import { getTotalDptStatistics } from '../../utils/thread_utils';

const historyPage = {
  data() {
    return {
      languageCounts: []
    };
  },

  async created() {
    const dptStatsTotal = await getTotalDptStatistics();

    debugger;
    // languageCounts
    const langCounts = [];
    for (let key in dptStatsTotal) {
      if (dptStatsTotal[key] !== 0) {
        langCounts.push({
          language: key,
          count: dptStatsTotal[key]
        });
      }
    }

    this.languageCounts = langCounts;
  },

  template: historyPageTemplate
};

export default historyPage;
