


const ThreadInfo = Vue.component('threadInfo', {
    name: 'threadInfo',
    template: threadInfoTemplate,


    props: {
        'img': String,
        'uniquePosters': Number,
        'unixTime': Number,
      },
  
});


export default ThreadInfo;