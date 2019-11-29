import axios from 'axios';

const ThreadInfo = Vue.component('thread-info', {
  data() {
    return {
      threadInfo: {},
      img: '',
      imgURL: '',
      uniquePosters: 42
    };
  },

  template: threadInfoTemplate,

  created() {
    // This is tempory. Should do api call in global file and just pass in languageCounts to this vue instance
    axios.get('http://localhost:8000/api/threads').then(activeThreads => {
      this.threadInfo = activeThreads.data[0].threadInfo;

      this.imgURL = `http://localhost:8000/api/img/${this.threadInfo.ID}`;
    });
  }
});

export default ThreadInfo;
