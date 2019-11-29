const ThreadInfo = Vue.component('thread-info', {
  props: ['threadInfo'],

  template: threadInfoTemplate,

  created() {
    console.log('da threadinfo', this.threadInfo);
  }
});

export default ThreadInfo;
