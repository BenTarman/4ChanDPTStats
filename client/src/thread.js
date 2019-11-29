import axios from 'axios';


const app = new Vue({
    el: '#chanThread',
    data: {
      threadInfo: {},
      imgURL: '',
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

