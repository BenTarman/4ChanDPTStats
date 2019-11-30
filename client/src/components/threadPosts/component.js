import { EventBus } from '../../Events';

const ThreadPosts = Vue.component('thread-posts', {
  props: ['posts'],

  template: threadPostsTemplate
});

export default ThreadPosts;
