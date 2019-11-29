const ThreadPosts = Vue.component('thread-post', {
  props: ['post'],

  template: threadPostTemplate,

  computed: {
    // Will style post different if its the OP
    postStyle: function() {
      let cssClass = 'OP-post';
      if (!this.post.replies) {
        cssClass = 'thread-post';
      }

      return cssClass;
    }
  }
});

export default ThreadPosts;
