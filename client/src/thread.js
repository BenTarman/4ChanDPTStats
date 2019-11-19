import axios from 'axios';

import ThreadInfo from './components/threadInfo';

const app = new Vue({
    el: '#chanThread',
    data: {
      threadInfo: {},
      imgURL: '',
    },

    components: {
        'thread-info': ThreadInfo,
    },


    created() {
        // This is tempory. Should do api call in global file and just pass in languageCounts to this vue instance
       axios.get("http://localhost:8000/api/threads").then(activeThreads => {
           this.threadInfo = activeThreads.data[0].threadInfo;

           this.imgURL = `http://localhost:8000/api/img/${this.threadInfo.ID}`;
       });

   },



    methods: {
  
    }

});

